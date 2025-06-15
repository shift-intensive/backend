import { TransformFnParams } from 'class-transformer';

export const transformSearchParam = ({ value }: TransformFnParams): string[] => {
  if (Array.isArray(value)) {
    return value.map((value) => value.toLowerCase());
  }

  return [value.toLowerCase()];
};
