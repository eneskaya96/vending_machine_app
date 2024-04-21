import React, { useEffect, useRef,useState } from 'react';

import { TransactionSession } from '@/models/transactionSession.model';
import { useGetCurrentTotalQuery, useRefundMoneyMutation, useStartSessionMutation } from '@/services/transactionSessionService';
import { getSession, setSession } from '@/utils/sessionsStorage';

import MoneyTypeSelector from './MoneyTypeSelector';
import ProductList from './product-list/productList';

function VendingMachineInterface() {
    const [session, setSessionState] = useState<TransactionSession | null>(getSession());
    const [startSession, { isLoading: isStartingSession }] = useStartSessionMutation();
    const [refundMoney, { isLoading: isRefunding }] = useRefundMoneyMutation();
    const { data: currentTotal, refetch: refetchTotal } = useGetCurrentTotalQuery(session?.sessionId || '', {
      skip: !session?.sessionId,
  });
    const initiatedRef = useRef(false); 

    useEffect(() => {
        const storedSession = getSession();
        if (storedSession) {
            setSessionState(storedSession);
        } else if (!initiatedRef.current && !isStartingSession) {
            initiatedRef.current = true; // Mark as initiated
            startSession().unwrap().then((transaction_session: TransactionSession) => {
                setSessionState(transaction_session);
                setSession(transaction_session); // Store the entire session object in local storage
            }).catch(console.error);
        }
    }, [startSession, isStartingSession]);

    const handleRefund = async () => {
      if (session?.sessionId) {
          try {
              await refundMoney(session.sessionId).unwrap();
              alert('Refund processed successfully!');
              refetchTotal();
          } catch (error) {
              console.error('Refund failed:', error);
              alert('Failed to process the refund!');
          }
      }
  };

    return (
        <div>
            <h1>Vending Machine</h1>
            <div>Current Money: {currentTotal}</div>
            <MoneyTypeSelector session={session} refetchTotal={refetchTotal}/> 

            <ProductList />
            <button onClick={handleRefund} disabled={isRefunding}>Refund Money</button>
        </div>
    );
}

export default VendingMachineInterface;
