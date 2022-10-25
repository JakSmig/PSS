import Amster from '../assets/images/amster.jpg';
import Minsk from '../assets/images/minsk.jpg';
import Paris from '../assets/images/paris.jpg';
import Warsaw from '../assets/images/warszawa.jpg';
import { Capital } from '../models/Capital';

const capitals: Capital[] = [
  { name: 'Warszawa', country: 'Poland', image: Warsaw },
  { name: 'Paris', country: 'France', image: Paris },
  { name: 'Minsk', country: 'Belarus', image: Minsk },
  { name: 'Amsterdam', country: 'Netherlands', image: Amster },
];

export { capitals };
