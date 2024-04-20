import { ReactElement } from 'react';

import { ProtectedLayout } from '@/components/layouts';
import MoneyTypeSelector from '@/components/MoneyTypeSelector';
import ProductList from '@/components/product-list/productList';

import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <MoneyTypeSelector/>
      <ProductList />
    </>
  );
};

export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
  return <ProtectedLayout>{page}</ProtectedLayout>;
};
