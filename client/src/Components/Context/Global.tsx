import React, { createContext, useContext, useState } from 'react';

interface GlobalContext {
    isCaptureStarted: boolean;
    setIsCaptureStarted: React.Dispatch<React.SetStateAction<boolean>>;

    isConnectionopen: boolean;
    setIsConnectionopen: React.Dispatch<React.SetStateAction<boolean>>;

  

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

    return (
        <GlobalContext.Provider value={{ isCaptureStarted, setIsCaptureStarted,isConnectionopen,setIsConnectionopen }}>
            {children}
        </GlobalContext.Provider>
    );
}
