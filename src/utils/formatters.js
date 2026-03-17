import { format } from 'date-fns';

export const formatINR = (amount = 0) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(amount || 0));
};

export const formatDate = (dateInput) => {
  if (!dateInput) return '--';
  return format(new Date(dateInput), 'dd/MM/yyyy');
};
