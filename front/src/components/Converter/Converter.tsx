import { InputNumber, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { convert, getAllCurrency } from '../../api/currency';

type Props = {
  fromCurr: string;
  toCurr: string;
};

const Converter = ({ fromCurr, toCurr }: Props) => {
  const [currencyOptions, setCurrencyOptions] = useState(['']);
  const [fromCurrency, setFromCurrency] = useState(fromCurr);
  const [toCurrency, setToCurrency] = useState(toCurr);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const options = currencyOptions.map(value => ({
    value,
  }));
  let toAmount, fromAmount;

  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = Math.round(amount * exchangeRate * 1000) / 1000;
  } else {
    toAmount = amount;
    fromAmount = Math.round(amount * exchangeRate * 1000) / 1000;
  }
  const query = useQuery({
    queryFn: () => getAllCurrency(),
  });

  const queryConvert = useQuery({
    queryKey: ['convertSetails', { fromCurrency, toCurrency }],
    queryFn: () => convert({ fromCurrency, toCurrency, amount }),
    enabled: !!amount,
    cacheTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const curr: string[] = Object.keys(query.data?.rates || {});

    const firstCurrency = curr[0];
    setCurrencyOptions(curr);
    if (query.data) {
      setFromCurrency(query.data.base);
      setExchangeRate(query.data?.rates[firstCurrency]);
    }
    setToCurrency(firstCurrency);
  }, [query.data]);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      queryConvert.data && setExchangeRate(queryConvert.data?.result);
    }
  }, [fromCurrency, queryConvert.data, toCurrency]);

  const onChangeFrom = (value: number | null) => {
    value && setAmount(value);
    setAmountInFromCurrency(true);
  };
  const onChangeTo = (value: number | null) => {
    value && setAmount(value);
    setAmountInFromCurrency(false);
  };
  return (
    <>
      <div>
        <InputNumber
          onChange={value => onChangeFrom(value)}
          value={fromAmount}
        />
        <Select
          defaultValue={fromCurrency}
          style={{ width: 120 }}
          onChange={setFromCurrency}
          options={options}
        />
      </div>
      <div>=</div>
      <div>
        <InputNumber onChange={value => onChangeTo(value)} value={toAmount} />
        <Select
          defaultValue={toCurrency}
          style={{ width: 120 }}
          onChange={setToCurrency}
          options={options}
        />
      </div>
    </>
  );
};

export { Converter };
