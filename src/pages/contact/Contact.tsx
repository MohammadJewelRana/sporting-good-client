 
// import img from '../../assets/images/pagesBackground/contactPage.jpg'
import img from "../../assets/images/pagesBackground/c.jpg";

const Contact = () => {
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
        <h1 className="relative text-white text-6xl font-bold">Contact Us</h1>
      </div>

      <div className="bg-gray-100  ">
        {/* Contact Information Section */}
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

        {/* Contact Form Section */}
        <section className="py-12 px-4 md:px-12 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Get in Touch
            </h2>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-lg font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-lg font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </section>

       
      </div>
    </div>
  );
};

export default Contact;
