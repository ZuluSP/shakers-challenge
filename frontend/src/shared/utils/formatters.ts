export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatBudgetRange = (from: number, to: number): string => {
  const f = (n: number) => n.toLocaleString('es-ES'); 
  return `${f(from)} - ${f(to)} €/h`;
};