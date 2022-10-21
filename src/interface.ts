export interface BaseConfig<T> {
  min?: number;
  max?: number;
  pattern?: { value: RegExp; error_message: string };
  format?: (s: T) => T;
}
