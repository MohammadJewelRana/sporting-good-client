// /* eslint-disable @typescript-eslint/no-explicit-any */
// // import ReactStars from 'react-rating-stars-component';

// import { FaRegStar, FaStar } from "react-icons/fa";
// import Rating from "react-rating";

// const RatingStar = ({ ratings }:{ratings:any}) => {
//   const averageRating = Number(ratings?.averageRating);
//   // console.log(typeof averageRating);
//   // console.log(    averageRating);
// // 
//   return (
//  <>
//  <Rating
//       placeholderRating={averageRating}
//       readonly
//       emptySymbol={<FaRegStar></FaRegStar>}
//       placeholderSymbol={<FaStar className="text-warning"></FaStar>}
//       fullSymbol={<FaStar></FaStar>}
//     />
//  </>
// );

// export default RatingStar;


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


