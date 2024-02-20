export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en", {
    currencyDisplay: "narrowSymbol",
    style: "currency",
    currency: "GBP",
  }).format(value);
