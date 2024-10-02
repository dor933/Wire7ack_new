import React, { useEffect, useState, useRef } from 'react';
import Header from './Header';
import Sub_Header from './Sub_Header';
import Main_Comp from './Main_Comp';
import { useGlobal } from './Context/Global';
import { Stream } from '../shared/Stream';

const Main: React.FC = () => {
  const [streams, setStreams] = useState<Stream[]>([]);
  const { isCaptureStarted, setIsCaptureStarted } = useGlobal();
  const { isConnectionopen, setIsConnectionopen } = useGlobal();
  const streamsRef = useRef<Stream[]>([]);

  useEffect(() => {
    const socket = new WebSocket('ws://127.0.0.1:8080');

    socket.onopen = () => {
      console.log('Connected to server');
      setIsConnectionopen(true);
    };

    socket.onmessage = (event: MessageEvent<string>) => {
      const Data = JSON.parse(event.data);

      const stream = new Stream(
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

      streamsRef.current.push(stream);
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
        setStreams((prevStreams) => {
          let newStreams = [...prevStreams];

          streamsRef.current.forEach((stream) => {
            const index = newStreams.findIndex(
              (s) =>
                s.connectionID === stream.connectionID &&
                s.ActivationID === stream.ActivationID &&
                s.Protocol === stream.Protocol &&
                s.SourceIP === stream.SourceIP &&
                s.DestinationIP === stream.DestinationIP
            );

            if (index === -1) {
              newStreams.push(stream);
            } else {
              newStreams[index] = stream;
            }
          });

          streamsRef.current = [];

          // Limit the number of streams stored to last 100

          if (newStreams.length > 200) {
            newStreams = newStreams.slice(newStreams.length - 200);
          }

          return newStreams;
        });
      }
    }, 1000); // Update every 1 second

    // Clean up when the component unmounts
    return () => {
      socket.close();
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <Header />
      <Sub_Header />
      <Main_Comp rows={streams} setrows={setStreams} />
    </div>
  );
};

export default Main;
