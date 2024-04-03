import { ErrorBoundary as ReactErrorBoundry } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import Routing from './routes/routing.routes';
import { fallbackRender } from './features/errors/error-boundary.page';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <ReactErrorBoundry fallbackRender={fallbackRender}>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <Routing />
          <Toaster
            toastOptions={{
              duration: 2000,
              position: 'bottom-right',
              style: { fontSize: '13px', fontWeight: 'normal' },
            }}
          />
        </HelmetProvider>
      </QueryClientProvider>
    </ReactErrorBoundry>
  );
}

export default App;
