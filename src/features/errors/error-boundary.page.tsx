interface ErrorBoundaryProps {
  error: any;
  resetErrorBoundary: any;
}

export function fallbackRender({ error, resetErrorBoundary }: ErrorBoundaryProps) {
  return <ErrorBoundary error={error} resetErrorBoundary={resetErrorBoundary} />;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="bg-red-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Oops, something went wrong!</h1>
        <p className="text-gray-600 mb-6">{error.message}</p>
        <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" onClick={resetErrorBoundary}>
          Try Again
        </button>
      </div>
    </div>
  );
};
