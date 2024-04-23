import { ReactElement } from 'react';

import AdminControlPanel from '@/components/AdminControlPanel';
import { ProtectedLayout } from '@/components/layouts';

import { NextPageWithLayout } from '../_app';

const AdminPage: NextPageWithLayout = () => {
  return (
    <div >
      <AdminControlPanel/>
    </div>
  );
};

export default AdminPage;

AdminPage.getLayout = function getLayout(page: ReactElement) {
  return <ProtectedLayout>{page}</ProtectedLayout>;
};
