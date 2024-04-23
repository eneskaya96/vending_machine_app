import { useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { useAddProductMutation } from "@/services/productService";
import styles from '@/styles/components/AddProduct.module.scss';
import globalStyles from '@/styles/components/CommonSytles.module.scss';

export default function AddProduct() {
  
  const [addProduct, { isLoading, isSuccess, isError }] = useAddProductMutation();
  
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const { token } = useAuth();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const product = {
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
    };
    await addProduct({ product: product, token });
    if (isSuccess) {
      setName('');
      setPrice('');
      setQuantity('');
    }
  };

  return (
    <>
      <h3>Add Product</h3>
      <form onSubmit={handleSubmit} className={styles.addProductForm}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" required />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" required />
        <button className={globalStyles.button} type="submit" disabled={isLoading}>Add Product</button>
        {isError && <p className={styles.feedback}>Error adding product.</p>}
        {isSuccess && <p className={styles.feedback + ' ' + styles.success}>Product added successfully!</p>}
      </form>
    </>
  );
}
