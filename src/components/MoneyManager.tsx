import React, { useState } from 'react';

import { useAuth } from '@/context/AuthContext';
import globalStyles from '@/styles/components/commonSytles.module.scss';
import styles from '@/styles/components/MoneyManager.module.scss';

import { MoneyType } from '../models/money.model';
import { useGetMoneyTypesQuery, useUpdateMoneyTypeQuantityMutation } from '../services/moneyService';

const MoneyManager: React.FC = () => {
    const { data: moneyTypes, isLoading, error } = useGetMoneyTypesQuery();
    const [updateMoneyTypeQuantity] = useUpdateMoneyTypeQuantityMutation();

    const { token } = useAuth();
    const [amounts, setAmounts] = useState<Record<number, string>>({});

    const handleAmountChange = (moneyTypeId: number, value: string) => {
        setAmounts(prev => ({ ...prev, [moneyTypeId]: value }));
    };

    const handleUpdateQuantity = (moneyTypeId: number) => {
        const quantity = parseInt(amounts[moneyTypeId], 10);
        if (!isNaN(quantity)) {
            updateMoneyTypeQuantity({ moneyTypeId, quantity, token });
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading money types!</p>;

    return (
        <div className={styles.moneyManager}>
            <h3>Manage Money</h3>
            <ul>
                {moneyTypes?.map((moneyType: MoneyType) => (
                    <li key={moneyType.moneyTypeID}>
                        ({moneyType.denomination} Unit Money Qunatity: ):
                        <input
                            type="number"
                            value={amounts[parseInt(moneyType.moneyTypeID)] || ''}
                            onChange={(e) => handleAmountChange(parseInt(moneyType.moneyTypeID), e.target.value)}
                        />
                        <button className={globalStyles.button} onClick={() => handleUpdateQuantity(parseInt(moneyType.moneyTypeID))}>Update</button>
                        <div>
                            (Current Qunatity: {moneyType.quantity})
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MoneyManager;
