import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-green-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* Left Side */}
        <div>
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Guiding Parents.
            <br />
            Nurturing Children.
            <br />
            Building Stronger Families.
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Support your child's growth through healthy habits, balanced screen
            use, better sleep, outdoor activity, nutrition guidance and
            personalized parenting insights.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/register"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Get Started
            </Link>

            <a
              href="#features"
              className="border border-green-600 text-green-700 px-6 py-3 rounded-lg font-semibold"
            >
              Explore Features
            </a>
          </div>
        </div>

        {/* Right Side */}
        <div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Family Wellness Snapshot</h3>

            <div className="space-y-4">
              <div className="bg-green-100 p-4 rounded-lg">
                <p className="font-semibold">Wellness Score</p>
                <p className="text-3xl font-bold text-green-700">87</p>
              </div>

              <div className="bg-blue-100 p-4 rounded-lg">
                <p>Screen Time</p>
                <p className="font-bold">1 hr 30 min</p>
              </div>

              <div className="bg-purple-100 p-4 rounded-lg">
                <p>Sleep</p>
                <p className="font-bold">9 Hours</p>
              </div>

              <div className="bg-orange-100 p-4 rounded-lg">
                <p>Outdoor Activity</p>
                <p className="font-bold">75 Minutes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
