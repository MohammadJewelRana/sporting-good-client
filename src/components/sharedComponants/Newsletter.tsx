 

const Newsletter = () => {
  return (
    <section className=" bg-gray-600 mt-12   py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white text-center sm:text-4xl">
            Subscribe to Our Newsletter
          </h2>
          <p className="mt-4 text-lg text-white text-center">
            Stay updated with our latest news and promotions.
          </p>
          <form className="mt-8 sm:flex justify-center">
            <div className="max-w-xs w-full">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="block w-full px-4 py-3 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:mx-2 border-gray-300"
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              className="mt-4 sm:mt-0 w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-r-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
