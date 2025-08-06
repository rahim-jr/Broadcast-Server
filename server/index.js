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

// Default icon for all users
const DEFAULT_ICON = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48bWFzayBpZD0ibGluZU1kRW1vamlTbWlsZUZpbGxlZDAiPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMCIgc3Ryb2tlLWRhc2hhcnJheT0iNjQiIHN0cm9rZS1kYXNob2Zmc2V0PSI2NCIgZD0iTTEyIDNjNC45NyAwIDkgNC4wMyA5IDljMCA0Ljk3IC00LjAzIDkgLTkgOWMtNC45NyAwIC05IC00LjAzIC05IC05YzAgLTQuOTcgNC4wMyAtOSA5IC05Ij48YW5pbWF0ZSBmaWxsPSJmcmVlemUiIGF0dHJpYnV0ZU5hbWU9ImZpbGwtb3BhY2l0eSIgYmVnaW49IjAuN3MiIGR1cj0iMC41cyIgdmFsdWVzPSIwOzEiLz48YW5pbWF0ZSBmaWxsPSJmcmVlemUiIGF0dHJpYnV0ZU5hbWU9InN0cm9rZS1kYXNob2Zmc2V0IiBkdXI9IjAuNnMiIHZhbHVlcz0iNjQ7MCIvPjwvcGF0aD48cGF0aCBzdHJva2U9IiMwMDAiIHN0cm9rZS1kYXNoYXJyYXk9IjIiIHN0cm9rZS1kYXNob2Zmc2V0PSIyIiBkPSJNOSA5djEiPjxhbmltYXRlIGZpbGw9ImZyZWV6ZSIgYXR0cmlidXRlTmFtZT0ic3Ryb2tlLWRhc2hvZmZzZXQiIGJlZ2luPSIxLjJzIiBkdXI9IjAuMnMiIHZhbHVlcz0iMjswIi8+PC9wYXRoPjxwYXRoIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLWRhc2hhcnJheT0iMiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjIiIGQ9Ik0xNSA5djEiPjxhbmltYXRlIGZpbGw9ImZyZWV6ZSIgYXR0cmlidXRlTmFtZT0ic3Ryb2tlLWRhc2hvZmZzZXQiIGJlZ2luPSIxLjRzIiBkdXI9IjAuMnMiIHZhbHVlcz0iMjswIi8+PC9wYXRoPjxwYXRoIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLWRhc2hhcnJheT0iMTIiIHN0cm9rZS1kYXNob2Zmc2V0PSIxMiIgZD0iTTggMTRjMC41IDEuNSAxLjc5IDMgNCAzYzIuMjEgMCAzLjUgLTEuNSA0IC0zIj48YW5pbWF0ZSBmaWxsPSJmcmVlemUiIGF0dHJpYnV0ZU5hbWU9InN0cm9rZS1kYXNob2Zmc2V0IiBiZWdpbj0iMS42cyIgZHVyPSIwLjJzIiB2YWx1ZXM9IjEyOzAiLz48L3BhdGg+PC9nPjwvbWFzaz48cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9ImN1cnJlbnRDb2xvciIgbWFzaz0idXJsKCNsaW5lTWRFbW9qaVNtaWxlRmlsbGVkMCkiLz48L3N2Zz4=';

// A working copy of available names
let availableNames = [...NAMES] ;

// Tracking clients: id -> {ws, name, icon}
const clients = new Map() ;

function startServer(port = process.env.PORT || 3000) {
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
    console.log(`📡 WebSocket server initialized on port ${port}`);

    wss.on('connection', ws => {
      // Pick a name (or "Guest" if we run out)
      const name = availableNames.length
        ? availableNames.splice(Math.floor(Math.random()*availableNames.length),1)[0]
        : `Guest-${Math.floor(Math.random()*1000)}`;

      const clientId = randomUUID();
      clients.set(clientId, { ws, name, iconUrl: DEFAULT_ICON });
      console.log(`🟢 ${name} connected`);

      // Send the welcome + assigned name and icon
      ws.send(JSON.stringify({ 
        type: 'welcome', 
        clientId, 
        name,
        iconUrl: DEFAULT_ICON 
      }));

      ws.on('message', raw => {
        const { type, text } = JSON.parse(raw);
        if (type === 'chat') {
          // Get sender's info
          const senderInfo = clients.get(clientId);
          
          // Broadcast to all clients EXCEPT the sender
          for (let [id, { ws: cWs, name: fromName, iconUrl }] of clients.entries()) {
            // Skip if this is the sender's WebSocket
            if (cWs === ws) continue;
            
            if (cWs.readyState === WebSocket.OPEN) {
              cWs.send(JSON.stringify({
                type: 'chat',
                fromName,
                iconUrl,
                text
              }));
            }
          }
          
          // Send back to sender so they can see their own message
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({
              type: 'chat',
              fromName: senderInfo.name,
              iconUrl: senderInfo.iconUrl,
              text
            }));
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
    server.listen(port, '0.0.0.0', () => {
      console.log(`📡 HTTP server running on port ${port}`);
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

