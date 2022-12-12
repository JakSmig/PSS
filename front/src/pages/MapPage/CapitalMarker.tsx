import { Image, Space, Typography } from 'antd';
import React from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { getCapitalInfo } from '../../api/capital';
import { useThemeStore } from '../../store/themeStore';
import './CapitalMarker.less';
type Props = {
  name: string;
  lat: number;
  lon: number;
  zoom: number;
};

const CapitalMarker = ({ name, lat, lon, zoom }: Props) => {
  const { theme } = useThemeStore();
  const query = useQuery({
    queryKey: ['capital', name],
    queryFn: () => getCapitalInfo(name || ''),
    enabled: !!name,
  });

  if (!query.data || !query.data.flaglocation) {
    return (
      <>
        {zoom < 6 ? (
          <Space>
            <Typography.Text>{name}</Typography.Text>
          </Space>
        ) : (
          <Link to={`/capital/${name}`}>
            <Marker position={[lat, lon]} opacity={0}>
              <Tooltip
                data-theme={theme}
                opacity={1}
                interactive
                permanent
                direction="top"
                className="tooltip"
              >
                <Space>
                  <Typography.Title level={4}>{name}</Typography.Title>
                </Space>
              </Tooltip>
            </Marker>
          </Link>
        )}
      </>
    );
  }
  return (
    <>
      {query.data && (
        <Link to={`/capital/${name}`}>
          <Marker position={[lat, lon]} opacity={0}>
            <Tooltip
              data-theme={theme}
              opacity={1}
              interactive
              permanent
              direction="top"
              className="tooltip"
            >
              {zoom < 6 ? (
                <Space>
                  <Typography.Text>{name}</Typography.Text>
                  <Image
                    src={`data:image/svg+xml;base64,${query.data.flaglocation.value}`}
                    alt="flag"
                    width={20}
                    height={10}
                    preview={false}
                  />
                </Space>
              ) : (
                <Space>
                  <Typography.Title level={4}>{name}</Typography.Title>
                  <Image
                    src={`data:image/svg+xml;base64,${query.data.flaglocation.value}`}
                    alt="flag"
                    width={50}
                    height={30}
                    preview={false}
                  />
                </Space>
              )}
            </Tooltip>
          </Marker>
        </Link>
      )}
    </>
  );
};
export { CapitalMarker };
