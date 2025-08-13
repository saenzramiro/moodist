import type { Category } from '../types';


export const transport: Category = {
  id: 'transport',
  sounds: [
    {
      id: 'train',
      label: 'Train',
      src: '/sounds/transport/train.mp3',
    },
    {
      id: 'inside-a-train',
      label: 'Inside a Train',
      src: '/sounds/transport/inside-a-train.mp3',
    },
    {
      id: 'airplane',
      label: 'Airplane',
      src: '/sounds/transport/airplane.mp3',
    },
    {
      id: 'submarine',
      label: 'Submarine',
      src: '/sounds/transport/submarine.mp3',
    },
    {
      id: 'sailboat',
      label: 'Sailboat',
      src: '/sounds/transport/sailboat.mp3',
    },
    {
      id: 'rowing-boat',
      label: 'Rowing Boat',
      src: '/sounds/transport/rowing-boat.mp3',
    },
  ],
  title: 'Transport',
};
