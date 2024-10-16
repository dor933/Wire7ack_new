import React, { createContext, useContext, useState } from 'react';

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

    return (
        <GlobalContext.Provider value={{ iscapturing,setIscapturing,chosenInterface,View,ChosenFields,setChosenFields,setView,setChosenInterface,isConnectionopen,setIsConnectionopen }}>
            {children}
        </GlobalContext.Provider>
    );
}
