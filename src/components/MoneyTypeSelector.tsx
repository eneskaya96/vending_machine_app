// components/MoneyTypeSelector.tsx
import React, { useState } from 'react';

import { useGetMoneyTypesQuery, useInsertMoneyMutation } from '@/services/moneyService';

import { DefaultErrorState } from './DefaultErrorState';
import LoadingSpinner from './ui-kit/loading-spinner/LoadingSpinner';


function MoneyTypeSelector() {
  const { data: moneyTypes, error, isLoading } = useGetMoneyTypesQuery();
  const [insertMoney, { isLoading: isInsertLoading }] = useInsertMoneyMutation();
  const [selectedMoneyTypeId, setSelectedMoneyTypeId] = useState('');

  if (isLoading) return <LoadingSpinner />;
  if (error) return <DefaultErrorState error={error} />;

  const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMoneyTypeId(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedMoneyTypeId) {
      await insertMoney({ moneyTypeId: selectedMoneyTypeId });
      alert('Money type inserted successfully!');
    }
  };

  return (
    <div>
      <h1>Select Money Type</h1>
      <form onSubmit={handleSubmit}>
        <select value={selectedMoneyTypeId} onChange={handleSelectionChange}>
          {moneyTypes?.map((type) => (
            <option key={type.id} value={type.id}>
              {type.id} - Value: {type.denomination}
            </option>
          ))}
        </select>
        <button type="submit" disabled={isInsertLoading}>Insert Money</button>
      </form>
    </div>
  );
}

export default MoneyTypeSelector;
