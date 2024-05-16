import dataSource from './database.source';

export const databaseProvider = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      return dataSource;
    },
  },
];
