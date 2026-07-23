import { Line } from "react-chartjs-2";
import ConfirmationModal from "../modals/ConfirmationModal";

const ScreenTimeSection = ({
  screenTimeData,
  screenTimeLoading,
  editingScreenTimeId,
  handleScreenTimeChange,
  handleScreenTimeSubmit,
  screenTimes,
  handleDeleteScreenTime,
  setEditingScreenTimeId,
  setScreenTimeData,
  screenTimeFormRef,
  screenTimeChartData,
  screenTimeChartOptions,

  showDeleteModal,
  setShowDeleteModal,
  setSelectedScreenTimeId,
  isDeleting,
}) => {
  return (
    <>
      <form
        ref={screenTimeFormRef}
        onSubmit={handleScreenTimeSubmit}
        className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mt-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Screen Time</h2>

        <label htmlFor="screen-date" className="block text-sm font-medium text-gray-700 mb-2">
          Date
        </label>

        <input
          id="screen-date"
          type="date"
          name="date"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-4 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          value={screenTimeData.date}
          onChange={handleScreenTimeChange}
          max={new Date().toISOString().split("T")[0]}
        />

        <label htmlFor="screen-duration" className="block text-sm font-medium text-gray-700 mb-2">
          Duration (Minutes)
        </label>

        <input
          id="screen-duration"
          type="number"
          name="durationMinutes"
          placeholder="Enter duration in minutes"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-4 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          value={screenTimeData.durationMinutes}
          onChange={handleScreenTimeChange}
        />

        <label
          htmlFor="screen-activity-type"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Activity Type
        </label>

        <select
          id="screen-activity-type"
          name="activityType"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-4 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          value={screenTimeData.activityType}
          onChange={handleScreenTimeChange}
        >
          <option value="Educational">Educational</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Gaming">Gaming</option>
          <option value="Social Media">Social Media</option>
          <option value="Other">Other</option>
        </select>

        <button
          type="submit"
          disabled={screenTimeLoading}
          className="bg-green-600 hover:enabled:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {screenTimeLoading
            ? "Saving..."
            : editingScreenTimeId
              ? "Update Screen Time"
              : "Save Screen Time"}
        </button>
      </form>
      {/* Screen Time History */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Screen Time Records</h2>

        {screenTimes.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center border border-gray-100">
            <p className="text-gray-500 text-lg">No screen time records available.</p>

            <p className="text-gray-400 mt-2">
              Add your first screen time record to begin tracking.
            </p>
          </div>
        ) : (
          screenTimes.map((record) => (
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
                    Duration
                  </span>

                  <span className="text-base font-semibold text-gray-900">
                    {record.durationMinutes} mins
                  </span>
                </div>

                <div className="flex items-center py-2">
                  <span className="min-w-[140px] shrink-0 text-sm font-medium text-gray-500">
                    Activity
                  </span>

                  <span className="text-base font-semibold text-gray-900">
                    {record.activityType}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    setSelectedScreenTimeId(record._id);
                    setShowDeleteModal(true);
                  }}
                  className="min-w-[90px] bg-red-600 hover:enabled:bg-red-700 text-white font-medium px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer"
                >
                  Delete
                </button>

                <button
                  onClick={() => {
                    setEditingScreenTimeId(record._id);

                    setScreenTimeData({
                      date: record.date.split("T")[0],
                      durationMinutes: record.durationMinutes,
                      activityType: record.activityType,
                    });

                    screenTimeFormRef.current?.scrollIntoView({
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
      {/* Screen Time Trend Chart */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Screen Time Trend</h2>

        {screenTimes.length === 0 ? (
          <div className="flex items-center justify-center h-[350px] text-center">
            <div>
              <p className="text-lg text-gray-500">No screen time data available.</p>

              <p className="text-gray-400 mt-2">Add records to visualize trends.</p>
            </div>
          </div>
        ) : (
          <div className="h-[350px]">
            <Line data={screenTimeChartData} options={screenTimeChartOptions} />
          </div>
        )}
      </div>
      {showDeleteModal && (
        <ConfirmationModal
          title="Delete Screen Time Record"
          message={
            <>
              Are you sure you want to permanently delete this screen time record?
              <br />
              <br />
              This action cannot be undone.
            </>
          }
          isDeleting={isDeleting}
          onCancel={() => setShowDeleteModal(false)}
          onDelete={handleDeleteScreenTime}
        />
      )}
    </>
  );
};

export default ScreenTimeSection;
