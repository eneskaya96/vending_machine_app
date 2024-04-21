import { TransactionSession } from "@/models/transactionSession.model";

// Store the entire session object in local storage
export const setSession = (session: TransactionSession | null): void => {
    if (session === null) {
        localStorage.removeItem('session');
    } else {
        localStorage.setItem('session', JSON.stringify(session));
    }
};

// Get the session object from local storage
export const getSession = (): TransactionSession | null => {
    const sessionData = localStorage.getItem('session');
    return sessionData ? JSON.parse(sessionData) : null;
};