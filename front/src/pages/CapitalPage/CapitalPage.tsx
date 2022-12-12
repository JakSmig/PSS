import {
  AppstoreOutlined,
  GlobalOutlined,
  LoadingOutlined,
  StarOutlined,
} from '@ant-design/icons';
import {
  Button,
  Layout,
  Menu,
  Radio,
  RadioChangeEvent,
  Space,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { getCapitalInfo } from '../../api/capital';
import { getReviewsForCapital } from '../../api/review';
import { CapitalCard } from '../../components/CapitalCard';
import { CommentCard } from '../../components/Comment/CommentCard';
import { ReviewForm } from '../../components/ReviewForm/ReviewForm';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';
import './CapitalPage.less';
import { Description } from './components/Description';
import { Gallery } from './components/Gallery';
import { Information } from './components/Information';
import { RatingComponent } from './components/RatingComponent';

const CapitalPage = () => {
  const { capital } = useParams();
  const { theme } = useThemeStore();
  const { token } = useAuthStore();
  const [modal, setModal] = useState(false);
  const [sorting, setSorting] = useState('');
  const [selectedMenuItem, setSelectedMenuItem] = useState('description');

  const query = useQuery({
    queryKey: ['capital', capital],
    queryFn: () => getCapitalInfo(capital || ''),
    enabled: !!capital,
  });

  const reviews = useQuery({
    queryKey: ['rewiews', [capital, sorting]],
    queryFn: () =>
      getReviewsForCapital({
        capitalName: capital || '',
        token: token || '',
        optionalSort: sorting,
      }),
    enabled: !!capital,
  });

  const componentsSwitch = (key: string) => {
    switch (key) {
      case 'description':
        return (
          <Description text={query.data?.description || ''} capital={capital} />
        );
      case 'ratings':
        return <RatingComponent capitalName={capital || ''} />;
      case 'info':
        return <Information capital={capital || ''} />;
      case 'gallery':
        return <Gallery capitalName={capital || ''} />;
      default:
        break;
    }
  };

  const handleSort = ({ target: { value } }: RadioChangeEvent) => {
    setSorting(value as string);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    reviews.refetch();
  };

  const options = [
    { label: 'Date', value: 'creationTime' },
    { label: 'Likes', value: 'likeRatio' },
    { label: 'Rating', value: 'ratingGeneral' },
  ];

  const renderContent = () => {
    if (reviews.isLoading) {
      return (
        <Space align="center" style={{ height: '100%' }}>
          <LoadingOutlined style={{ fontSize: '100px' }} />
        </Space>
      );
    }
    if (token && reviews.data) {
      if (reviews.data.length === 0) {
        return (
          <Space align="center" style={{ height: '100%' }}>
            <Typography.Paragraph
              className="login-text"
              style={{
                margin: '0 20px',
                backgroundColor:
                  theme === 'light'
                    ? 'rgba(250,250,250, 0.5)'
                    : 'rgba(0,0,0,0.5)',
              }}
            >
              There is no comment yet
            </Typography.Paragraph>
          </Space>
        );
      }
      return (
        <>
          <Space
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '100%',
              marginTop: '20px',
            }}
          >
            <Radio.Group
              options={options}
              onChange={handleSort}
              optionType="button"
              buttonStyle="solid"
              style={{ border: '3px solid #fff' }}
            />
          </Space>
          {reviews.data.map(
            (r, idx) =>
              r.commentStatus === 'ACTIVE' && (
                <CommentCard
                  key={idx}
                  review={r}
                  onRefetch={reviews.refetch}
                  token={token || ''}
                />
              ),
          )}
        </>
      );
    }

    return (
      <Space align="center" style={{ height: '100%' }}>
        <Typography.Paragraph
          className="login-text"
          style={{
            backgroundColor:
              theme === 'light' ? 'rgba(250,250,250, 0.5)' : 'rgba(0,0,0,0.5)',
          }}
        >
          You need to log in to see reviews
        </Typography.Paragraph>
      </Space>
    );
  };

  return (
    <Layout data-theme={theme} className="layout">
      <Layout.Content className="content">
        {query.data && (
          <>
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <CapitalCard
                name={query.data?.name}
                country={query.data?.country}
                image={
                  query.data.flaglocation
                    ? query.data.flaglocation.value
                    : undefined
                }
              />
              <Menu
                mode="horizontal"
                defaultSelectedKeys={['description']}
                style={{ width: '100%', marginLeft: '50px' }}
                onClick={e => setSelectedMenuItem(e.key)}
              >
                <Menu.Item key="description" icon={<GlobalOutlined />}>
                  Description
                </Menu.Item>
                {token && (
                  <Menu.Item key="ratings" icon={<StarOutlined />}>
                    Ratings
                  </Menu.Item>
                )}
                <Menu.Item key="info" icon={<AppstoreOutlined />}>
                  Information
                </Menu.Item>
                {token && (
                  <Menu.Item key="gallery" icon={<AppstoreOutlined />}>
                    Gallery
                  </Menu.Item>
                )}
              </Menu>
              {token && (
                <Button
                  data-theme={theme}
                  type="primary"
                  onClick={() => setModal(true)}
                  style={{ margin: '0px 20px' }}
                >
                  Add review
                </Button>
              )}
            </div>
            <div
              style={{
                marginTop: '30px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {componentsSwitch(selectedMenuItem)}
            </div>
          </>
        )}
        {modal && (
          <ReviewForm
            capitalName={capital || ''}
            closeModal={() => {
              setModal(false);
              reviews
                .refetch()
                .then()
                .catch(() => {
                  //
                });
            }}
          />
        )}
      </Layout.Content>
      <Layout.Sider data-theme={theme} width={400} className="sider">
        {renderContent()}
      </Layout.Sider>
    </Layout>
  );
};

export { CapitalPage };
