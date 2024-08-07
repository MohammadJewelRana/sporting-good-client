import { Parallax } from "react-parallax";
import img from "../../assets/images/pagesBackground/c.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="my-12">
      <Parallax
        blur={10}
        bgImage={img}
        bgImageAlt="sporting goods"
        strength={500}
        className="py-32"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center  py-8 ">
            <h2 className="text-4xl text-black sm:text-5xl font-bold leading-tight mb-4">
              Discover Quality Sporting Goods
            </h2>
            <p className="text-lg sm:text-xl mb-8">
              Explore a wide range of products for sports enthusiasts.
            </p>
            <Link
           to={`/product/manage/${'normal'}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </Parallax>
    </div>
  );
};

export default Banner;
