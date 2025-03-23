import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import Mistral from "@mistralai/mistralai";
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
const mistralClient = new Mistral(process.env.MISTRAL_API_KEY);

const clients = new Map();

wss.on('connection', (ws) => {
    const clientId = Date.now();
    clients.set(clientId, ws);

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
            console.log(data)
            
            if (data.type === 'chat') {
                console.log('Using Agent ID:', process.env.MISTRAL_AGENT_ID);
                const result = await mistralClient.chat({
                    model: "mistral-large-2411",
                    messages: [
                        {
                            role: "user",
                            content: data.message
                        }
                    ],
                    temperature: 0.355,
                    max_tokens: 1000
                });

                console.log('Agent Response:', result);
                ws.send(JSON.stringify({
                    type: 'response',
                    message: result.choices[0].message.content,
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
        console.log(`Client disconnected: ${clientId}`);
    });

    ws.on('error', (error) => {
        console.error(`WebSocket error for client ${clientId}:`, error);
        clients.delete(clientId);
    });
});

// Add reconnection endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', connectedClients: clients.size });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('WebSocket server is ready for connections');
    console.log('Using Agent ID:', process.env.MISTRAL_AGENT_ID);
}); 