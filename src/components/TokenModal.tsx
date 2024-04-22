import React, { useState } from 'react';

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
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translate(-50%, -50%)", background: "white", padding: "20px" }}>
            <input type="text" value={inputToken} onChange={(e) => setInputToken(e.target.value)} placeholder="Enter token" />
            <button onClick={handleSubmit}>Submit Token</button>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default TokenModal;
