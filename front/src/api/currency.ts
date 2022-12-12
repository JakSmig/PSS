import { currencyClient } from '../lib/axios';
import { Currency, ExchangeRates } from '../lib/types';
type Props = {
  toCurrency: string;
  fromCurrency: string;
  amount: number;
};
export const getAllCurrency = () => {
  return currencyClient.get<Currency>('/latest').then(res => res.data);
};
export const convert = ({ toCurrency, fromCurrency, amount }: Props) => {
  return currencyClient
    .get<ExchangeRates>('/convert', {
      params: {
        to: toCurrency,
        from: fromCurrency,
        amount,
      },
    })
    .then(res => res.data);
};
