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

## 📹 Demo Video

Watch the application in action:

**📁 Video File:** [`video/video.mkv`](video/video.mkv)

*Download or open the video file to see the application demo in action.*

**Features demonstrated in the video:**
- Real-time messaging between multiple users
- Message editing functionality
- User name assignment
- Real-time updates across all connected clients

## 🚀 Features

- **Real-time messaging** using WebSocket
- **Random user name assignment** from a predefined list of 100+ unique names
- **Message editing** - users can edit their own messages with ✏️ button
- **Clean and modern UI** with responsive design
- **Message timestamps** in HH:MM format
- **User connection/disconnection notifications**
- **Automatic message scrolling** to latest messages
- **Cross-platform compatibility**
- **Real-time message updates** across all connected users

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

### 🎮 How to Use

1. **Join the chat**: Open the application in your browser
2. **Get a name**: You'll be assigned a random name automatically
3. **Send messages**: Type in the input field and press Enter
4. **Edit messages**: Click the ✏️ button on your own messages to edit
5. **Real-time updates**: See all changes instantly across all connected users

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
- **Real-time message editing** with instant updates across all users
- **Unique message IDs** for tracking and editing specific messages

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
- **Message editing functionality** with real-time updates
- **Edit button (✏️)** appears on user's own messages
- **Inline editing** with keyboard controls (Enter to save, Escape to cancel)
- **Real-time synchronization** of edits across all connected users

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

- GitHub: [@rahim-jr](https://github.com/rahim-jr)

## 🎯 Key Features Demo

### Message Editing
- Click the ✏️ button on any of your messages
- Edit the text inline
- Press **Enter** to save changes
- Press **Escape** to cancel editing
- All users see the update in real-time

### Real-time Communication
- Send messages and see them appear instantly
- Messages from others appear on the left
- Your messages appear on the right
- All users see the same message updates simultaneously

## 🙏 Acknowledgments

- Thanks to [roadmap.sh](https://roadmap.sh) for the inspiring challenge
- UI design inspired by [Sajad's Chat UI](https://codepen.io/sajadhsm/pen/odaBdd) on CodePen
