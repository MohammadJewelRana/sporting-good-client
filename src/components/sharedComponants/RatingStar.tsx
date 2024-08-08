


import React from 'react';
import StarRatings from 'react-star-ratings';

// Define the props type for the component
interface RatingStarProps {
  ratings: {
    averageRating?: number;
  };
}

const RatingStar: React.FC<RatingStarProps> = ({ ratings }) => {
  const averageRating = Number(ratings?.averageRating);

  return (
    <>
      <StarRatings
        rating={averageRating}
        starRatedColor="gold"
        starDimension="20px"
        starSpacing="5px"
        numberOfStars={5}
        name="rating"
      />
    </>
  );
};

export default RatingStar;


