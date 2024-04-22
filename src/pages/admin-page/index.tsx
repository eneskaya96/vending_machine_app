import { ReactElement } from 'react';

import AdminControlPanel from '@/components/AdminControlPanel';
import { ProtectedLayout } from '@/components/layouts';
import styles from '@/styles/pages/About.module.scss';

import { NextPageWithLayout } from '../_app';

const AdminPage: NextPageWithLayout = () => {
  return (
    <div className={styles.container}>
      Admin Control
      <AdminControlPanel/>
    </div>
  );
};

export default AdminPage;

AdminPage.getLayout = function getLayout(page: ReactElement) {
  return <ProtectedLayout>{page}</ProtectedLayout>;
};
