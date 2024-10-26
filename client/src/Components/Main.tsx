import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sub_Header from './Sub_Header';
import Main_Comp from './Main_Comp';
import { useGlobal } from './Context/Global';
import { Stream } from '../shared/Stream';
import { useRef, useCallback } from 'react';
import axios from 'axios';


const Main: React.FC = () => {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [invalid_streams, setInvalid_streams] = useState<Stream[]>([]);
  const {setIsConnectionopen } = useGlobal();
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const {setIscapturing} = useGlobal();
  const {last_stream_id,setLast_stream_id} = useGlobal();

 
  //set interval to check if the capture is started or not every 3 minutes- wait for the server to send a message that the capture is started or not
  useEffect(()=>{
    setInterval(async ()=>{
      await axios.get('http://localhost:8000/api/maintainance/iscapture').then((response)=>{
        console.log(response.data.iscapturing);
        setIscapturing(response.data.iscapturing);
      });
    },30000);
  },[setIscapturing]);

  useEffect(()=>{

    getlastasync()


 
    
  },[]);


 const getlastasync= async() => {

  let id:any=await axios.get('https://localhost:32531/Stream/GetLastStreamID');
  console.log(id.data)
  setLast_stream_id(id.data)


 }


 


  const connectWebSocket = useCallback(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      return;
    }
    

    const socket = new WebSocket('ws://127.0.0.1:8080');

    socket.onopen = () => {
      console.log('Connected to server');
      setIsConnectionopen(true);
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };

    socket.onmessage = (event: MessageEvent<string>) => {
      try {
        // Securely parse the incoming data
        const data = JSON.parse(event.data);

        // Validate that the data is an array
        if (!Array.isArray(data)) {
          console.error('Invalid data received: Expected an array of streams');
          return;
        }

        // Validate and convert each item in the array to a Stream instance
        const receivedStreams: Stream[] = data
          .map((item: any) => {
            // Validate required fields and their types
            // if (
            //   typeof item.Index !== 'number' ||
            //   typeof item.connectionID !== 'string' ||
            //   typeof item.SourceIP !== 'string' ||
            //   typeof item.DestinationIP !== 'string' ||
            //   typeof item.ActivationID !== 'string' ||
            //   typeof item.Packets !== 'object' ||
            //   typeof item.Protocol !== 'string' ||
            //   typeof item.validity !== 'boolean' ||
            //   typeof item.StartTime !== 'string' ||
            //   typeof item.EndTime !== 'string' ||
            //   typeof item.Duration !== 'number' ||
            //   typeof item.PacketCount !== 'number' ||
            //   typeof item.DataVolume !== 'string' ||
            //   typeof item.ApplicationProtocol !== 'string'
            // ) {
            //   console.error('Invalid data received:', item);
            //   return null;
            // }

            // Convert DataVolume back to BigInt
            let dataVolume: bigint;
            try {
              dataVolume = BigInt(item.DataVolume);
            } catch (e) {
              console.error('Invalid DataVolume:', item.DataVolume);
              return null;
            }

            // Create and return a new Stream instance
            return new Stream(
              item.connectionID,
              item.SourceIP,
              item.DestinationIP,
              item.ActivationID,
              item.Packets,
              item.Protocol,
              item.validity,
              new Date(item.StartTime),
              new Date(item.EndTime),
              item.Duration,
              item.PacketCount,
              dataVolume,
              item.ApplicationProtocol
            );
          })
          .filter((stream): stream is Stream => stream !== null); // Filter out nulls


          //add the invalid new streams to the invalid_streams with the previous invalid streams

          const new_invalid_streams = receivedStreams.filter((stream) => stream.validity === false);
          setInvalid_streams((prev_invalid_streams) => [...prev_invalid_streams, ...new_invalid_streams]);

          setStreams((prev_streams) => {
            if (prev_streams.length > 500) {
              return receivedStreams;
            } else {
              return [...prev_streams, ...receivedStreams];
            }
          });

      } catch (error) {
        console.error('Error parsing or processing data:', error);
      }
    };

    socket.onclose = (event) => {
      console.log('Disconnected from server', event.reason);
      setIsConnectionopen(false);
      reconnectTimeoutRef.current = setTimeout(() => {
        console.log('Attempting to reconnect...');
        connectWebSocket();
      }, 5000); // Try to reconnect after 5 seconds
    };

    socket.onerror = (event: Event) => {
      console.error(`WebSocket error: ${event}`);
    };

    socketRef.current = socket;

    // Clean up when the component unmounts
 
  }, [setIsConnectionopen]);


  useEffect(() => {
    connectWebSocket();

    // Cleanup function
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [connectWebSocket]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN)) {
        console.log('Page became visible, attempting to reconnect...');
        connectWebSocket();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [connectWebSocket]);


  return (
    <div>
      <Header />
      <Sub_Header />
      <Main_Comp rows={streams} invalid_streams={invalid_streams} setrows={setStreams} setInvalid_streams={setInvalid_streams} />
    </div>
  );
};

export default Main;
