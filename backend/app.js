// server.js - Main entry point
import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import bodyParser from 'body-parser';
import { setupInboundRoutes } from './inbound-calls.js';
import { setupOutboundRoutes } from './outbound-calls.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Set up middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create WebSocket server
const wss = new WebSocketServer({ server });

// Port configuration
const PORT = process.env.PORT || 8000;

// Root route for health check
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Set up routes for inbound and outbound calls
setupInboundRoutes(app, wss);
setupOutboundRoutes(app, wss);

// Start the server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`[Server] Listening on port ${PORT}`);
  
  // Print Ngrok instructions if not using a public URL
  if (!process.env.PUBLIC_URL) {
    console.log('[Server] For Twilio to access your local server, use ngrok:');
    console.log(`[Server] Install: npm install -g ngrok`);
    console.log(`[Server] Run: ngrok http ${PORT}`);
    console.log('[Server] Then set the PUBLIC_URL env variable to your ngrok URL');
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  process.exit(1);
});