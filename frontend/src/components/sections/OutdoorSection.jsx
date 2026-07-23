import { Line } from "react-chartjs-2";
import ConfirmationModal from "../modals/ConfirmationModal";
const OutdoorSection = ({
  outdoorData,
  outdoorLoading,
  editingOutdoorId,
  handleOutdoorChange,
  handleOutdoorSubmit,
  outdoorActivities,
  handleDeleteOutdoorActivity,
  setEditingOutdoorId,
  setOutdoorData,
  outdoorFormRef,
  outdoorChartData,
  outdoorChartOptions,
  showDeleteModal,
  setShowDeleteModal,
  setSelectedOutdoorId,
  isDeleting,
}) => {
  return (
    <>
      {/* Outdoor Activity Form */}
      <form
        ref={outdoorFormRef}
        onSubmit={handleOutdoorSubmit}
        className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mt-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Outdoor Activity</h2>

        <label htmlFor="outdoor-date" className="block text-sm font-medium text-gray-700 mb-2">
          Date
        </label>

        <input
          id="outdoor-date"
          type="date"
          name="date"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-4 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          value={outdoorData.date}
          onChange={handleOutdoorChange}
          max={new Date().toISOString().split("T")[0]}
        />

        <label
          htmlFor="outdoor-duration-minutes"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Duration (Minutes)
        </label>

        <input
          id="outdoor-duration-minutes"
          type="number"
          name="durationMinutes"
          min="1"
          placeholder="Enter duration in minutes"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-4 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          value={outdoorData.durationMinutes}
          onChange={handleOutdoorChange}
        />

        <label
          htmlFor="outdoor-activity-type"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Activity Type
        </label>

        <input
          id="outdoor-activity-type"
          type="text"
          name="activityType"
          placeholder="e.g. Cycling"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-4 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          value={outdoorData.activityType}
          onChange={handleOutdoorChange}
        />

        <button
          type="submit"
          disabled={outdoorLoading}
          className="bg-green-600 hover:enabled:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {outdoorLoading
            ? "Saving..."
            : editingOutdoorId
              ? "Update Outdoor Activity"
              : "Save Outdoor Activity"}
        </button>
      </form>

      {/* Outdoor Activity History */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Outdoor Activity History</h2>

        {outdoorActivities.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center border border-gray-100">
            <p className="text-gray-500 text-lg">No outdoor activities yet.</p>

            <p className="text-gray-400 mt-2">Add your first outdoor activity to begin tracking.</p>
          </div>
        ) : (
          outdoorActivities.map((activity) => (
            <div
              key={activity._id}
              className="border border-gray-200 rounded-xl p-5 mb-4 bg-gray-50"
            >
              <div className="space-y-2">
                <div className="flex items-center py-2">
                  <span className="min-w-[140px] shrink-0 text-sm font-medium text-gray-500">
                    Date
                  </span>

                  <span className="text-base font-semibold text-gray-900">
                    {new Date(activity.date).toLocaleDateString("en-GB", {
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
                    {activity.durationMinutes} mins
                  </span>
                </div>

                <div className="flex items-center py-2">
                  <span className="min-w-[140px] shrink-0 text-sm font-medium text-gray-500">
                    Activity
                  </span>

                  <span className="text-base font-semibold text-gray-900">
                    {activity.activityType}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    setSelectedOutdoorId(activity._id);
                    setShowDeleteModal(true);
                  }}
                  className="min-w-[90px] bg-red-600 hover:enabled:bg-red-700 text-white font-medium px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer"
                >
                  Delete
                </button>

                <button
                  onClick={() => {
                    setEditingOutdoorId(activity._id);

                    setOutdoorData({
                      date: activity.date.split("T")[0],
                      activityType: activity.activityType,
                      durationMinutes: activity.durationMinutes,
                    });

                    outdoorFormRef.current?.scrollIntoView({
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

      {/* Outdoor Activity Trend Chart */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Outdoor Activity Trend</h2>

        {outdoorActivities.length === 0 ? (
          <div className="flex items-center justify-center h-[350px] text-center">
            <div>
              <p className="text-lg text-gray-500">No outdoor activity data available.</p>

              <p className="text-gray-400 mt-2">Add outdoor activities to visualize trends.</p>
            </div>
          </div>
        ) : (
          <div className="h-[350px]">
            <Line data={outdoorChartData} options={outdoorChartOptions} />
          </div>
        )}
      </div>
      {showDeleteModal && (
        <ConfirmationModal
          title="Delete Outdoor Activity"
          message={
            <>
              Are you sure you want to permanently delete this outdoor activity record?
              <br />
              <br />
              This action cannot be undone.
            </>
          }
          isDeleting={isDeleting}
          onCancel={() => setShowDeleteModal(false)}
          onDelete={handleDeleteOutdoorActivity}
        />
      )}
    </>
  );
};

export default OutdoorSection;
