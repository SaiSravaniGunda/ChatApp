Chat Application
This project is a simple real-time chat application with React Native for the frontend and Express for the backend. It allows users to log in with a username and send/receive messages in real-time using WebSockets (via Socket.IO).

Tech Stack
Frontend
React Native: For building the mobile app.

Socket.IO-client: To establish real-time communication between the frontend and backend.

Backend
Express: A minimal Node.js web framework.

Socket.IO: A library for enabling real-time, bidirectional communication between web clients and servers.

CORS: A middleware for enabling Cross-Origin Resource Sharing.

Installation
Backend Setup (Chat Server)
Clone the repository.

bash
Copy
Edit
git clone https://github.com/your-username/ChatApplication.git
cd ChatApplication/chat-server
Install dependencies:

bash
Copy
Edit
npm install
Start the server:

bash
Copy
Edit
node server.js
The server will run on http://localhost:3000.

Frontend Setup (React Native)
Navigate to the ChatApp directory:

bash
Copy
Edit
cd ChatApplication/ChatApp
Install dependencies:

bash
Copy
Edit
npm install
Start the React Native project:

If you're using an Android emulator:

bash
Copy
Edit
npx react-native run-android
If you're using an iOS simulator (macOS only):

bash
Copy
Edit
npx react-native run-ios
Configuration
Ensure your React Native app can connect to the backend by replacing the socket.io connection URL in ChatScreen.js with your server's IP address, e.g.:

javascript
Copy
Edit
const socket = io('http://192.168.x.x:3000');
Features
Login: Users can log in by entering a username.

Real-time Messaging: Users can send and receive messages in real-time.

Message Timestamps: Each message is timestamped with the time it was sent.

File Structure
bash
Copy
Edit
ChatApplication/
├── ChatApp/               # React Native frontend
│   ├── components/        # React Native components (LoginScreen, ChatScreen)
│   ├── App.tsx            # Main React Native App entry point
│   ├── package.json       # React Native dependencies and scripts
├── chat-server/           # Express backend
│   ├── server.js          # Socket.IO server setup
│   ├── package.json       # Express dependencies and scripts
└── README.md              # Project documentation
Usage
Run the Express backend (node server.js) to listen for incoming WebSocket connections.

Launch the React Native app to log in with a username and start chatting.

Messages will be broadcasted to all connected clients in real-time.

