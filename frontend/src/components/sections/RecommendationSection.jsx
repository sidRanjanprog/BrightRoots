const RecommendationSection = ({
  recommendationData,
  recommendationLoading,
  recommendationError,
  fetchRecommendations,
  riskBadgeStyles,
  riskIcons,
  getRecommendationStyle,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Recommendations</h2>

      <button
        onClick={fetchRecommendations}
        disabled={recommendationLoading}
        className="bg-green-600 hover:enabled:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {recommendationLoading
          ? "Analyzing..."
          : recommendationData
            ? "Reanalyze Wellness"
            : "Analyze Wellness"}
      </button>

      {recommendationError && (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-red-100 text-red-700 font-bold shrink-0">
              ✖
            </div>

            <p className="ml-5 text-base text-red-700 leading-relaxed">{recommendationError}</p>
          </div>
        </div>
      )}

      {!recommendationData && (
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
          <p className="text-lg font-semibold text-gray-700">No wellness analysis available.</p>

          <p className="text-gray-500 mt-2">
            Click <strong>Analyze Wellness</strong> to receive personalized recommendations based on
            your child's wellness data.
          </p>
        </div>
      )}

      {recommendationData && (
        <>
          <div className="mt-8">
            <div className="bg-green-50 rounded-2xl shadow-md border border-green-100 p-6 text-center">
              <div className="text-5xl mb-2">💚</div>

              <h3 className="text-5xl font-bold text-gray-900">
                {recommendationData.wellnessScore}
              </h3>

              <p className="text-gray-600 mt-1 text-lg">Wellness Score</p>

              <div className="mt-4">
                <span
                  className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${
                    riskBadgeStyles[recommendationData.riskLevel]
                  }`}
                >
                  {riskIcons[recommendationData.riskLevel]}

                  <span className="ml-2">{recommendationData.riskLevel} Risk</span>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Wellness Metrics</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Screen Time */}
              <div className="bg-blue-50 rounded-2xl shadow-md border border-blue-100 p-6 text-center">
                <div className="text-4xl mb-3">📱</div>

                <h4 className="text-4xl font-bold text-gray-900">
                  {Math.round(recommendationData.metrics.avgScreenTime)}
                </h4>

                <p className="text-gray-600 mt-2">Average Screen Time</p>

                <p className="text-sm text-gray-500">minutes/day</p>
              </div>

              {/* Sleep */}
              <div className="bg-purple-50 rounded-2xl shadow-md border border-purple-100 p-6 text-center">
                <div className="text-4xl mb-3">😴</div>

                <h4 className="text-4xl font-bold text-gray-900">
                  {recommendationData.metrics.avgSleep.toFixed(1)}
                </h4>

                <p className="text-gray-600 mt-2">Average Sleep</p>

                <p className="text-sm text-gray-500">hours/night</p>
              </div>

              {/* Outdoor */}
              <div className="bg-orange-50 rounded-2xl shadow-md border border-orange-100 p-6 text-center">
                <div className="text-4xl mb-3">⚽</div>

                <h4 className="text-4xl font-bold text-gray-900">
                  {Math.round(recommendationData.metrics.avgOutdoorTime)}
                </h4>

                <p className="text-gray-600 mt-2">Average Outdoor Time</p>

                <p className="text-sm text-gray-500">minutes/day</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Recommendations</h3>

              <p className="text-gray-500 mt-2">
                Actionable suggestions generated from your child's wellness data.
              </p>
            </div>

            <div className="space-y-5">
              {recommendationData.recommendations.map((recommendation, index) => {
                const style = getRecommendationStyle(recommendation);

                return (
                  <div
                    key={index}
                    className={`${style.card} ${style.border} border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-9 h-9 rounded-full ${style.bg} ${style.text} font-bold shrink-0`}
                      >
                        {style.icon}
                      </div>

                      <p className="ml-5 text-base text-gray-800 leading-relaxed">
                        {recommendation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {recommendationData.dataWarnings.length > 0 && (
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Data Warnings</h3>

              <div className="space-y-4">
                {recommendationData.dataWarnings.map((warning, index) => (
                  <div
                    key={index}
                    className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 shadow-sm"
                  >
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-yellow-100 text-yellow-700 font-bold shrink-0">
                        ⚠
                      </div>

                      <p className="ml-5 text-base text-gray-800 leading-relaxed">{warning}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RecommendationSection;
