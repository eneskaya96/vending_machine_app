import { useState } from "react";

import { useAuth } from "@/context/AuthContext";

import AddProduct from "./AddProduct";
import MoneyManager from "./MoneyManager";
import ProductManager from "./ProductManager";
import ResetSessionButton from "./ResetSessionButton";
import TokenModal from "./TokenModal";

interface Props {
}

export default function AdminControlPanel({ }: Props) {
    const [isModalOpen, setModalOpen] = useState(false);
    const { token, setToken } = useAuth();
    return (
        <div >
            {isModalOpen && <TokenModal onClose={() => setModalOpen(false)} onTokenSubmit={setToken} />}
            <button onClick={() => setModalOpen(true)}>Enter Token</button>
            <AddProduct/>
            <ResetSessionButton/>
            <MoneyManager/>
            <ProductManager />
        </div>
    );
}
