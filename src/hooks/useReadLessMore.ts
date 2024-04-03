import { useState } from 'react';

type UseReadLessMore = (
  initialText: string,
  maxLength: number,
) => {
  displayedText: string;
  toggleDisplay: () => void;
  action: string;
};

const useReadLessMore: UseReadLessMore = (initialText, maxLength) => {
  const [isFullTextDisplayed, setIsFullTextDisplayed] = useState<boolean>(false);
  const toggleDisplay = () => {
    setIsFullTextDisplayed((prev) => !prev);
  };

  const displayedText = isFullTextDisplayed
    ? initialText
    : initialText.length > maxLength
      ? initialText.slice(0, maxLength) + '...'
      : initialText;

  const action = isFullTextDisplayed ? 'Show Less' : 'Show More';
  return { displayedText, toggleDisplay, action };
};

export default useReadLessMore;
