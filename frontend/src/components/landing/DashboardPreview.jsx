import addChildImg from "../../assets/screenshots/add-child.png";
import dashboardAnalyticsImg from "../../assets/screenshots/dashboard-analytics.png";

import wellnessAnalysisImg from "../../assets/screenshots/wellness-analysis.png";

import outdoorImg from "../../assets/screenshots/outdoor-chart.png";
import screenTimeImg from "../../assets/screenshots/screen-time-chart.png";
import sleepImg from "../../assets/screenshots/sleep-trend-chart.png";

const DashboardPreview = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Parent Dashboard */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Parent Dashboard</h2>

            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Manage child profiles, monitor wellness insights, and keep track of important health
              metrics through a centralized dashboard.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Add Child */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <img src={addChildImg} alt="Child Management" className="w-full" />

              <div className="p-5">
                <h3 className="text-xl font-bold mb-2">Child Management</h3>

                <p className="text-gray-600">
                  Create and manage child profiles with essential information to begin wellness
                  tracking.
                </p>
              </div>
            </div>

            {/* Dashboard Analytics */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <img src={dashboardAnalyticsImg} alt="Dashboard Analytics" className="w-full" />

              <div className="p-5">
                <h3 className="text-xl font-bold mb-2">Dashboard Analytics</h3>

                <p className="text-gray-600">
                  View key wellness indicators, identify children requiring additional attention,
                  and monitor overall family wellness.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Wellness Analysis */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold mb-4">Personalized Wellness Analysis</h3>

            <p className="text-gray-600 mb-6">
              Analyze screen time, sleep habits, and outdoor activity levels to generate meaningful
              wellness insights and personalized recommendations.
            </p>

            <ul className="space-y-3 text-lg">
              <li>✓ Wellness Score Analysis</li>
              <li>✓ Risk Assessment</li>
              <li>✓ Personalized Recommendations</li>
              <li>✓ Wellness Metrics</li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <img src={wellnessAnalysisImg} alt="Wellness Analysis" className="w-full" />
          </div>
        </div>

        {/* Progress Tracking */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900">Habit Tracking Trends</h3>

            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Visualize screen time, sleep patterns, and outdoor activity trends to better
              understand daily habits and encourage long-term healthy routines.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Screen Time */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <img src={screenTimeImg} alt="Screen Time Tracking" className="w-full" />

              <div className="p-5">
                <h4 className="font-bold text-lg mb-2">Screen Time Tracking</h4>

                <p className="text-gray-600 text-sm">
                  Monitor digital habits and identify excessive usage patterns.
                </p>
              </div>
            </div>

            {/* Sleep Tracking */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <img src={sleepImg} alt="Sleep Tracking" className="w-full" />

              <div className="p-5">
                <h4 className="font-bold text-lg mb-2">Sleep Monitoring</h4>

                <p className="text-gray-600 text-sm">
                  Observe sleep consistency and support healthier routines.
                </p>
              </div>
            </div>

            {/* Outdoor Tracking */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <img src={outdoorImg} alt="Outdoor Activity Tracking" className="w-full" />

              <div className="p-5">
                <h4 className="font-bold text-lg mb-2">Outdoor Activity Tracking</h4>

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
