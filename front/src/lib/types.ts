type Image = {
  filename: string;
  value: string;
};
type Capital = {
  id: number;
  name: string;
  country: 'string';
  description: string;
  commentList: ReviewDB[];
  flaglocation: Image;
  coordenates: string;
  currency: string;
};

type CapitalStatus = {
  refetch(): unknown;
  status: 'VISITED' | 'UNDEFINED' | 'WANTVISIT';
};
type OverpassCapital = {
  type: string;
  id: number;
  lat: number;
  lon: number;
  tags: {
    int_name: string;
    'name:en': string;
  };
};
type Avatar = {
  id: number;
  value: string;
};

type User = {
  email: string;
  id: number;
  password: string;
  sessiontoken: string;
  username: string;
  avatar: Avatar;
  role: string;
};

type ReviewDB = {
  cText: string;
  capital: string;
  userAvatar: Avatar;
  creationTime: string;
  id: number;
  imageLocation: {
    filename: string;
    value: string;
  };
  likeRatio: number;
  likedByCurrentUser: number;
  ratingAttraction: number;
  ratingFood: number;
  ratingGeneral: number;
  ratingTransport: number;
  commentStatus: 'HIDDEN' | 'ACTIVE';
  user: string;
};

type Currency = {
  base: string;
  date: string;
  rates: {
    [key: string]: number;
  };
};
type ExchangeRates = {
  date: string;

  query: {
    amount: number;
    from: string;
    to: string;
  };
  result: number;
};
type Condition = {
  text: string;
  icon: string;
  code: number;
};
type Location = {
  country: string;
  lat: number;
  localtime: '2022-07-01 9:13';
  localtime_epoch: number;
  lon: number;
  name: string;
  region: string;
  tz_id: string;
};
type Weather = {
  current: {
    condition: Condition;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    gust_kph: number;
    gust_mph: number;
    humidity: number;
    is_day: number;
    last_updated: string;
    last_updated_epoch: number;
    precip_in: number;
    precip_mm: number;
    pressure_in: number;
    pressure_mb: number;
    temp_c: number;
    temp_f: number;
    uv: number;
    vis_km: number;
    vis_miles: number;
    wind_degree: number;
    wind_dir: string;
    wind_kph: number;
    wind_mph: number;
  };
  location: Location;
};
type IpLookup = {
  city: string;
  continent_code: string;
  continent_name: string;
  country_code: string;
  country_name: string;
  geoname_id: number;
  ip: string;
  is_eu: string;
  lat: number;
  localtime: string;
  localtime_epoch: number;
  lon: number;
  region: string;
  type: string;
  tz_id: string;
};

export type {
  User,
  Capital,
  OverpassCapital,
  ReviewDB,
  Currency,
  ExchangeRates,
  Weather,
  IpLookup,
  CapitalStatus,
  Avatar,
  Image,
};
