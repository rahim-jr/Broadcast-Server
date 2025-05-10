//Server
const WebSocket = require('ws');
const express = require('express');
const { randomUUID } = require('crypto');
const path = require('path');
const http = require('http');
// Users list of names 
const NAMES = [
  'Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot',
  'Golf', 'Hotel', 'India', 'Juliett', 'Kilo', 'Lima',
  'Mike', 'November', 'Oscar', 'Papa', 'Quebec', 'Romeo',
  'Sierra', 'Tango', 'Uniform', 'Victor', 'Whiskey', 'Xray',
  'Yankee', 'Zulu', 'Atlas', 'Blaze', 'Cobra', 'Dawn',
  'Eagle', 'Falcon', 'Ghost', 'Havoc', 'Iron', 'Jaguar',
  'King', 'Lynx', 'Maverick', 'Nighthawk', 'Omega', 'Phoenix',
  'Quasar', 'Raven', 'Storm', 'Titan', 'Umbra', 'Viper',
  'Wolf', 'Xenon', 'Yeti', 'Zenith', 'Arrow', 'Bolt',
  'Comet', 'Dagger', 'Ember', 'Flare', 'Glacier', 'Hornet',
  'Inferno', 'Jupiter', 'Kestrel', 'Leviathan', 'Meteor', 'Nova',
  'Orion', 'Pegasus', 'Quantum', 'Raptor', 'Saber', 'Tempest',
  'Ursa', 'Vortex', 'Warden', 'Xenith', 'Ymir', 'Zeus',
  'Aegis', 'Bulwark', 'Century', 'Draco', 'Eclipse', 'Fury',
  'Griffin', 'Horizon', 'Icarus', 'Javelin', 'Kraken', 'Lancer',
  'Mantis', 'Nebula', 'Osprey', 'Prowler', 'Quicksilver', 'Ranger',
  'Strider', 'Thunder', 'Ulysses', 'Valkyrie', 'Warlock', 'Excalibur'
];

// A working copy of available names
let availableNames = [...NAMES] ;

// Tracking clients: id -> {ws , name}
const clients = new Map() ;

function startServer(port = 3000) {
  try {
    console.log('Starting server...');
    const app = express() ;

    // serve static files from public folder
    const publicPath = path.join(__dirname, '../public');
    console.log('Serving static files from:', publicPath);
    app.use(express.static(publicPath)) ;

     // Create HTTP server
     const server = http.createServer(app) ;

    // Create WebSocket server
    const wss = new WebSocket.Server({ server });
    console.log(`📡 WebSocket server initialized on ws://localhost:${port}`);

    wss.on('connection', ws => {
      // Pick a name (or "Guest" if we run out)
      const name = availableNames.length
        ? availableNames.splice(Math.floor(Math.random()*availableNames.length),1)[0]
        : `Guest-${Math.floor(Math.random()*1000)}`;

      const clientId = randomUUID();
      clients.set(clientId, { ws, name });
      console.log(`🟢 ${name} connected`);

      // 4. Send the welcome + assigned name
      ws.send(JSON.stringify({ type:'welcome', clientId, name }));

      ws.on('message', raw => {
        const { type, text } = JSON.parse(raw);
        if (type === 'chat') {
          // Broadcast to all clients EXCEPT the sender
          for (let [id, { ws: cWs }] of clients.entries()) {
            // Skip if this is the sender's WebSocket
            if (cWs === ws) continue;
            
            if (cWs.readyState === WebSocket.OPEN) {
              cWs.send(JSON.stringify({
                type: 'chat',
                fromName: name,
                text
              }));
            }
          }
        }
      });

      ws.on('close', () => {
        console.log(`🔴 ${name} disconnected`);
        clients.delete(clientId);
        // 5. Return the name back into the pool
        if (NAMES.includes(name)) availableNames.push(name);
      });
    });

    // Start the server
    server.listen(port, () => {
      console.log(`📡 HTTP server running on http://localhost:${port}`);
    });

    // Error handling
    server.on('error', (error) => {
      console.error('Server error:', error);
    });

    wss.on('error', (error) => {
      console.error('WebSocket server error:', error);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server immediately
startServer();

module.exports = { startServer };

