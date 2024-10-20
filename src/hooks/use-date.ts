import {months} from '@lib/constants';

export const useDate = (date: Date): string => {
  const day = date.getUTCDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const d = `${month} ${day}, ${year}`;
  return d;
};
