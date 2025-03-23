import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Check if API key exists
if (!process.env.MISTRAL_API_KEY) {
    console.error('Error: MISTRAL_API_KEY is not set in .env file');
    process.exit(1);
}

// Check if Agent ID exists
if (!process.env.MISTRAL_AGENT_ID) {
    console.error('Error: MISTRAL_AGENT_ID is not set in .env file');
    process.exit(1);
}

const app = express();
const port = 3001;
const server = createServer(app);
const wss = new WebSocketServer({ server });

const API_KEY = process.env.MISTRAL_API_KEY;
const AGENT_ID = process.env.MISTRAL_AGENT_ID;
const ENDPOINT = 'https://api.mistral.ai/v1/agents/completions';

// Store both WebSocket connections and chat histories
const clients = new Map();
const chatHistories = new Map();

async function eldercareAIConversation(userMessage, messageHistory) {
    const headers = {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
    };

    const payload = {
        messages: [
            ...messageHistory,
            {
                role: 'user',
                content: userMessage
            }
        ],
        agent_id: AGENT_ID
    };

    try {
        const response = await axios.post(ENDPOINT, payload, { headers });
        const reply = response.data.choices[0].message.content;
        console.log('ElderCare AI:', reply);
        return reply;
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        return 'An error occurred while contacting ElderCare AI.';
    }
}

wss.on('connection', (ws) => {
    const clientId = Date.now();
    clients.set(clientId, ws);
    // Initialize empty message history for new client
    chatHistories.set(clientId, []);

    // Send initial connection success message with client ID
    ws.send(JSON.stringify({
        type: 'connection',
        status: 'connected',
        clientId: clientId
    }));

    console.log(`Client connected: ${clientId}`);

    ws.on('message', async (message) => {
        try {
            const data = JSON.parse(message);
            console.log('Received message:', data);
            
            if (data.type === 'chat') {
                console.log('Using Agent ID:', AGENT_ID);
                const messageHistory = chatHistories.get(clientId);
                const response = await eldercareAIConversation(data.message, messageHistory);
                
                // Update message history with both user message and AI response
                messageHistory.push(
                    { role: 'user', content: data.message },
                    { role: 'assistant', content: response }
                );

                // Keep only last 10 messages to prevent context from getting too long
                if (messageHistory.length > 20) {
                    messageHistory.splice(0, 2);
                }

                ws.send(JSON.stringify({
                    type: 'response',
                    message: response,
                    clientId: clientId
                }));
            } else if (data.type === 'clear_history') {
                // Clear chat history if requested
                chatHistories.set(clientId, []);
                ws.send(JSON.stringify({
                    type: 'history_cleared',
                    clientId: clientId
                }));
            }
        } catch (error) {
            console.error('Error processing message:', error);
            ws.send(JSON.stringify({
                type: 'error',
                message: 'An error occurred while processing your message',
                clientId: clientId
            }));
        }
    });

    ws.on('close', () => {
        clients.delete(clientId);
        chatHistories.delete(clientId);
        console.log(`Client disconnected: ${clientId}`);
    });

    ws.on('error', (error) => {
        console.error(`WebSocket error for client ${clientId}:`, error);
        clients.delete(clientId);
        chatHistories.delete(clientId);
    });
});

// Add reconnection endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        connectedClients: clients.size,
        activeChats: chatHistories.size
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('WebSocket server is ready for connections');
    console.log('Using Agent ID:', AGENT_ID);
}); 