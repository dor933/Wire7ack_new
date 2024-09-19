import React, { useEffect, useState } from 'react';
import Header from './Header';


const Main: React.FC = () => {

    const [message, setMessage] = useState<string>('')
    const [isConnected, setIsConnected] = useState<boolean>(false)
    const [messages, setMessages] = useState<string[]>([])

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

        socket.onmessage = (event: MessageEvent<string>) => {
            console.log(`Received from server: ${event.data}`);
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };

        socket.onclose = () => {
            console.log('Disconnected from server');
            setIsConnected(false);
        };

        socket.onerror = (event: Event )=>{
            console.error(`WebSocket error: ${event}`);
        };
    

        // Clean up when the component unmounts
        return () => {
            socket.close();
        };
    }, []);

    return (
        <div>
            <Header />
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