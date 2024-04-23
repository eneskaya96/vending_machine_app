import React, { useState } from 'react';

import globalStyles from '@/styles/components/CommonSytles.module.scss';
import styles from '@/styles/components/TokenModal.module.scss';

interface TokenModalProps {
    onClose: () => void;
    onTokenSubmit: (token: string) => void;
}

const TokenModal: React.FC<TokenModalProps> = ({ onClose, onTokenSubmit }) => {
    const [inputToken, setInputToken] = useState("");

    const handleSubmit = () => {
        onTokenSubmit(inputToken);
        onClose();
    };

    return (
        <>
            {inputToken && <div className={styles.overlay}></div>}
            <div className={styles.tokenModal}>
                <input type="text" value={inputToken} onChange={(e) => setInputToken(e.target.value)} placeholder="Enter token" />
                <div className={styles.buttonContainer}>
                    <button className={globalStyles.button} onClick={handleSubmit}>Submit Token</button>
                    <button className={globalStyles.button} onClick={onClose}>Close</button>
                </div>
            </div>
        </>
    );
};

export default TokenModal;
