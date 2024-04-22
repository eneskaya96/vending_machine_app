import React, { useState } from 'react';

import { Product } from '@/models/product.model';
import { useGetProductsQuery } from '@/services/productService';
import styles from '@/styles/components/ProductList.module.scss';
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
    <h2 className={styles.heading}>Select a Product</h2>
    {matchQuery(query, {
      error: (error: any) => <DefaultErrorState error={error} />,
      idle: () => null,
      loading: () => <LoadingSpinner />,
      success: (products: Product[]) => (
        <ul className={styles.productList}>
          {products.map((product) => (
            <li
              key={product.id}
              className={activeProductId === product.id ? styles.active : ''}
              onClick={() => {
                onProductSelect(product.id);
                setActiveProductId(product.id);
              }}
            >
            Name: {product.name} -- Price: {product.price} Units Money
            </li>
          ))}
        </ul>
      ),
    })}
  </>
  );
}

export default ProductList;
