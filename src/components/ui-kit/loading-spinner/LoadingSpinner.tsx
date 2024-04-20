import clsx from 'clsx';
import React, { FC } from 'react';
import { Spinner, SpinnerProps } from 'react-bootstrap';

import styles from '@/styles/components/ui-kit/LoadingSpinner.module.scss';

interface Props extends SpinnerProps {
  mainClass?: string;
  fullPage?: boolean;
}

const LoadingSpinner: FC<Props> = ({ mainClass, fullPage = false, animation = 'border', ...other }) => {
  return (
    <div className={clsx(mainClass ?? styles.container)}>
      <Spinner animation={animation} {...other} />
    </div>
  );
};

export default LoadingSpinner;
