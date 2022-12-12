import { render, screen } from '@testing-library/react';
import React from 'react';

import { TemperatureWidgetTestIds } from '../../lib/TestIds/ComponentTestId';
import { weatherSuccessResponse } from '../../mocks/mockData';
import { WeatherCard } from './WeatherCard';

describe('WeatherInfoWidget', () => {
  it('should render', () => {
    render(
      <WeatherCard
        icon={weatherSuccessResponse.current.condition.icon}
        text={weatherSuccessResponse.current.condition.text}
        temperature={weatherSuccessResponse.current.temp_c}
        feelsLike={weatherSuccessResponse.current.feelslike_c}
      />,
    );
    expect(
      screen.getByTestId(TemperatureWidgetTestIds.Container),
    ).toBeInTheDocument();
  });
  it('should render content properly', () => {
    render(
      <WeatherCard
        icon={weatherSuccessResponse.current.condition.icon}
        text={weatherSuccessResponse.current.condition.text}
        temperature={weatherSuccessResponse.current.temp_c}
        feelsLike={weatherSuccessResponse.current.feelslike_c}
      />,
    );
    const icon = screen.getByRole('img');
    const temperature = screen.getByText(/25/i);
    const feelsLike = screen.getByText(/Feels like:/i);
    expect(icon).toBeInTheDocument();
    expect(temperature).toHaveTextContent('25\u00B0C');
    expect(feelsLike).toHaveTextContent('Feels like: 26\u00B0C');
  });
});
