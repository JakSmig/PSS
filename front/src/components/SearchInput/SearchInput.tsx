import { Select, SelectProps } from 'antd';
import React, { useState } from 'react';

import { getCapitalInfoByCountry } from '../../api/capital';
import { Capital } from '../../lib/types';
import { MainCapitalCard } from '../MainCapitalCard';

const SearchInput = ({ capitals }: { capitals: Capital[] }) => {
  const [data, setData] = useState<SelectProps['options']>([]);
  const [value, setValue] = useState<string>();
  const [selected, setSelected] = useState<Capital | null>(null);

  const handleSearch = (newValue: string) => {
    if (newValue) {
      const result = capitals.filter(
        capital =>
          (capital.name && capital.name.toLowerCase().includes(newValue)) ||
          (capital.country && capital.country.toLowerCase().includes(newValue)),
      );
      const res = result.map(e => ({
        value: e.name + ', ' + e.country,
        label: e.name + ', ' + e.country,
      }));
      setData(res);
    } else {
      setData([]);
    }
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
    const [, capCountry] = newValue.split(', ');
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getCapitalInfoByCountry(capCountry).then(res => setSelected(res));
  };

  return (
    <>
      <Select
        showSearch
        value={value}
        placeholder="Type to find capital..."
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        notFoundContent={null}
        size="large"
        style={{
          width: '400px',
          border: '2px solid #8a8a8a',
          borderRadius: '5px',
          boxShadow: '5px 5px 10px #545454',
        }}
        options={(data || []).map(d => ({
          value: d.value,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          label: d.text,
        }))}
      />
      {selected && <MainCapitalCard capital={selected} />}
    </>
  );
};

export { SearchInput };
