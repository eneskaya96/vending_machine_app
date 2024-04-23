import React, { useState } from 'react';

import { useAuth } from '@/context/AuthContext';
import globalStyles from '@/styles/components/CommonSytles.module.scss';
import styles from '@/styles/components/ProductManager.module.scss';

import { Product } from '../models/product.model';
import { useGetProductsQuery, useUpdateProductMutation } from '../services/productService';

const ProductManager: React.FC = () => {
    const { data: products, isLoading, error } = useGetProductsQuery();
    const [updateProduct] = useUpdateProductMutation();

    const { token } = useAuth();
    const [updates, setUpdates] = useState<Record<number, { quantity: string; price: string }>>({});

    const handleChange = (productId: number, field: 'quantity' | 'price', value: string) => {
        setUpdates(prev => ({
            ...prev,
            [productId]: {
                ...prev[productId],
                [field]: value
            }
        }));
    };

    const handleUpdate = (productId: number) => {
        const updatesToApply = updates[productId];
        if (updatesToApply && (!isNaN(parseInt(updatesToApply.quantity)) || !isNaN(parseFloat(updatesToApply.price)))) {
            updateProduct({
                productId,
                quantity: parseInt(updatesToApply.quantity, 10),
                price: parseFloat(updatesToApply.price),
                token: token,
            });
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading products!</p>;

    return (
        <div className={styles.productManager}>
            <h3>Manage Products</h3>
            <ul>
                {products?.map((product: Product) => (
                    <li key={product.id}>
                        {product.name} - Qty: {product.quantity}, Price: {product.price}
                        <div>
                            <label>
                                Update Quantity:
                                <input
                                    type="number"
                                    value={updates[parseInt(product.id)]?.quantity || ''}
                                    onChange={(e) => handleChange(parseInt(product.id), 'quantity', e.target.value)}
                                />
                            </label>
                            <label>
                                Update Price:
                                <input
                                    type="number"
                                    step="0.01"
                                    value={updates[parseInt(product.id)]?.price || ''}
                                    onChange={(e) => handleChange(parseInt(product.id), 'price', e.target.value)}
                                />
                            </label>
                            <button className={globalStyles.button} onClick={() => handleUpdate(parseInt(product.id))}>Update</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductManager;
