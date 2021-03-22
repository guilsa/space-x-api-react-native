import React from 'react';
import RootNavigator from './navigation/RootNavigator';

import { QueryClientProvider, QueryClient } from 'react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigator />
    </QueryClientProvider>
  )
}
