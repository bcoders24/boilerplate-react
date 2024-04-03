import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <Star key={index} stroke="none" fill={index < rating ? '#FCD53F' : '#FFF6D4'} />
  ));
  return <div className="flex">{stars}</div>;
};

export default Rating;
