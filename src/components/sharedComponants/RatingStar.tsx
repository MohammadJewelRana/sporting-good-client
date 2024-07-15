// import ReactStars from 'react-rating-stars-component';

import { FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";

const RatingStar = ({ ratings }) => {
  const averageRating = Number(ratings?.averageRating);
  // console.log(typeof averageRating);
  // console.log(    averageRating);

  return (
    <Rating
      placeholderRating={averageRating}
      readonly
      emptySymbol={<FaRegStar></FaRegStar>}
      placeholderSymbol={<FaStar className="text-warning"></FaStar>}
      fullSymbol={<FaStar></FaStar>}
    />
  );
};

export default RatingStar;
