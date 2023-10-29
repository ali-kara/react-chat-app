// src/components/ChatApp.js
import React, { useState, useEffect } from "react";
import { auth, firestore } from "../firebase.js";

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Add Firebase real-time listener to fetch messages from Firestore
    const unsubscribe = firestore
      .collection("messages")
      .onSnapshot((snapshot) => {
        const messagesData = snapshot.docs.map((doc) => doc.data());
        setMessages(messagesData);
      });

    // Check if a user is authenticated
    const authUnsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
      authUnsubscribe();
    };
  }, []);

  const sendMessage = async () => {
    if (messageText.trim() === "") return;

    const message = {
      text: messageText,
      timestamp: new Date(),
      userId: user.uid,
    };

    await firestore.collection("messages").add(message);

    setMessageText("");
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.displayName}</h2>
          <div>
            {messages.map((msg, index) => (
              <div key={index}>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      ) : (
        <p>Please sign in to join the chat.</p>
      )}
    </div>
  );
}

export default ChatApp;
