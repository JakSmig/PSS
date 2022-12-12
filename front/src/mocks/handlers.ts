import { rest } from 'msw';

import { weatherSuccessResponse } from './mockData';

const weatherApiUrl = process.env.REACT_APP_WEATHER_API_URL;

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const currentWeatherApiUrl = `${weatherApiUrl}/current.json`;

const delay = 100;

const handlers = [
  rest.get(currentWeatherApiUrl, (req, res, ctx) => {
    const q = req.url.searchParams.get('q');

    const isEmptyQuery = q === '';
    const isNotMatchingQuery = q === 'xyz';

    if (isEmptyQuery) {
      return res(
        ctx.status(400),
        ctx.json({
          code: 1003,
          message: 'Parameter "q" not provided.',
        }),
        ctx.delay(delay),
      );
    }
    if (isNotMatchingQuery) {
      return res(
        ctx.status(400),
        ctx.json({
          code: 1006,
          message: 'No location found matching parameter "q".',
        }),
        ctx.delay(delay),
      );
    }
    return res(
      ctx.status(200),
      ctx.json(weatherSuccessResponse),
      ctx.delay(delay),
    );
  }),
];

export { handlers };
