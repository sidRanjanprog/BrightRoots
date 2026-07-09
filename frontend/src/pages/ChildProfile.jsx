import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

import { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";

import { getChildById } from "../services/childService";

import {
  createScreenTime,
  deleteScreenTime,
  getScreenTimes,
  updateScreenTime,
} from "../services/screenTimeService";

import { createSleep, deleteSleep, getSleepRecords, updateSleep } from "../services/sleepService";

import {
  createOutdoorActivity,
  deleteOutdoorActivity,
  getOutdoorActivities,
  updateOutdoorActivity,
} from "../services/outdoorActivityService";

import ChildInfoCard from "../components/sections/ChildInfoCard";

import { getRecommendations } from "../services/recommendationService";
import RecommendationSection from "../components/sections/RecommendationSection";
import ScreenTimeSection from "../components/sections/ScreenTimeSection";

import { toast } from "react-toastify";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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

  const screenTimeFormRef = useRef(null);

  const [sleepRecords, setSleepRecords] = useState([]);

  const [sleepData, setSleepData] = useState({
    date: "",
    sleepHours: "",
    sleepQuality: "Good",
  });

  const sleepFormRef = useRef(null);

  const [editingSleepId, setEditingSleepId] = useState(null);

  const [outdoorActivities, setOutdoorActivities] = useState([]);

  const [outdoorData, setOutdoorData] = useState({
    date: "",
    activityType: "",
    durationMinutes: "",
  });

  const outdoorFormRef = useRef(null);

  const [editingOutdoorId, setEditingOutdoorId] = useState(null)

  const [recommendationData, setRecommendationData] = useState(null);

  const [recommendationLoading, setRecommendationLoading] = useState(false);

  const [recommendationError, setRecommendationError] = useState("");

  const [screenTimeLoading, setScreenTimeLoading] = useState(false);

  const [sleepLoading, setSleepLoading] = useState(false);

  const [outdoorLoading, setOutdoorLoading] = useState(false);

  const handleScreenTimeChange = (e) => {
    setScreenTimeData({
      ...screenTimeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteScreenTime = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this record?");

    if (!confirmed) {
      return;
    }
    try {
      await deleteScreenTime(id);

      toast.success("Screen time deleted successfully!");

      await fetchScreenTimes();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to delete screen time");
    }
  };

  const handleSleepChange = (e) => {
    setSleepData({
      ...sleepData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteSleep = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this record?");

    if (!confirmed) {
      return;
    }
    try {
      await deleteSleep(id);

      toast.success("Sleep record deleted successfully!");

      await fetchSleepRecords();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete sleep record");
    }
  };

  const handleOutdoorChange = (e) => {
    setOutdoorData({
      ...outdoorData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteOutdoorActivity = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this record?");

    if (!confirmed) {
      return;
    }
    try {
      await deleteOutdoorActivity(id);

      toast.success("Outdoor activity deleted successfully!");

      await fetchOutdoorActivities();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to delete outdoor activity");
    }
  };

  const handleSleepSubmit = async (e) => {
    e.preventDefault();

    if (Number(sleepData.sleepHours) <= 0) {
      toast.error("Sleep hours must be greater than 0");
      return;
    }

    if (Number(sleepData.sleepHours) > 24) {
      toast.error("Sleep hours cannot exceed 24");
      return;
    }

    if (!sleepData.date) {
      toast.error("Please select a date");
      return;
    }

    const selectedDate = new Date(sleepData.date);

    if (selectedDate > new Date()) {
      toast.error("Future dates are not allowed");
      return;
    }

    try {
      setSleepLoading(true);
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

      const isEditing = Boolean(editingSleepId);

      toast.success(
        isEditing ? "Sleep record updated successfully!" : "Sleep record saved successfully!"
      );

      await fetchSleepRecords();

      setRecommendationData(null);
      setRecommendationError("");

      setSleepData({
        date: "",
        sleepHours: "",
        sleepQuality: "Good",
      });
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to save sleep record");
    } finally {
      setSleepLoading(false);
    }
  };

  const handleOutdoorSubmit = async (e) => {
    e.preventDefault();

    if (Number(outdoorData.durationMinutes) <= 0) {
      toast.error("Duration must be greater than 0");
      return;
    }

    if (!outdoorData.activityType.trim()) {
      toast.error("Activity type is required");
      return;
    }

    if (!outdoorData.date) {
      toast.error("Please select a date");
      return;
    }

    const selectedDate = new Date(outdoorData.date);

    if (selectedDate > new Date()) {
      toast.error("Future dates are not allowed");
      return;
    }

    try {
      setOutdoorLoading(true);
      let response;

      const isEditing = Boolean(editingOutdoorId);

      if (editingOutdoorId) {
        response = await updateOutdoorActivity(editingOutdoorId, outdoorData);

        setEditingOutdoorId(null);
      } else {
        response = await createOutdoorActivity({
          childId: child._id,
          ...outdoorData,
        });
      }

      toast.success(
        isEditing
          ? "Outdoor activity updated successfully!"
          : "Outdoor activity saved successfully!"
      );

      await fetchOutdoorActivities();

      setRecommendationData(null);
      setRecommendationError("");

      setOutdoorData({
        date: "",
        activityType: "",
        durationMinutes: "",
      });
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to save outdoor activity");
    } finally {
      setOutdoorLoading(false);
    }
  };

  const handleScreenTimeSubmit = async (e) => {
    e.preventDefault();

    if (Number(screenTimeData.durationMinutes) <= 0) {
      toast.error("Screen time must be greater than 0");
      return;
    }

    if (!screenTimeData.date) {
      toast.error("Please select a date");
      return;
    }

    const selectedDate = new Date(screenTimeData.date);

    if (selectedDate > new Date()) {
      toast.error("Future dates are not allowed");
      return;
    }

    try {
      setScreenTimeLoading(true);
      let response;

      const isEditing = Boolean(editingScreenTimeId);

      if (editingScreenTimeId) {
        response = await updateScreenTime(editingScreenTimeId, screenTimeData);

        setEditingScreenTimeId(null);
      } else {
        response = await createScreenTime({
          childId: child._id,
          ...screenTimeData,
        });
      }

      toast.success(
        isEditing ? "Screen time updated successfully!" : "Screen time saved successfully!"
      );

      await fetchScreenTimes();
      setRecommendationData(null);
      setRecommendationError("");

      setScreenTimeData({
        date: "",
        durationMinutes: "",
        activityType: "Educational",
      });
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to save screen time");
    } finally {
      setScreenTimeLoading(false);
    }
  };

  const fetchChild = async () => {
    try {
      const data = await getChildById(id);

      setChild(data.child);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchScreenTimes = async () => {
    try {
      const data = await getScreenTimes(id);

      setScreenTimes(data.screenTimes);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSleepRecords = async () => {
    try {
      const data = await getSleepRecords(id);

      setSleepRecords(data.sleepRecords);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOutdoorActivities = async () => {
    try {
      const data = await getOutdoorActivities(id);

      setOutdoorActivities(data.activities);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRecommendations = async () => {
    try {
      setRecommendationLoading(true);

      setRecommendationError("");

      const data = await getRecommendations(id);

      setRecommendationData(data);
    } catch (error) {
      console.error(error);

      setRecommendationError("Unable to generate wellness analysis. Please try again.");
    } finally {
      setRecommendationLoading(false);
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
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-10 text-center">
          <p className="text-lg text-gray-600">Loading child profile...</p>
        </div>
      </div>
    );
  }

  const sortedScreenTimes = [...screenTimes].sort((a, b) => new Date(a.date) - new Date(b.date));

  const screenTimeChartData = {
    labels: sortedScreenTimes.map((record) =>
      new Date(record.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      })
    ),

    datasets: [
      {
        label: "Screen Time",
        data: sortedScreenTimes.map((record) => record.durationMinutes),

        borderColor: "rgb(59,130,246)",
        backgroundColor: "rgb(59,130,246)",

        borderWidth: 3,

        pointRadius: 5,
        pointHoverRadius: 7,

        pointBackgroundColor: "rgb(59,130,246)",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,

        tension: 0.35,

        fill: false,
      },
    ],
  };

  const screenTimeChartOptions = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y} mins`,
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#6B7280",
        },
      },

      y: {
        beginAtZero: true,

        ticks: {
          stepSize: 20,
          color: "#6B7280",
        },

        grid: {
          color: "#E5E7EB",
        },
      },
    },
  };

  const sortedSleepRecords = [...sleepRecords].sort((a, b) => new Date(a.date) - new Date(b.date));

  const sleepChartData = {
    labels: sortedSleepRecords.map((record) =>
      new Date(record.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      })
    ),

    datasets: [
      {
        label: "Sleep",
        data: sortedSleepRecords.map((record) => record.sleepHours),

        borderColor: "rgb(59,130,246)",
        backgroundColor: "rgb(59,130,246)",

        borderWidth: 3,

        pointRadius: 5,
        pointHoverRadius: 7,

        pointBackgroundColor: "rgb(59,130,246)",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,

        tension: 0.35,

        fill: false,
      },
    ],
  };

  const sleepChartOptions = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y} hours`,
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#6B7280",
        },
      },

      y: {
        beginAtZero: true,

        ticks: {
          stepSize: 1,
          color: "#6B7280",
        },

        grid: {
          color: "#E5E7EB",
        },
      },
    },
  };

  const sortedOutdoorActivities = [...outdoorActivities].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const outdoorChartData = {
    labels: sortedOutdoorActivities.map((record) =>
      new Date(record.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      })
    ),

    datasets: [
      {
        label: "Outdoor Activity",
        data: sortedOutdoorActivities.map((record) => record.durationMinutes),

        borderColor: "rgb(59,130,246)",
        backgroundColor: "rgb(59,130,246)",

        borderWidth: 3,

        pointRadius: 5,
        pointHoverRadius: 7,

        pointBackgroundColor: "rgb(59,130,246)",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,

        tension: 0.25,

        fill: false,
      },
    ],
  };

  const outdoorChartOptions = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y} mins`,
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#6B7280",
        },
      },

      y: {
        beginAtZero: true,

        ticks: {
          stepSize: 20,
          color: "#6B7280",
        },

        grid: {
          color: "#E5E7EB",
        },
      },
    },
  };

  const riskBadgeStyles = {
    Low: "bg-green-100 text-green-700",
    Moderate: "bg-yellow-100 text-yellow-700",
    High: "bg-red-100 text-red-700",
  };

  const riskIcons = {
    Low: "🟢",
    Moderate: "🟡",
    High: "🔴",
  };

  const getRecommendationStyle = (text) => {
    const value = text.toLowerCase();

    // Action Needed
    if (
      value.includes("reduce") ||
      value.includes("encourage") ||
      value.includes("benefit") ||
      value.includes("improve") ||
      value.includes("consider")
    ) {
      return {
        icon: "⚠",
        bg: "bg-amber-100",
        text: "text-amber-700",
        border: "border-amber-200",
        card: "bg-amber-50",
      };
    }

    // Screen Time
    if (value.includes("screen")) {
      return {
        icon: "📱",
        bg: "bg-blue-100",
        text: "text-blue-700",
        border: "border-blue-200",
        card: "bg-blue-50",
      };
    }

    // Sleep
    if (value.includes("sleep")) {
      return {
        icon: "😴",
        bg: "bg-purple-100",
        text: "text-purple-700",
        border: "border-purple-200",
        card: "bg-purple-50",
      };
    }

    // Outdoor
    if (value.includes("outdoor") || value.includes("physical") || value.includes("active")) {
      return {
        icon: "⚽",
        bg: "bg-orange-100",
        text: "text-orange-700",
        border: "border-orange-200",
        card: "bg-orange-50",
      };
    }

    // Family / General Wellness
    return {
      icon: "❤️",
      bg: "bg-green-100",
      text: "text-green-700",
      border: "border-green-200",
      card: "bg-green-50",
    };
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Child Profile</h1>

      <ChildInfoCard child={child} />

      <ScreenTimeSection
        screenTimeData={screenTimeData}
        screenTimeLoading={screenTimeLoading}
        editingScreenTimeId={editingScreenTimeId}
        handleScreenTimeChange={handleScreenTimeChange}
        handleScreenTimeSubmit={handleScreenTimeSubmit}
        screenTimes={screenTimes}
        handleDeleteScreenTime={handleDeleteScreenTime}
        setEditingScreenTimeId={setEditingScreenTimeId}
        setScreenTimeData={setScreenTimeData}
        screenTimeFormRef={screenTimeFormRef}
        screenTimeChartData={screenTimeChartData}
        screenTimeChartOptions={screenTimeChartOptions}
      />

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
          className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-4 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-4 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={sleepData.sleepHours}
          onChange={handleSleepChange}
        />

        <label htmlFor="sleep-quality" className="block text-sm font-medium text-gray-700 mb-2">
          Sleep Quality
        </label>

        <select
          id="sleep-quality"
          name="sleepQuality"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-4 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          className="bg-blue-600 hover:enabled:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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
                  className="min-w-[90px] bg-yellow-500 hover:enabled:bg-yellow-600 text-white font-medium px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer"
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
          className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-4 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-4 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-4 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={outdoorData.activityType}
          onChange={handleOutdoorChange}
        />

        <button
          type="submit"
          disabled={outdoorLoading}
          className="bg-blue-600 hover:enabled:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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
                  onClick={() => handleDeleteOutdoorActivity(activity._id)}
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
                  className="min-w-[90px] bg-yellow-500 hover:enabled:bg-yellow-600 text-white font-medium px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer"
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

      <RecommendationSection
        recommendationData={recommendationData}
        recommendationLoading={recommendationLoading}
        recommendationError={recommendationError}
        fetchRecommendations={fetchRecommendations}
        riskBadgeStyles={riskBadgeStyles}
        riskIcons={riskIcons}
        getRecommendationStyle={getRecommendationStyle}
      />
    </div>
  );
};

export default ChildProfile;
