import React, { createContext, useState, useContext } from 'react';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [seenAlerts, setSeenAlerts] = useState({});

    const markAsSeen = (childId) => {
        setSeenAlerts((prev) => ({
            ...prev,
            [childId]: true,
        }));
    };

    const resetSession = () => {
        setSeenAlerts({});
    };

    return (
        <SessionContext.Provider value={{ seenAlerts, markAsSeen, resetSession }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
};
