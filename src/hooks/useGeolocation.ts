import { useState, useEffect } from 'react';

interface Coordinates {
  lat: number;
  lng: number;
}
interface LocationState {
  loaded: boolean;
  coordinates: Coordinates;
  error: {
    code: number | null;
    message: string;
  };
}

const useGeoLocation = (): LocationState => {
  const [location, setLocation] = useState<LocationState>({
    loaded: false,
    coordinates: { lat: 0, lng: 0 },
    error: {
      code: null,
      message: '',
    },
  });

  const onSuccess = (location: GeolocationPosition) => {
    setLocation((prev) => ({
      ...prev,
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    }));
  };

  const onError = (error: GeolocationPositionError) => {
    setLocation((prev) => ({
      ...prev,
      loaded: true,
      error: {
        code: error.code,
        message: error.message,
      },
    }));
  };

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation not supported',
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      });
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }, []);

  return location;
};

export default useGeoLocation;
