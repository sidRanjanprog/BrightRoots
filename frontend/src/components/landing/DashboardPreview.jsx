import dashboardImg from "../../assets/screenshots/dashboard.png";
import recommendationImg from "../../assets/screenshots/recommendations.png";
import screenTimeImg from "../../assets/screenshots/screen-time-chart.png";
import sleepImg from "../../assets/screenshots/sleep-chart.png";
import outdoorImg from "../../assets/screenshots/outdoor-chart.png";

const DashboardPreview = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Dashboard Preview
          </h2>

          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Monitor wellness habits, identify potential concerns,
            and help children develop healthier routines through
            actionable insights and personalized recommendations.
          </p>
        </div>

        {/* Dashboard Screenshot */}
        <div className="mb-20 bg-white rounded-3xl shadow-xl overflow-hidden">
          <img
            src={dashboardImg}
            alt="Dashboard Preview"
            className="w-full"
          />
        </div>

        {/* Recommendation Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h3 className="text-3xl font-bold mb-4">
              Personalized Wellness Insights
            </h3>

            <p className="text-gray-600 mb-6">
              Analyze screen time, sleep habits, and outdoor activity
              levels to identify trends and provide meaningful
              recommendations for healthier routines.
            </p>

            <ul className="space-y-3 text-lg">
              <li>✓ Wellness Score Analysis</li>
              <li>✓ Risk Detection</li>
              <li>✓ Personalized Recommendations</li>
              <li>✓ Habit Monitoring</li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <img
              src={recommendationImg}
              alt="Recommendations"
              className="w-full"
            />
          </div>

        </div>

        {/* Progress Tracking */}
        <div className="mt-24">

        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900">
            Track Healthy Habits Over Time
          </h3>

          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            Visualize screen time, sleep patterns, and outdoor activity
            trends to better understand daily habits and encourage
            long-term healthy routines.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Screen Time */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <img
              src={screenTimeImg}
              alt="Screen Time Tracking"
              className="w-full"
            />

            <div className="p-5">
              <h4 className="font-bold text-lg mb-2">
                Screen Time Tracking
              </h4>

              <p className="text-gray-600 text-sm">
                Monitor digital habits and identify excessive usage patterns.
              </p>
            </div>
          </div>

          {/* Sleep Tracking */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <img
              src={sleepImg}
              alt="Sleep Tracking"
              className="w-full"
            />

            <div className="p-5">
              <h4 className="font-bold text-lg mb-2">
                Sleep Monitoring
              </h4>

              <p className="text-gray-600 text-sm">
                Observe sleep consistency and support healthier routines.
              </p>
            </div>
          </div>

          {/* Outdoor Tracking */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <img
              src={outdoorImg}
              alt="Outdoor Activity Tracking"
              className="w-full"
            />

            <div className="p-5">
              <h4 className="font-bold text-lg mb-2">
                Outdoor Activity Tracking
              </h4>

              <p className="text-gray-600 text-sm">
                Encourage active lifestyles through regular outdoor engagement.
              </p>
            </div>
          </div>

        </div>

        </div>

      </div>
    </section>
  );
};

export default DashboardPreview;