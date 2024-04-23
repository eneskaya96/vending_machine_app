import { useState } from "react";

import { useAuth } from "@/context/AuthContext";
import globalStyles from '@/styles/components/CommonSytles.module.scss';
import styles from '@/styles/pages/AdminControlPanel.module.scss';

import AddProduct from "./AddProduct";
import MoneyManager from "./MoneyManager";
import ProductManager from "./ProductManager";
import ResetSessionButton from "./ResetSessionButton";
import TokenModal from "./TokenModal";

export default function AdminControlPanel() {
    const [isModalOpen, setModalOpen] = useState(false);
    const { token, setToken } = useAuth();

    return (
        <div className={styles.adminControlPanel}>
            <h1>Admin Control</h1>
            {isModalOpen && <TokenModal onClose={() => setModalOpen(false)} onTokenSubmit={setToken} />}
            {token ? (
                <>
                    <button className={globalStyles.button} onClick={() => setModalOpen(true)}>Enter Token</button>
                    <AddProduct />
                    <ResetSessionButton />
                    <MoneyManager />
                    <ProductManager />
                </>
            ) : (
                <>
                    <p>You need to enter a token to access admin functionalities.</p>
                    <button className={globalStyles.button}  onClick={() => setModalOpen(true)}>Enter Token</button>
                </>
            )}
        </div>
    );
}
