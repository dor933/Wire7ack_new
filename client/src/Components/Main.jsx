import React, { useEffect, useState } from 'react';


const Main = () => {

    const [message, setMessage] = useState('')
    const [isConnected, setIsConnected] = useState(false)
    const [messages, setMessages] = useState([])

    useEffect(() => {

        //delay function

        // Connect to the WebSocket server

        



        const socket = new WebSocket('ws://127.0.0.1:8080');

        socket.onopen = () => {
            console.log('Connected to server');
            setIsConnected(true);

            // Send a message to the server
            socket.send('Hello, server!');
        };

        socket.onmessage = (event) => {
            console.log(`Received from server: ${event.data}`);
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };

        socket.onclose = () => {
            console.log('Disconnected from server');
            setIsConnected(false);
        };

        socket.onerror = (error) => {
            console.error(`WebSocket error: ${error}`);
        };

        // Clean up when the component unmounts
        return () => {
            socket.close();
        };
    }, []);

    return (
        <div>
            <h1>WebSocket Client</h1>
            <p>Status: {isConnected ? 'Connected' : 'Disconnected'}</p>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
        </div>
    );
}

export default Main;