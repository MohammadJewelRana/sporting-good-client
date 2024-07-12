 
// import img from '../../assets/images/pagesBackground/contactPage.jpg'
 import img from '../../assets/images/pagesBackground/c.jpg'

const About = () => {
  return (
    <div>
      <div className="relative  h-[300px] flex justify-center items-center">
        {/* Blurred background image */}
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-0"
          style={{ backgroundImage: `url(${img})` }}
        ></div>
        {/* Overlay to dim the background */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        {/* Text content */}
        <h1 className="relative text-white text-6xl font-bold">About Us</h1>
      </div>


 {/* Our Story Section */}
 <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">Our Story</h2>
          <p className="text-lg text-gray-700 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a malesuada lectus. Nulla facilisi. Donec vehicula, quam a aliquet ultrices, est lacus convallis lacus, vitae efficitur eros mi eget ligula.
          </p>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">Meet Our Team</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="max-w-sm">
              <img className="rounded-full w-48 h-48 mx-auto mb-4" src={img} alt="Team Member" />
              <h3 className="text-xl font-bold text-center">John Doe</h3>
              <p className="text-gray-600 text-center">CEO</p>
            </div>
            <div className="max-w-sm">
              <img className="rounded-full w-48 h-48 mx-auto mb-4" src={img}     alt="Team Member" />
              <h3 className="text-xl font-bold text-center">Jane Smith</h3>
              <p className="text-gray-600 text-center">CTO</p>
            </div>
            {/* Add more team members as needed */}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">Our Values</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="max-w-sm text-center">
              <h3 className="text-2xl font-bold mb-4">Integrity</h3>
              <p className="text-gray-600">We uphold the highest standards of integrity in all of our actions.</p>
            </div>
            <div className="max-w-sm text-center">
              <h3 className="text-2xl font-bold mb-4">Innovation</h3>
              <p className="text-gray-600">We seek out innovative solutions to challenges we face.</p>
            </div>
            <div className="max-w-sm text-center">
              <h3 className="text-2xl font-bold mb-4">Excellence</h3>
              <p className="text-gray-600">We strive for excellence in everything we do.</p>
            </div>
            {/* Add more values as needed */}
          </div>
        </div>
      </section>
    
    </div>
  );
};

export default About;
