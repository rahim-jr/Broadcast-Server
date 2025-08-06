# SimpleChat - Real-time Chat Application

This project is a solution to the [Broadcast Server Challenge](https://roadmap.sh/projects/broadcast-server) from roadmap.sh. The challenge focuses on building a server that can broadcast messages to connected clients, helping developers understand WebSocket implementation and real-time communication.

## 🎯 Challenge Overview

The Broadcast Server challenge aims to help developers understand:
- How to work with WebSockets
- Implementing real-time communication between clients and servers
- Building features similar to chat applications and live scoreboards
- Handling multiple client connections
- Managing client disconnections gracefully

A modern, real-time chat application built with Node.js, WebSocket, and Express. This project demonstrates the implementation of real-time communication using WebSocket protocol.

## 🌐 Live Demo

Visit the live application at: [SimpleChat](https://broadcast-server-l55g.onrender.com)

## 🚀 Features

- Real-time messaging using WebSocket
- Random user name assignment from a predefined list
- Clean and modern UI
- Responsive design
- Message timestamps
- User connection/disconnection notifications
- Automatic message scrolling
- Cross-platform compatibility

## 🛠️ Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - WebSocket (ws)
  - HTTP Server

- **Frontend:**
  - HTML5
  - CSS3
  - JavaScript (Vanilla)
  - WebSocket API

- **Dependencies:**
  - express: ^4.21.2
  - ws: ^8.18.2

## 🏗️ Project Structure

```
├── public/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── server/
│   └── index.js
├── package.json
├── package-lock.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rahim-jr/Broadcast-Server.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Broadcast-Server
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open your browser and visit:
   ```
   http://localhost:3000
   ```

## 🔧 Configuration

The server runs on port 3000 by default. You can change this by setting the `PORT` environment variable:

```bash
PORT=4000 npm start
```

## 🌟 Features in Detail

### Real-time Communication
- Uses WebSocket for instant message delivery
- Maintains persistent connections for real-time updates
- Handles connection/disconnection events gracefully
- Broadcasts messages to all connected clients except sender

### User Management
- Automatically assigns random names from a predefined list of 100+ unique names
- Tracks online users and manages connections
- Recycles names when users disconnect
- Provides fallback "Guest" names if all predefined names are used
- Each user gets a unique animated avatar icon

### Message Handling
- Supports text messages with real-time delivery
- Includes sender information and timestamps
- Displays message timestamps in HH:MM format
- Auto-scrolls to latest messages
- Clean message bubbles with different colors for sent/received messages

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

- GitHub: [@rahim-jr](https://github.com/rahim-jr)

## 🙏 Acknowledgments

- Thanks to [roadmap.sh](https://roadmap.sh) for the inspiring challenge
- UI design inspired by [Sajad's Chat UI](https://codepen.io/sajadhsm/pen/odaBdd) on CodePen
