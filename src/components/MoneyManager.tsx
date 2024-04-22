import React, { useState } from 'react';

import { useAuth } from '@/context/AuthContext';

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
        <div>
            <h1>Manage Money</h1>
            <ul>
                {moneyTypes?.map((moneyType: MoneyType) => (
                    <li key={moneyType.moneyTypeID}>
                        {moneyType.name} ({moneyType.denomination}):
                        <input
                            type="number"
                            value={amounts[parseInt(moneyType.moneyTypeID)] || ''}
                            onChange={(e) => handleAmountChange(parseInt(moneyType.moneyTypeID), e.target.value)}
                        />
                        <button onClick={() => handleUpdateQuantity(parseInt(moneyType.moneyTypeID))}>Update</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MoneyManager;
