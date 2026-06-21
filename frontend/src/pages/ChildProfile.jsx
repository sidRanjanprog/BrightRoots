import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getChildById } from "../services/childService";

import {
  createScreenTime,
  getScreenTimes,
  deleteScreenTime,
  updateScreenTime,
} from "../services/screenTimeService";

import {
  createSleep,
  getSleepRecords,
  deleteSleep,
  updateSleep,
} from "../services/sleepService";

import {
  createOutdoorActivity,
  getOutdoorActivities,
  deleteOutdoorActivity,
  updateOutdoorActivity,
} from "../services/outdoorActivityService";

import { getRecommendations } from "../services/recommendationService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const ChildProfile = () => {
  const { id } = useParams();

  const [child, setChild] = useState(null);

  const [screenTimes, setScreenTimes] = useState([]);

  const [editingScreenTimeId, setEditingScreenTimeId] = useState(null);

  const [screenTimeData, setScreenTimeData] = useState({
    date: "",
    durationMinutes: "",
    activityType: "Educational",
  });

  const [sleepRecords, setSleepRecords] = useState([]);

  const [sleepData, setSleepData] = useState({
    date: "",
    sleepHours: "",
    sleepQuality: "Good",
  });

  const [editingSleepId, setEditingSleepId] = useState(null);

  const [outdoorActivities, setOutdoorActivities] = useState([]);

  const [outdoorData, setOutdoorData] = useState({
    date: "",
    activityType: "",
    durationMinutes: "",
  });

  const [editingOutdoorId, setEditingOutdoorId] = useState(null);

  const [recommendationData, setRecommendationData] = useState(null);

  const handleScreenTimeChange = (e) => {
    setScreenTimeData({
      ...screenTimeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteScreenTime = async (id) => {
    try {
      await deleteScreenTime(id);

      await fetchScreenTimes();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSleepChange = (e) => {
    setSleepData({
      ...sleepData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteSleep = async (id) => {
    try {
      await deleteSleep(id);

      await fetchSleepRecords();
    } catch (error) {
      console.error(error);
    }
  };

  const handleOutdoorChange = (e) => {
    setOutdoorData({
      ...outdoorData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteOutdoorActivity = async (id) => {
    try {
      await deleteOutdoorActivity(id);

      await fetchOutdoorActivities();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSleepSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (editingSleepId) {
        response = await updateSleep(editingSleepId, sleepData);

        setEditingSleepId(null);
      } else {
        response = await createSleep({
          childId: child._id,
          ...sleepData,
        });
      }

      console.log(response);

      await fetchSleepRecords();

      setSleepData({
        date: "",
        sleepHours: "",
        sleepQuality: "Good",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleOutdoorSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (editingOutdoorId) {
        response = await updateOutdoorActivity(editingOutdoorId, outdoorData);

        setEditingOutdoorId(null);
      } else {
        response = await createOutdoorActivity({
          childId: child._id,
          ...outdoorData,
        });
      }

      console.log(response);

      await fetchOutdoorActivities();

      setOutdoorData({
        date: "",
        activityType: "",
        durationMinutes: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleScreenTimeSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (editingScreenTimeId) {
        response = await updateScreenTime(editingScreenTimeId, screenTimeData);

        setEditingScreenTimeId(null);
      } else {
        response = await createScreenTime({
          childId: child._id,
          ...screenTimeData,
        });
      }

      console.log(response);

      await fetchScreenTimes();

      setScreenTimeData({
        date: "",
        durationMinutes: "",
        activityType: "Educational",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchChild = async () => {
    try {
      const data = await getChildById(id);

      console.log(data);

      setChild(data.child);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchScreenTimes = async () => {
    try {
      const data = await getScreenTimes(id);

      console.log(data);

      setScreenTimes(data.screenTimes);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSleepRecords = async () => {
    try {
      const data = await getSleepRecords(id);

      console.log(data);

      setSleepRecords(data.sleepRecords);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOutdoorActivities = async () => {
    try {
      const data = await getOutdoorActivities(id);

      console.log(data);

      setOutdoorActivities(data.activities);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const data = await getRecommendations(id);

      console.log(data);

      setRecommendationData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChild();
    fetchScreenTimes();
    fetchSleepRecords();
    fetchOutdoorActivities();
  }, [id]);

  if (!child) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1>Loading...</h1>
      </div>
    );
  }

  const screenTimeChartData = {
    labels: screenTimes.map((record) =>
      new Date(record.date).toLocaleDateString(),
    ),

    datasets: [
      {
        label: "Screen Time (Minutes)",
        data: screenTimes.map((record) => record.durationMinutes),
        borderColor: "rgb(59,130,246)",
        backgroundColor: "rgba(59,130,246,0.5)",
      },
    ],
  };

  const sleepChartData = {
    labels: sleepRecords.map((record) =>
      new Date(record.date).toLocaleDateString(),
    ),

    datasets: [
      {
        label: "Sleep Hours",
        data: sleepRecords.map((record) => record.sleepHours),
        borderColor: "rgb(34,197,94)",
        backgroundColor: "rgba(34,197,94,0.5)",
      },
    ],
  };

  const outdoorActivityChartData = {
    labels: outdoorActivities.map((activity) =>
      new Date(activity.date).toLocaleDateString(),
    ),

    datasets: [
      {
        label: "Outdoor Activity (Minutes)",

        data: outdoorActivities.map((activity) => activity.durationMinutes),

        borderColor: "rgb(249,115,22)",

        backgroundColor: "rgba(249,115,22,0.5)",
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Child Profile</h1>

      <div className="bg-white p-6 rounded shadow">
        <p className="mb-3">
          <strong>Name:</strong> {child.name}
        </p>

        <p className="mb-3">
          <strong>Age:</strong> {child.age}
        </p>

        <p className="mb-3">
          <strong>Gender:</strong> {child.gender}
        </p>
      </div>

      {/* Screen Form */}
      <form
        onSubmit={handleScreenTimeSubmit}
        className="bg-white p-6 rounded shadow mt-8"
      >
        <h2 className="text-2xl font-semibold mb-4">Add Screen Time</h2>

        <input
          type="date"
          name="date"
          className="w-full border p-3 mb-4 rounded"
          value={screenTimeData.date}
          onChange={handleScreenTimeChange}
          max={new Date().toISOString().split("T")[0]}
        />

        <input
          type="number"
          name="durationMinutes"
          placeholder="Duration (Minutes)"
          className="w-full border p-3 mb-4 rounded"
          value={screenTimeData.durationMinutes}
          onChange={handleScreenTimeChange}
        />

        <select
          name="activityType"
          className="w-full border p-3 mb-4 rounded"
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
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          {editingScreenTimeId ? "Update Screen Time" : "Save Screen Time"}
        </button>
      </form>

      {/* Screen Time History */}
      <div className="bg-white p-6 rounded shadow mt-8">
        <h2 className="text-2xl font-semibold mb-4">Screen Time Records</h2>

        {screenTimes.length === 0 ? (
          <p>No screen time records yet.</p>
        ) : (
          screenTimes.map((record) => (
            <div key={record._id} className="border p-4 rounded mb-3">
              <p>
                <strong>Date:</strong>{" "}
                {new Date(record.date).toLocaleDateString()}
              </p>

              <p>
                <strong>Duration:</strong> {record.durationMinutes} mins
              </p>

              <p>
                <strong>Activity:</strong> {record.activityType}
              </p>

              <button
                onClick={() => handleDeleteScreenTime(record._id)}
                className="mt-2 mr-2 bg-red-600 text-white px-3 py-2 rounded"
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
                }}
                className="mt-2 bg-yellow-500 text-white px-3 py-2 rounded"
              >
                Edit
              </button>
            </div>
          ))
        )}
      </div>

      {/* Screen Time Trend Chart */}
      <div className="bg-white p-6 rounded shadow mt-8">
        <h2 className="text-2xl font-semibold mb-4">Screen Time Trend</h2>

        <Line data={screenTimeChartData} />
      </div>

      {/* Sleep Form */}
      <form
        onSubmit={handleSleepSubmit}
        className="bg-white p-6 rounded shadow mt-8"
      >
        <h2 className="text-2xl font-semibold mb-4">Add Sleep Record</h2>

        <input
          type="date"
          name="date"
          className="w-full border p-3 mb-4 rounded"
          value={sleepData.date}
          onChange={handleSleepChange}
          max={new Date().toISOString().split("T")[0]}
        />

        <input
          type="number"
          name="sleepHours"
          placeholder="Sleep Hours"
          className="w-full border p-3 mb-4 rounded"
          value={sleepData.sleepHours}
          onChange={handleSleepChange}
        />

        <select
          name="sleepQuality"
          className="w-full border p-3 mb-4 rounded"
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
          className="bg-purple-600 text-white px-6 py-3 rounded"
        >
          {editingSleepId ? "Update Sleep" : "Save Sleep"}
        </button>
      </form>

      {/* Sleep History*/}
      <div className="bg-white p-6 rounded shadow mt-8">
        <h2 className="text-2xl font-semibold mb-4">Sleep History</h2>

        {sleepRecords.length === 0 ? (
          <p>No sleep records yet.</p>
        ) : (
          sleepRecords.map((record) => (
            <div key={record._id} className="border p-4 rounded mb-3">
              <p>
                <strong>Date:</strong>{" "}
                {new Date(record.date).toLocaleDateString()}
              </p>

              <p>
                <strong>Sleep Hours:</strong> {record.sleepHours}
              </p>

              <p>
                <strong>Quality:</strong> {record.sleepQuality}
              </p>

              <button
                onClick={() => handleDeleteSleep(record._id)}
                className="mt-2 mr-2 bg-red-600 text-white px-3 py-2 rounded"
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
                }}
                className="mt-2 bg-yellow-500 text-white px-3 py-2 rounded"
              >
                Edit
              </button>
            </div>
          ))
        )}
      </div>

      {/* Sleep Trend Chart */}
      <div className="bg-white p-6 rounded shadow mt-8">
        <h2 className="text-2xl font-semibold mb-4">Sleep Trend</h2>

        <Line data={sleepChartData} />
      </div>

      {/* Outdoor Activity Form */}
      <form
        onSubmit={handleOutdoorSubmit}
        className="bg-white p-6 rounded shadow mt-8"
      >
        <h2 className="text-2xl font-semibold mb-4">Add Outdoor Activity</h2>

        <input
          type="date"
          name="date"
          className="w-full border p-3 mb-4 rounded"
          value={outdoorData.date}
          onChange={handleOutdoorChange}
          max={new Date().toISOString().split("T")[0]}
        />

        <input
          type="text"
          name="activityType"
          placeholder="Activity Type"
          className="w-full border p-3 mb-4 rounded"
          value={outdoorData.activityType}
          onChange={handleOutdoorChange}
        />

        <input
          type="number"
          name="durationMinutes"
          placeholder="Duration (Minutes)"
          className="w-full border p-3 mb-4 rounded"
          value={outdoorData.durationMinutes}
          onChange={handleOutdoorChange}
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          {editingOutdoorId
            ? "Update Outdoor Activity"
            : "Save Outdoor Activity"}
        </button>
      </form>

      {/* Outdoor Activity History */}
      <div className="bg-white p-6 rounded shadow mt-8">
        <h2 className="text-2xl font-semibold mb-4">
          Outdoor Activity History
        </h2>

        {outdoorActivities.length === 0 ? (
          <p>No outdoor activities yet.</p>
        ) : (
          outdoorActivities.map((activity) => (
            <div key={activity._id} className="border p-4 rounded mb-3">
              <p>
                <strong>Date:</strong>{" "}
                {new Date(activity.date).toLocaleDateString()}
              </p>

              <p>
                <strong>Activity:</strong> {activity.activityType}
              </p>

              <p>
                <strong>Duration:</strong> {activity.durationMinutes} mins
              </p>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleDeleteOutdoorActivity(activity._id)}
                  className="bg-red-600 text-white px-3 py-2 rounded"
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
                  }}
                  className="bg-yellow-500 text-white px-3 py-2 rounded"
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Outdoor Activity Trend Chart */}
      <div className="bg-white p-6 rounded shadow mt-8">
        <h2 className="text-2xl font-semibold mb-4">Outdoor Activity Trend</h2>

        <Line data={outdoorActivityChartData} />
      </div>

      <div className="bg-white p-6 rounded shadow mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recommendations</h2>

        <button
          onClick={fetchRecommendations}
          className="bg-green-600 text-white px-6 py-3 rounded mb-6"
        >
          Generate Recommendations
        </button>

        {recommendationData && (
          <>
            <div className="mb-4">
              <p>
                <strong>Wellness Score:</strong>{" "}
                {recommendationData.wellnessScore}
              </p>

              <p>
                <strong>Risk Level:</strong> {recommendationData.riskLevel}
              </p>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold">Metrics</h3>

              <p>
                Average Screen Time: {recommendationData.metrics.avgScreenTime}
                mins
              </p>

              <p>
                Average Sleep: {recommendationData.metrics.avgSleep}
                hrs
              </p>

              <p>
                Average Outdoor Time:{" "}
                {recommendationData.metrics.avgOutdoorTime}
                mins
              </p>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold">Recommendations</h3>

              <ul className="list-disc pl-6">
                {recommendationData.recommendations.map(
                  (recommendation, index) => (
                    <li key={index}>{recommendation}</li>
                  ),
                )}
              </ul>
            </div>

            {recommendationData.dataWarnings.length > 0 && (
              <div>
                <h3 className="font-semibold">Data Warnings</h3>

                <ul className="list-disc pl-6">
                  {recommendationData.dataWarnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ChildProfile;
