import { configureStore } from '@reduxjs/toolkit';

import listingReducer from './listings/listingsSlice';

export const store = configureStore({
  reducer: {
    listings: listingReducer,
  },
});
