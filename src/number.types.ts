import { createPrimitive, NumberBase } from './base';

export type Timestamp = number & { _tag: 'Timestamp' };
export const Timestamp = NumberBase<Timestamp>({
  pattern: {
    value: /^\d{10}$|^\d{13}$/,
    error_message: `do not comply with timestamp format. (i.e 1666255814)`,
  },
  format: (n) => parseInt(n.toString().slice(0, 10), 10),
});
export const timestamp = createPrimitive<Timestamp>(Timestamp);
