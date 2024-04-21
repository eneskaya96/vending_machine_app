import React, { useState } from 'react';

import { Product } from '@/models/product.model';
import { useGetProductsQuery } from '@/services/productService';
import { matchQuery } from '@/utils/toolkitQuery';

import { DefaultErrorState } from '../DefaultErrorState';
import LoadingSpinner from '../ui-kit/loading-spinner/LoadingSpinner';

type Props = {
  onProductSelect: (productId: string) => void;
};

const ProductList: React.FC<Props> = ({onProductSelect}) => {
  const [activeProductId, setActiveProductId] = useState("");
  const query = useGetProductsQuery();


  return (
    <>
      {matchQuery(query, {
        error: (error: any) => <DefaultErrorState error={error} />,
        idle: () => null,
        loading: () => <LoadingSpinner />,
        success: (products: Product[]) => (
          <>
            <ul>
              {products.map((product) => (
                <li
                  key={product.id}
                  style={{ backgroundColor: activeProductId === product.id ? 'lightgray' : 'transparent' }}
                  onClick={() => {
                    onProductSelect(product.id);
                    setActiveProductId(product.id)
                  }}
                >
                  Name: {product.name}, Quantity: {product.quantity}, Price: {product.price}
                </li>
              ))}
            </ul>
          </>
        ),
      })}
    </>
  );
}

export default ProductList;
