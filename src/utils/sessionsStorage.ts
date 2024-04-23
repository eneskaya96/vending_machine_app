import { TransactionSession } from "@/models/transactionSession.model";

export const setSession = (session: TransactionSession | null): void => {
    if (session === null) {
        localStorage.removeItem('session');
    } else {
        localStorage.setItem('session', JSON.stringify(session));
    }
};

export const getSession = (): TransactionSession | null => {
    const sessionData = localStorage.getItem('session');
    return sessionData ? JSON.parse(sessionData) : null;
};