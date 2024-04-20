import { ReactNode } from 'react';
import { toast, ToastOptions } from 'react-toastify';

import { UNKNOWN_ERROR } from '../constants/constants';

const options: ToastOptions = {
  position: 'top-right',
};

export const showErrorMessage = (errorMessage?: string) => {
  toast.error(errorMessage ?? UNKNOWN_ERROR, options);
};

export const showSuccessMessage = (message: string | ReactNode, customOption?: ToastOptions) => {
  toast.success(message, { ...options, ...customOption });
};

export const showInfoMessage = (message: string) => {
  toast.info(message, options);
};
