import { Col, Row, Typography } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';

import { getCapitalInfo, getCapitalInfoByCountry } from '../../../api/capital';
import { useIpLookup, useLocation } from '../../../api/weather';
import { Converter } from '../../../components/Converter/Converter';
import { WeatherCard } from '../../../components/WeatherCard/WeatherCard';
const Information = ({ capital }: { capital: string }) => {
  const query = useQuery({
    queryKey: ['capital', capital],
    queryFn: () => getCapitalInfo(capital || ''),
    enabled: !!capital,
  });
  const coordinates = query.data?.coordenates;
  const { data } = useLocation(
    coordinates?.substring(1, coordinates.length - 1).replace(/\s/g, '') || '',
  );

  const { data: ip } = useIpLookup();

  const myCountry = useQuery({
    queryKey: ['capitalCountry', ip?.country_name],
    queryFn: () => getCapitalInfoByCountry(ip?.country_name || ''),
    enabled: !!ip?.country_name,
  });
  return (
    <>
      {data && myCountry.data && (
        <Row
          style={{
            height: '100%',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Col style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography.Text style={{ fontSize: '34px', fontWeight: '500' }}>
              Current weather
            </Typography.Text>
            <WeatherCard
              icon={data.current.condition.icon}
              text={data.current.condition.text}
              temperature={data.current.temp_c}
              feelsLike={data.current.feelslike_c}
            />
          </Col>
          <Col style={{ marginLeft: '50px' }}>
            <Typography.Text style={{ fontSize: '34px', fontWeight: '500' }}>
              Currency converter
            </Typography.Text>
            <Converter
              toCurr={myCountry.data?.currency}
              fromCurr={query.data?.currency || 'PLN'}
            />
          </Col>
        </Row>
      )}
    </>
  );
};

export { Information };
