import { BaseConfig } from './interface';
import * as t from 'io-ts';
import { pipe } from 'fp-ts/function';
import { fold } from 'fp-ts/Either';

export const StringBase = <A>(config: BaseConfig<string> = {}) =>
  new t.Type<string & A, string & A, unknown>(
    'Base',
    (u): u is string & A => typeof u !== 'string',
    (u, c) => {
      if (typeof u !== 'string') {
        return t.failure(u, c, `value provided is not string`);
      }

      if (config.min && u.length < config.min) {
        return t.failure(u, c, `value provided is too short, expected at least ${config.min} characters`);
      }

      if (config.max && u.length > config.max) {
        return t.failure(u, c, `value provided is too long, expected at most ${config.max} characters`);
      }

      if (config.pattern && !u.match(config.pattern.value)) {
        return t.failure(u, c, `${config.pattern.error_message}`);
      }

      return t.success(config.format ? (config.format(u) as unknown as string & A) : (u as unknown as string & A));
    },
    (a) => a,
  );

export const NumberBase = <A>(config: BaseConfig<number> = {}) =>
  new t.Type<number & A, number & A, unknown>(
    'Base',
    (u): u is number & A => typeof u !== 'number',
    (u, c) => {
      const val = typeof u === 'string' ? parseInt(u, 10) : u;
      if (typeof val !== 'number') {
        return t.failure(u, c, `value provided is not number`);
      }

      if (config.min && val < config.min) {
        return t.failure(u, c, `value provided is too short, expected at least ${config.min}`);
      }

      if (config.max && val > config.max) {
        return t.failure(u, c, `value provided is too long, expected at most ${config.max}`);
      }

      if (config.pattern && !val.toString().match(config.pattern.value)) {
        return t.failure(u, c, `${config.pattern.error_message}`);
      }

      return t.success(config.format ? (config.format(val) as unknown as number & A) : (val as unknown as number & A));
    },
    (a) => a,
  );

export const createPrimitive =
  <T>(c: t.Mixed) =>
  (u: unknown): T =>
    pipe(
      c.decode(u),
      fold(
        (e) => {
          const msg = u === undefined ? `Missing value` : `${e[0].message}`;
          throw new Error(msg);
        },
        (d) => d,
      ),
    );
