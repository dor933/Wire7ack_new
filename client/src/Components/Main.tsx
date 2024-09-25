import React, { useEffect, useState, useRef } from 'react';
import Header from './Header';
import Sub_Header from './Sub_Header';
import Main_Comp from './Main_Comp';
import { useGlobal } from './Context/Global';
import { Stream } from '../shared/Stream';

const Main: React.FC = () => {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [messages, setMessages] = useState<string[]>([]);
  const { isCaptureStarted, setIsCaptureStarted } = useGlobal();
  const { isConnectionopen, setIsConnectionopen } = useGlobal();

  const streamsRef = useRef<Stream[]>([]);
  const messagesRef = useRef<string[]>([]);

  useEffect(() => {
    const socket = new WebSocket('ws://127.0.0.1:8080');

    socket.onopen = () => {
      console.log('Connected to server');
      setIsConnectionopen(true);

      // Send a message to the server
      socket.send('Hello, server!');
    };

    socket.onmessage = (event: MessageEvent<string>) => {
      // Parse the incoming message
      let streamData = JSON.parse(event.data);

      // Create a Stream object
      let stream = new Stream(
        streamData.Index,
        streamData.connectionID,
        streamData.SourceIP,
        streamData.DestinationIP,
        streamData.ActivationID,
        streamData.Packets,
        streamData.Protocol,
        streamData.validity,
        new Date(streamData.StartTime),
        new Date(streamData.EndTime),
        streamData.Duration,
        streamData.PacketCount,
        BigInt(streamData.DataVolume),
        streamData.ApplicationProtocol
      );

      // Accumulate streams and messages
      streamsRef.current.push(stream);
      messagesRef.current.push(event.data);
    };

    socket.onclose = () => {
      console.log('Disconnected from server');
      setIsConnectionopen(false);
    };

    socket.onerror = (event: Event) => {
      console.error(`WebSocket error: ${event}`);
    };

    // Set up interval to update state every second
    const interval = setInterval(() => {
      if (streamsRef.current.length > 0) {
        console.log('this is the streams array',streams)
        setStreams((prevStreams) => [...prevStreams, ...streamsRef.current]);
        streamsRef.current = [];
      }

      if (messagesRef.current.length > 0) {
        setMessages((prevMessages) => [...prevMessages, ...messagesRef.current]);
        messagesRef.current = [];
      }
    }, 1000); // Update every 1 second

    // Clean up when the component unmounts
    return () => {
      socket.close();
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
  }, [streams]);

  return (
    <div>
      <Header />
      <Sub_Header />
      <Main_Comp rows={streams} />

      <h1>WebSocket Client</h1>
      <p>Status: {isConnectionopen ? 'Connected' : 'Disconnected'}</p>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
