import { Book } from '../types/types';

export const convertToCsv = (data: Book[]) => {
  const rows = data
    .map((item: Book) => {
      return Object.entries(item)
        .map((fields) => {
          const [key, value] = fields;
          return `${key}: ${JSON.stringify(value)}`;
        })
        .join(';');
    })
    .join('\n');
  return rows;
};

export const createBlobUrl = (data: Book[]): string => {
  return window.URL.createObjectURL(
    new Blob([convertToCsv(data)], {
      type: 'text/csv;charset=utf-8;',
    })
  );
};
