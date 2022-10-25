interface Capital {
  name: string;
  country: string;
  image: string;
}

type OverpassCapital = {
  type: string;
  id: number;
  lat: number;
  lon: number;
  tags: {
    // name: string;
    int_name: string;
    'name:en': string;
  };
};

export type { Capital, OverpassCapital };
