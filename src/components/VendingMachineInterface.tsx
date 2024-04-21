import React, { useEffect, useRef,useState } from 'react';

import { TransactionSession } from '@/models/transactionSession.model';
import { useGetCurrentTotalQuery, usePurchaseProductMutation, useRefundMoneyMutation, useStartSessionMutation } from '@/services/transactionSessionService';
import { getSession, setSession } from '@/utils/sessionsStorage';

import MoneyTypeSelector from './MoneyTypeSelector';
import ProductList from './product-list/productList';
import { PurchaseResult, formatChangeMap } from '@/models/chainMap.model';



function VendingMachineInterface() {
    const [session, setSessionState] = useState<TransactionSession | null>(getSession());
    const [startSession, { isLoading: isStartingSession }] = useStartSessionMutation();
    const [purchaseProduct, { isLoading }] = usePurchaseProductMutation();
    const [refundMoney, { isLoading: isRefunding }] = useRefundMoneyMutation();
    const [selectedProductId, setSelectedProductId] = useState(null);
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
    
    const handlePurchase = async () => {
        if(!selectedProductId){
            alert('Please select a product!');
            return
        }
        try {
            const result: PurchaseResult = await purchaseProduct({
                sessionId: parseInt(session!.sessionId),
                productId:  parseInt(selectedProductId!),
            }).unwrap();
            console.log('result:', result.changeMap);
            const changeDescription = formatChangeMap(result.changeMap);
            console.log('Purchase successful:', changeDescription);
            alert(`Product ${result.product.name} purchased successfully! Change given: ${changeDescription}.`);
            refetchTotal();
        } 
        catch (error) {
            console.log('FAiled:', error.data.message);
            alert(`Failed to purchase product!  Reason:  ${ error.data.message} `);
        }
    };

    return (
        isLoading ? (
            <div>Loading...</div>
        ) : (
            <div>
                <h1>Vending Machine</h1>
                <div>Current Money: {currentTotal}</div>

                <MoneyTypeSelector session={session} refetchTotal={refetchTotal} /> 
                <ProductList onProductSelect={setSelectedProductId} />
                <button onClick={handleRefund} disabled={isRefunding}>Refund Money</button>
                <button onClick={handlePurchase} disabled={isLoading}>Buy Product</button>
            </div>
        )
    );
}

export default VendingMachineInterface;
