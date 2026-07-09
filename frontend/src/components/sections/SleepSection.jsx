import { Line } from "react-chartjs-2";
const SleepSection = ({
  sleepData,
  sleepLoading,
  editingSleepId,
  handleSleepChange,
  handleSleepSubmit,
  sleepRecords,
  handleDeleteSleep,
  setEditingSleepId,
  setSleepData,
  sleepFormRef,
  sleepChartData,
  sleepChartOptions,
}) => {
  return (
    <>
      {/* Sleep Form */}
      <form
        ref={sleepFormRef}
        onSubmit={handleSleepSubmit}
        className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mt-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Sleep Record</h2>

        <label htmlFor="sleep-date" className="block text-sm font-medium text-gray-700 mb-2">
          Date
        </label>

        <input
          id="sleep-date"
          type="date"
          name="date"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-4 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          value={sleepData.date}
          onChange={handleSleepChange}
          max={new Date().toISOString().split("T")[0]}
        />

        <label htmlFor="sleep-hours" className="block text-sm font-medium text-gray-700 mb-2">
          Sleep Hours
        </label>

        <input
          id="sleep-hours"
          type="number"
          name="sleepHours"
          placeholder="Enter sleep hours"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-4 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          value={sleepData.sleepHours}
          onChange={handleSleepChange}
        />

        <label htmlFor="sleep-quality" className="block text-sm font-medium text-gray-700 mb-2">
          Sleep Quality
        </label>

        <select
          id="sleep-quality"
          name="sleepQuality"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-4 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          value={sleepData.sleepQuality}
          onChange={handleSleepChange}
        >
          <option value="Excellent">Excellent</option>

          <option value="Good">Good</option>

          <option value="Average">Average</option>

          <option value="Poor">Poor</option>
        </select>

        <button
          type="submit"
          disabled={sleepLoading}
          className="bg-green-600 hover:enabled:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {sleepLoading
            ? "Saving..."
            : editingSleepId
              ? "Update Sleep Record"
              : "Save Sleep Record"}
        </button>
      </form>

      {/* Sleep History */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sleep History</h2>

        {sleepRecords.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center border border-gray-100">
            <p className="text-gray-500 text-lg">No sleep records yet.</p>

            <p className="text-gray-400 mt-2">Add your first sleep record to begin tracking.</p>
          </div>
        ) : (
          sleepRecords.map((record) => (
            <div key={record._id} className="border border-gray-200 rounded-xl p-5 mb-4 bg-gray-50">
              <div className="space-y-2">
                <div className="flex items-center py-2">
                  <span className="min-w-[140px] shrink-0 text-sm font-medium text-gray-500">
                    Date
                  </span>

                  <span className="text-base font-semibold text-gray-900">
                    {new Date(record.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center py-2">
                  <span className="min-w-[140px] shrink-0 text-sm font-medium text-gray-500">
                    Sleep Hours
                  </span>

                  <span className="text-base font-semibold text-gray-900">
                    {record.sleepHours} hrs
                  </span>
                </div>

                <div className="flex items-center py-2">
                  <span className="min-w-[140px] shrink-0 text-sm font-medium text-gray-500">
                    Sleep Quality
                  </span>

                  <span className="text-base font-semibold text-gray-900">
                    {record.sleepQuality}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleDeleteSleep(record._id)}
                  className="min-w-[90px] bg-red-600 hover:enabled:bg-red-700 text-white font-medium px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer"
                >
                  Delete
                </button>

                <button
                  onClick={() => {
                    setEditingSleepId(record._id);

                    setSleepData({
                      date: record.date.split("T")[0],
                      sleepHours: record.sleepHours,
                      sleepQuality: record.sleepQuality,
                    });

                    sleepFormRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className="min-w-[90px] bg-amber-500 hover:enabled:bg-amber-600 text-white font-medium px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer"
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Sleep Trend Chart */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sleep Trend</h2>

        {sleepRecords.length === 0 ? (
          <div className="flex items-center justify-center h-[350px] text-center">
            <div>
              <p className="text-lg text-gray-500">No sleep data available.</p>

              <p className="text-gray-400 mt-2">Add sleep records to visualize trends.</p>
            </div>
          </div>
        ) : (
          <div className="h-[350px]">
            <Line data={sleepChartData} options={sleepChartOptions} />
          </div>
        )}
      </div>
    </>
  );
};

export default SleepSection;
