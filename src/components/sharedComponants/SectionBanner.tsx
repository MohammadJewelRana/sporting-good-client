 
import img from '../../assets/images/pagesBackground/c.jpg'
const SectionBanner = ({heading}) => {
  return (
    <div>
       <div className="relative  h-[300px] flex justify-center items-center">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-0"
          style={{ backgroundImage: `url(${img})` }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="relative text-white text-6xl font-bold capitalize"> {heading}</h1>
      </div>
    </div>
  )
}

export default SectionBanner
