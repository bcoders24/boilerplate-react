import { useState, useEffect } from 'react';

const useNetwork = () => {
  const [isOnline, setNetwork] = useState<boolean>(window.navigator.onLine);

  const updateNetwork = () => {
    setNetwork(window.navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener('offline', updateNetwork);

    window.addEventListener('online', updateNetwork);

    return () => {
      window.removeEventListener('offline', updateNetwork);

      window.removeEventListener('online', updateNetwork);
    };
  });

  return isOnline;
};

export default useNetwork;
