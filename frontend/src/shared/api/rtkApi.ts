import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Variables } from '../consts/localVariables';

const url = Variables.File_URL;

export const rtkApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: headers => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
