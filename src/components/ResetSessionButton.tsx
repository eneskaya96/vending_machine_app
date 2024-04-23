import { AxiosError } from 'axios';
import React from 'react';

import { useAuth } from '@/context/AuthContext';
import { useResetSessionMutation } from '@/services/transactionSessionService';
import globalStyles from '@/styles/components/CommonSytles.module.scss';
import { getSession } from '@/utils/sessionsStorage';

function ResetSessionButton() {
  const [resetSession, { isLoading, isError, error }] = useResetSessionMutation();

  const { token } = useAuth();

  const handleReset = async () => {
    const session = getSession();
    if (!session || !session.sessionId) {
      alert('No active session to reset.');
      return;
    }

    const sessionId = parseInt(session.sessionId);
    if (isNaN(sessionId)) {
      alert('Session ID is invalid.');
      return;
    }

    try {
      await resetSession({ sessionId, token }).unwrap();
      alert('Session has been successfully reset.');
    } catch (err) {
      // @ts-ignore
      const errorMessage = (err as AxiosError).response?.data?.message || 'Failed to reset the session.';
      alert(errorMessage);
    }
  };

  return (
    <div>
      <button className={globalStyles.button} onClick={handleReset} disabled={isLoading}>
        {isLoading ? 'Resetting...' : 'Reset Session'}
      </button>
    </div>
  );
}

export default ResetSessionButton;
