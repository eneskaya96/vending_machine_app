import React, { useEffect, useRef, useState } from 'react';

import { formatChangeMap } from '@/models/chainMap.model';
import { TransactionSession } from '@/models/transactionSession.model';
import { useGetCurrentTotalQuery, usePurchaseProductMutation, useRefundMoneyMutation, useStartSessionMutation } from '@/services/transactionSessionService';
import styles from '@/styles/pages/VendingMachineInterface.module.scss';
import { getSession, setSession } from '@/utils/sessionsStorage';

import MoneyTypeSelector from './MoneyTypeSelector';
import ProductList from './product-list/productList';

function VendingMachineInterface() {
    const [session, setSessionState] = useState<TransactionSession | null>(getSession());
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [startSession, { isLoading: isStartingSession }] = useStartSessionMutation();
    const [purchaseProduct, { isLoading }] = usePurchaseProductMutation();
    const [refundMoney, { isLoading: isRefunding }] = useRefundMoneyMutation();
    const { data: currentTotal, refetch: refetchTotal } = useGetCurrentTotalQuery(session?.sessionId || '', { skip: !session?.sessionId });
    const initiatedRef = useRef(false);

    useEffect(() => {
        if (!session && !initiatedRef.current && !isStartingSession) {
            initiatedRef.current = true;
            startSession().unwrap().then(setNewSession).catch(console.error);
        } 
    }, [session, startSession, isStartingSession]);

    const setNewSession = (transaction_session: any) => {
        setSessionState(transaction_session);
        setSession(transaction_session);
    };

    const handleRefund = async () => {
        if (!session?.sessionId) return;
        try {
            await refundMoney(session.sessionId).unwrap();
            alert('Refund processed successfully!');
            refetchTotal();
        } catch (error) {
            console.error('Refund failed:', error);
            alert('Failed to process the refund!');
        }
    };

    const handlePurchase = async () => {
        if (!selectedProductId) {
            alert('Please select a product!');
            return;
        }
        try {
            const result = await purchaseProduct({ sessionId: parseInt(session!.sessionId), productId: parseInt(selectedProductId) }).unwrap();
            alert(`Product ${result.product.name} purchased successfully! Change given: ${formatChangeMap(result.changeMap)}.`);
            refetchTotal();
        } catch (error: unknown) {
            if (typeof error === 'object' && error !== null && 'data' in error) {
                const err = error as { data: { message?: string } };
                console.log('Failed:', err.data?.message);
                alert(`Failed to purchase product! Reason: ${err.data?.message}`);
            } else {
                console.error('Unexpected error type:', error);
                alert('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className={styles['vending-machine']}>
            {isLoading ? (
                <div className={styles.loading}>Loading...</div>
            ) : (
                <>
                    <h1>Vending Machine</h1>
                    <div className={styles['current-money']}>Current Money: {currentTotal}</div>
                    <MoneyTypeSelector session={session} refetchTotal={refetchTotal} />
                    <ProductList onProductSelect={setSelectedProductId} />
                    <div className={styles['button-container']}>
                        <button className={styles.button} onClick={handleRefund} disabled={isRefunding}>Refund Money</button>
                        <button className={styles.button} onClick={handlePurchase} disabled={isLoading}>Buy Product</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default VendingMachineInterface;
