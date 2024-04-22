import { useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { useAddProductMutation } from "@/services/productService";

interface Props {
}

export default function AddProduct() {
  
  const [addProduct, { isLoading, isSuccess, isError }] = useAddProductMutation();
  
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const { token } = useAuth();

  const handleSubmit = async (event) => {
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
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" required />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" required />
        <button type="submit" disabled={isLoading}>Add Product</button>
        {isError && <p>Error adding product.</p>}
        {isSuccess && <p>Product added successfully!</p>}
      </form>
    </>
  );
}
