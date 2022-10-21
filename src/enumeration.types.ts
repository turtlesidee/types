import { createPrimitive, Enumeration } from './base';

export enum CARDINAL {
  NORTH = 'NORTH',
  SOUTH = 'SOUTH',
  WEST = 'WEST',
  EST = 'EST',
}

export const Cardinal = Enumeration(CARDINAL);
export const cardinal = createPrimitive<CARDINAL>(Cardinal);
