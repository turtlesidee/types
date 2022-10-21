/* eslint variable-name */
import { createPrimitive, StringBase } from './base';

export type Url = string & { _tag: 'Url' };
export const Url = StringBase<Url>({
  pattern: {
    value: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&\/=]*)$/,
    error_message: 'do not comply with url format. (i.e https://example.com)',
  },
});
export const url = createPrimitive<Url>(Url);

export type Email = string & { _tag: 'Email' };
export const Email = StringBase<Email>({
  pattern: {
    value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
    error_message: 'do not comply to email format. (i.e john.doe@example.com )',
  },
});
export const email = createPrimitive<Email>(Email);

export type UuidV4 = string & { _tag: 'UuidV4' };
export const UuidV4 = StringBase<UuidV4>({
  pattern: {
    value: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    error_message: `do not comply with uuid format. (i.e 140ce552-1694-4698-8a27-0368fe9e4421)`,
  },
});
export const uuidV4 = createPrimitive<UuidV4>(UuidV4);

export type SString = string & { _tag: 'SString' };
export const SString = StringBase<SString>({ min: 1 });
export const sstring = createPrimitive<SString>(SString);
