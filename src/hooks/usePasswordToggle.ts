import { useState } from 'react';

const usePasswordToggle = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePassword = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return { isPasswordVisible, togglePassword };
};

export default usePasswordToggle;
