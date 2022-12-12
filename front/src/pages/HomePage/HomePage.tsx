import { Layout, Space, Typography } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';

import { getCapitalsInBounds } from '../../api/capital';
import { CardCarousel } from '../../components/CardCarousel/CardCarousel';
import { SearchInput } from '../../components/SearchInput/SearchInput';
import { HomePageTestIds } from '../../lib/TestIds/ComponentTestId';
import { useThemeStore } from '../../store/themeStore';
import DayWawa from './../../assets/images/wawad2.jpg';
import NightWawa from './../../assets/images/wawan.jpg';
import './HomePage.less';
const date = new Date();
const today = date.getDate();
const HomePage = () => {
  const { theme } = useThemeStore();
  const Img = theme === 'light' ? DayWawa : NightWawa;

  const capitals = useQuery({
    queryKey: ['dateAllCapittals', today],
    queryFn: getCapitalsInBounds,
  });

  return (
    <Layout
      data-theme={theme}
      style={{
        minHeight: '200vh',
      }}
      data-testid={HomePageTestIds.Container}
    >
      <div
        className="first-screen"
        style={{
          backgroundImage: `url(${Img})`,
        }}
      >
        <Space className="main-text-container">
          <Typography.Paragraph
            className="main-text"
            data-testid={HomePageTestIds.Title}
          >
            The whole world in one place
          </Typography.Paragraph>
          <Typography.Paragraph className="subtitle">
            Check out reviews, weather and all basic usefull information about
            the country you are going to. Share your tips and experience that
            might come in handy for other people.
          </Typography.Paragraph>
        </Space>
        {capitals.data && <SearchInput capitals={capitals.data} />}
      </div>
      <Space
        className="second-screen"
        style={{
          backgroundColor: theme === 'light' ? '#9dc9bb' : '#2e1b40',
        }}
      >
        <CardCarousel />
      </Space>
      <Layout.Footer
        style={{
          backgroundColor: theme === 'light' ? '#9dc9bb' : '#2e1b40',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography.Text>@All Right Reserved.</Typography.Text>
        <Typography.Text>
          Our Privacy Policy & Terms and Conditions
        </Typography.Text>
      </Layout.Footer>
    </Layout>
  );
};

export { HomePage };
