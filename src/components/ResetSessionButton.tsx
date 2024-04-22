import React from 'react';

import { useResetSessionMutation } from '@/services/transactionSessionService';
import { getSession } from '@/utils/sessionsStorage';

function ResetSessionButton() {
  const [resetSession, { isLoading, isError, error }] = useResetSessionMutation();

  const handleReset = async () => {
    const session = getSession();
    if (!session || !session.sessionId) {
      alert('No active session to reset.');
      return;
    }

    // Ensure sessionId is parsed as a number before passing it to resetSession
    const sessionId = parseInt(session.sessionId);
    if (isNaN(sessionId)) {
      alert('Session ID is invalid.');
      return;
    }

    try {
      await resetSession({ sessionId }).unwrap();
      alert('Session has been successfully reset.');
    } catch (err) {
      const errorMessage = err.data?.message || 'Failed to reset the session.';
      alert(errorMessage);
    }
  };

  return (
    <div>
      <button onClick={handleReset} disabled={isLoading}>
        {isLoading ? 'Resetting...' : 'Reset Session'}
      </button>
      {isError && <p>Error resetting the session: {error?.data?.message || 'Unknown error'}</p>}
    </div>
  );
}

export default ResetSessionButton;
