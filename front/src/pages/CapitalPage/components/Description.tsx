import { Typography } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import React from 'react';
import { useQuery } from 'react-query';

import { getCapitalStatusForUser } from '../../../api/status';
import { StatusModal } from '../../../components/StatusModal/StatusModal';
import { useAuthStore } from '../../../store/authStore';

const Description = ({ text, capital }: { text: string; capital?: string }) => {
  const { token } = useAuthStore();
  const status = useQuery({
    queryKey: ['status', [capital, token]],
    queryFn: () =>
      getCapitalStatusForUser({
        capitalName: capital || '',
        token: token || '',
      }),
    enabled: !!capital,
  });
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
      }}
    >
      {token && capital && (
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignSelf: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Typography.Paragraph
            style={{
              fontSize: '24px',
              padding: '0 20px',
              marginBottom: '0px',
              marginRight: '10px',
              border: '4px solid #1DA57A',
            }}
          >
            {status.data === 'UNDEFINED'
              ? 'Not visited'
              : status.data === 'WANTVISIT'
              ? 'want to visit'
              : 'visited'}
          </Typography.Paragraph>
          <StatusModal capital={capital} />
        </div>
      )}
      <Typography.Text style={{ fontSize: '34px', fontWeight: '500' }}>
        Description
      </Typography.Text>
      <Paragraph
        ellipsis={{ rows: 10, expandable: true, symbol: 'more' }}
        style={{
          whiteSpace: 'pre-wrap',
          // width: '80%',
          background: 'rgba(250,250,250,0.5)',
          padding: '30px',
          margin: '20px 0',
        }}
      >
        {'\t\t' + text.replaceAll('\n', '\n\n\t\t')}
      </Paragraph>
    </div>
  );
};
export { Description };
