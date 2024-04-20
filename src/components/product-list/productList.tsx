import React from 'react';

import { Product } from '@/models/product.model';
import { useGetProductsQuery } from '@/services/productService';
import { matchQuery } from '@/utils/toolkitQuery';

import { DefaultErrorState } from '../DefaultErrorState';
import LoadingSpinner from '../ui-kit/loading-spinner/LoadingSpinner';

function ProductList() {
  const query = useGetProductsQuery();

  return (
    <>
    {matchQuery(query, {
      error: (error: any) => {
        return <DefaultErrorState error={error}></DefaultErrorState>;
      },
      idle: () => null,
      loading: () => <LoadingSpinner />,
      success: (products: Product[]) => {
        return (
          <>
            <ul>
              {products.map((product) => (
                <li key={product.id}>Name: {product.name} Qunatity: {product.quantity} Price: {product.price}</li>
              ))}
            </ul>
          </>
        );
      },
    })}
    </>
  );
}

export default ProductList;
