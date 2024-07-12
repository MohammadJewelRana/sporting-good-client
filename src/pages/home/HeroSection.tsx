 
import { useState } from "react";
import heroImage1 from "../../assets/images/hero/hero1.jpg";
import heroImage2 from "../../assets/images/hero/hero2.jpg";
import heroImage3 from "../../assets/images/hero/hero3.jpg";
 
const images = [
    {
      src: heroImage1,
      heading: 'Sporting Goods 1',
      subheading: 'Explore our wide range of sporting instruments and gear.',
    },
    {
      src: heroImage2,
      heading: 'Sporting Goods 2',
      subheading: 'Discover the latest in sports equipment and accessories.',
    },
    {
      src: heroImage3,
      heading: 'Sporting Goods 3',
      subheading: 'Equip yourself with top-quality sports gear for every game.',
    },
  ];
const HeroSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    const goToPrevious = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
 
    return (
        <div className="relative w-full h-[500px] overflow-hidden">
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full h-[500px] flex-shrink-0 relative"
            style={{ backgroundImage: `url(${image.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 bg-black bg-opacity-50">
              <h1 className="text-4xl font-bold mb-4">{image.heading}</h1>
              <p className="text-lg mb-6">{image.subheading}</p>
              <button className="bg-white text-gray-900 py-2 px-6 rounded-lg font-semibold hover:bg-gray-300 transition duration-300">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full opacity-75 hover:opacity-100 transition-opacity duration-300"
        onClick={goToPrevious}
      >
        &#8249;
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full opacity-75 hover:opacity-100 transition-opacity duration-300"
        onClick={goToNext}
      >
        &#8250;
      </button>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-4">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 mx-1 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
