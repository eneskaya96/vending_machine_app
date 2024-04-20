import { ReactElement } from 'react';

import { ProtectedLayout } from '@/components/layouts';
import styles from '@/styles/pages/About.module.scss';

import { NextPageWithLayout } from '../_app';

const About: NextPageWithLayout = () => {
  return (
    <div className={styles.container}>
      About Mobile App
    </div>
  );
};

export default About;

About.getLayout = function getLayout(page: ReactElement) {
  return <ProtectedLayout>{page}</ProtectedLayout>;
};
