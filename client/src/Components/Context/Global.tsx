import React, { createContext, useContext, useState } from 'react';

interface GlobalContext {
    isCaptureStarted: boolean;
    setIsCaptureStarted: React.Dispatch<React.SetStateAction<boolean>>;

    isConnectionopen: boolean;
    setIsConnectionopen: React.Dispatch<React.SetStateAction<boolean>>;

    chosenInterface: string;
    setChosenInterface: React.Dispatch<React.SetStateAction<string>>;

    View: string;
    setView: React.Dispatch<React.SetStateAction<string>>;

  

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
    const [isCaptureStarted, setIsCaptureStarted] = useState<boolean>(false);
    const [isConnectionopen, setIsConnectionopen] = useState<boolean>(false);
    const [chosenInterface, setChosenInterface] = useState<string>('');
    const [View, setView] = useState<string>("All Connections");

    return (
        <GlobalContext.Provider value={{ isCaptureStarted,chosenInterface,View,setView,setChosenInterface, setIsCaptureStarted,isConnectionopen,setIsConnectionopen }}>
            {children}
        </GlobalContext.Provider>
    );
}
