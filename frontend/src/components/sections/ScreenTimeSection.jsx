const ScreenTimeSection = ({
  screenTimeData,
  screenTimeLoading,
  editingScreenTimeId,
  handleScreenTimeChange,
  handleScreenTimeSubmit,
}) => {
  return (
    <form
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
        className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-4 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
        className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-4 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
        className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-4 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
        className="bg-blue-600 hover:enabled:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {screenTimeLoading
          ? "Saving..."
          : editingScreenTimeId
            ? "Update Screen Time"
            : "Save Screen Time"}
      </button>
    </form>
  );
};

export default ScreenTimeSection;
