import { io } from "socket.io-client";
import { env } from "../env";
// import { addNotification } from "../path/to/NotificationContext"; // Update the path as needed

const socket = io(env.VITE_WEB_SOCKET_URL, { withCredentials: true }); // Connect to the server's WebSocket endpoint

export function initializeSocket() {
  // Establish connection
  socket.connect();

  socket.on("connect", () => {
    console.log("Socket connected");
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  // Listen for notifications from the server
  socket.on("notification", (data) => {
    console.log("New notification received:", data);
    // addNotification(data); // Add the notification to the NotificationContext
  });
}

// Function to return the socket instance
export function getSocket() {
  return socket;
}

// Optional function to emit custom events
export function emitCustomEvent(eventName: any, data: any) {
  socket.emit(eventName, data);
}

export default socket;
