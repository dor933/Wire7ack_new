import React, { createContext, useContext, useState } from 'react';
import { Stream } from '../../shared/Stream';
interface GlobalContext {
 

    isConnectionopen: boolean;
    setIsConnectionopen: React.Dispatch<React.SetStateAction<boolean>>;

    chosenInterface: string;
    setChosenInterface: React.Dispatch<React.SetStateAction<string>>;

    View: string;
    setView: React.Dispatch<React.SetStateAction<string>>;

    ChosenFields: Record<string, string>;
    setChosenFields: React.Dispatch<React.SetStateAction<Record<string, string>>>;

    iscapturing:boolean;
    setIscapturing:React.Dispatch<React.SetStateAction<boolean>>;

    last_stream_id:number;
    setLast_stream_id:React.Dispatch<React.SetStateAction<number>>;

    historic_streams:Stream[];
    setHistoric_streams:React.Dispatch<React.SetStateAction<Stream[]>>;



  

}

const GlobalContext = createContext<GlobalContext | undefined>(undefined);

export const useGlobal = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobal must be used within a GlobalProvider');
    }
    return context;
}

export const GlobalProvider: React.FC<{children:React.ReactNode}> = ({ children }) => {
    const [isConnectionopen, setIsConnectionopen] = useState<boolean>(false);
    const [chosenInterface, setChosenInterface] = useState<string>('');
    const [View, setView] = useState<string>("All Connections");
    const [ChosenFields, setChosenFields] = useState<Record<string, string>>({});
    const [iscapturing, setIscapturing] = useState<boolean>(false);
    const [last_stream_id, setLast_stream_id] = useState<number>(0);
    const [historic_streams,setHistoric_streams] = useState<Stream[]>([]);
    return (
        <GlobalContext.Provider value={{ iscapturing,last_stream_id,historic_streams,setHistoric_streams,setLast_stream_id,setIscapturing,chosenInterface,View,ChosenFields,setChosenFields,setView,setChosenInterface,isConnectionopen,setIsConnectionopen }}>
            {children}
        </GlobalContext.Provider>
    );
}
