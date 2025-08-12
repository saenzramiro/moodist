import type { Category } from '../types';


export const noise: Category = {
  id: 'noise',
  sounds: [
    {
      id: 'white-noise',
      label: 'White Noise',
      src: '/sounds/noise/white-noise.wav',
    },
    {
      id: 'pink-noise',
      label: 'Pink Noise',
      src: '/sounds/noise/pink-noise.wav',
    },
    {
      id: 'brown-noise',
      label: 'Brown Noise',
      src: '/sounds/noise/brown-noise.wav',
    },
  ],
  title: 'Noise',
};
