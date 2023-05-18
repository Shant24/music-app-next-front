export * from './stringHelper';
export * from './timeHelper';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

export const getStaticFilePath = (path: string) => {
  return `${API_URL}/static/${path}`;
};
