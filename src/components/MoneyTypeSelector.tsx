// components/MoneyTypeSelector.tsx
import React, { useState } from 'react';

import { TransactionSession } from '@/models/transactionSession.model';
import { useGetMoneyTypesQuery } from '@/services/moneyService';
import { useInsertMoneyMutation } from '@/services/transactionSessionService';
import styles from '@/styles/components/MoneyTypeSelector.module.scss';

import { DefaultErrorState } from './DefaultErrorState';
import LoadingSpinner from './ui-kit/loading-spinner/LoadingSpinner';

type Props = {
    session: TransactionSession | null;
    refetchTotal: VoidFunction
};

const MoneyTypeSelector: React.FC<Props> = ({ session, refetchTotal }) => {
  const { data: moneyTypes, error, isLoading } = useGetMoneyTypesQuery();
  const [insertMoney, { isLoading: isInsertLoading }] = useInsertMoneyMutation();
  const [selectedMoneyType, setSelectedMoneyType] = useState('');

  if (isLoading) return <LoadingSpinner />;
  if (error) return <DefaultErrorState error={error} />;

  const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMoneyType(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedMoneyType && session && session.sessionId) {
        // Assume that insertMoney expects an object with session ID, money type ID, and quantity
        try {
          await insertMoney({
            sessionId: parseInt(session.sessionId),
            denomination: selectedMoneyType,
            quantity: 1
          }).unwrap();
          alert('Money added successfully!');
          refetchTotal(); 
        } catch (error) {
          console.error('Failed to insert money:', error);
          alert('Failed to insert money!');
        }
      } else {
        alert('Please select a money type and ensure a session is active.');
      }
  };

  return (
    <div className={styles.moneyTypeSelector}>
      <h1>Select Money Type</h1>
      <form onSubmit={handleSubmit}>
        <select value={selectedMoneyType} onChange={handleSelectionChange} className={styles.selectMenu}>
          <option value="" disabled selected={!selectedMoneyType}>
            Please select a money type
          </option>
          {moneyTypes?.map((type) => (
            <option key={type.moneyTypeID} value={type.denomination} className={styles.optionItem}>
              {type.denomination} Units
            </option>
          ))}
        </select>
        <button type="submit" disabled={isInsertLoading}>Insert Money</button>
      </form>
    </div>
  );
}

export default MoneyTypeSelector;
