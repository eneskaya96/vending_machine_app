import { ReactElement } from 'react';

import { ProtectedLayout } from '@/components/layouts';
import VendingMachineInterface from '@/components/VendingMachineInterface';

import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <VendingMachineInterface/>
    </>
  );
};

export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
  return <ProtectedLayout>{page}</ProtectedLayout>;
};
