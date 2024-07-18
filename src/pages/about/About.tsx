// import img from '../../assets/images/pagesBackground/contactPage.jpg'
import img from "../../assets/images/pagesBackground/c.jpg";

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

      <div className="container mx-auto p-4 mt-16">
        

        <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 text-green-600">Our Story</h2>
          <p className="text-lg text-gray-700 text-center">
          Welcome to our company! We are dedicated to providing the best
            products and services to our customers. Our mission is to create
            value for our stakeholders and make a positive impact in our
            community.
          </p>
        </div>
      </section>

        <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 text-green-600">Mission and Vision</h2>
          <p className="text-lg text-gray-700 text-center">
          <p className="text-lg leading-relaxed mb-2">
            <strong>Mission:</strong> To deliver high-quality products that
            bring joy and satisfaction to our customers.
          </p>
          <p className="text-lg leading-relaxed">
            <strong>Vision:</strong> To be the leading company in our industry,
            known for our commitment to excellence and innovation.
          </p>
          </p>
        </div>
      </section>

  
          <section className="py-12 px-4 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Contact Information */}
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Contact Information
                </h3>
                <ul className="space-y-4">
                  <li>
                    <p className="font-semibold">Address:</p>
                    <p>123 Street Name, City, Country</p>
                  </li>
                  <li>
                    <p className="font-semibold">Phone:</p>
                    <p>(123) 456-7890</p>
                  </li>
                  <li>
                    <p className="font-semibold">Email:</p>
                    <p>info@example.com</p>
                  </li>
                </ul>
              </div>
              {/* Right Column: Map */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Replace with your map component or iframe */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14597.752131076564!2d90.34117698669432!3d23.838574521865922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c10078fabca1%3A0xf7bf824d69d57d8e!2sNoor%20Print!5e0!3m2!1sen!2sbd!4v1720717683758!5m2!1sen!2sbd"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </section>


        
 
 
      </div>
 

      {/* Our Team Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">Meet Our Team</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="max-w-sm">
              <img
                className="rounded-full w-48 h-48 mx-auto mb-4"
                src={img}
                alt="Team Member"
              />
              <h3 className="text-xl font-bold text-center">John Doe</h3>
              <p className="text-gray-600 text-center">CEO</p>
            </div>
            <div className="max-w-sm">
              <img
                className="rounded-full w-48 h-48 mx-auto mb-4"
                src={img}
                alt="Team Member"
              />
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
              <p className="text-gray-600">
                We uphold the highest standards of integrity in all of our
                actions.
              </p>
            </div>
            <div className="max-w-sm text-center">
              <h3 className="text-2xl font-bold mb-4">Innovation</h3>
              <p className="text-gray-600">
                We seek out innovative solutions to challenges we face.
              </p>
            </div>
            <div className="max-w-sm text-center">
              <h3 className="text-2xl font-bold mb-4">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do.
              </p>
            </div>
            {/* Add more values as needed */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
