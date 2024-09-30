import React, { useEffect, useState, useRef } from 'react';
import Header from './Header';
import Sub_Header from './Sub_Header';
import Main_Comp from './Main_Comp';
import { useGlobal } from './Context/Global';
import { Stream } from '../shared/Stream';
import { Packet } from '../shared/Packet';

const Main: React.FC = () => {
  const [streams, setStreams] = useState<Stream[]>([]);
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
      let Data = JSON.parse(event.data);

      
      //check if its stream object

        if(Data.hasOwnProperty('Packets')){
            let stream = new Stream(
                Data.Index,
                Data.connectionID,
                Data.SourceIP,
                Data.DestinationIP,
                Data.ActivationID,
                Data.Packets,
                Data.Protocol,
                Data.validity,
                new Date(Data.StartTime),
                new Date(Data.EndTime),
                Data.Duration,
                Data.PacketCount,
                BigInt(Data.DataVolume),
                Data.ApplicationProtocol
              );
        
              // Accumulate streams and messages
              streamsRef.current.push(stream);
              messagesRef.current.push(event.data);
        }
       

      // Create a Stream object
     
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

        //check if the stream is already in the array

        streamsRef.current.forEach((stream) => {
          const index = streams.findIndex((s)=> s.connectionID===stream.connectionID && s.ActivationID===stream.ActivationID && s.Protocol===stream.Protocol && s.SourceIP===stream.SourceIP && s.DestinationIP===stream.DestinationIP);
          if (index === -1) {
            setStreams((prevStreams) => [...prevStreams, stream]);
          } else {
            const newStreams = [...streams];
            newStreams[index] = stream;
            setStreams(newStreams);
          }
        });
        streamsRef.current = [];


       
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
      <Main_Comp rows={streams} setrows={setStreams} />

   
    </div>
  );
};

export default Main;
