import { useNavigate } from 'react-router-dom';

type Params = Record<string, string | number | boolean>;

const createSearchParams = (params: Params): string => {
  return new URLSearchParams(params as Record<string, string>).toString();
};

const useNavigateSearch = () => {
  const navigate = useNavigate();
  const navigateWithSearch = (pathname: string, params: Params) => {
    const searchParams = createSearchParams(params);
    navigate({ pathname, search: `?${searchParams}` });
  };
  return navigateWithSearch;
};

export default useNavigateSearch;

// Usage
// navigateSearch('/example-path', { param1: 'value1', param2: 123 });
