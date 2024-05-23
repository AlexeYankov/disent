import { toast } from 'react-toastify';

export const toastWrapper = (value: string, error: boolean = false) => {
  if (error) {
    return toast.error(value);
  }
  toast.success(value);
};