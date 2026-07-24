// React
import { useEffect, useRef, useState } from "react";

// React Router
import { useParams, useNavigate } from "react-router-dom";

// Third-party Libraries
import { toast } from "react-toastify";

// Services
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

import EditChildForm from "../components/forms/EditChildForm";
import { deleteChild } from "../services/childService";

import ConfirmationModal from "../components/modals/ConfirmationModal";

import { getRecommendations } from "../services/recommendationService";

// Components
import ChildInfoCard from "../components/sections/ChildInfoCard";
import OutdoorSection from "../components/sections/OutdoorSection";
import RecommendationSection from "../components/sections/RecommendationSection";
import ScreenTimeSection from "../components/sections/ScreenTimeSection";
import SleepSection from "../components/sections/SleepSection";

// Utilities
import { getOutdoorChart, getScreenTimeChart, getSleepChart } from "../utils/chartConfig";

const ChildProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ==============================
  // Child State
  const [child, setChild] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  // ==============================

  // ==============================
  // Screen Time State
  const [screenTimes, setScreenTimes] = useState([]);
  const [screenTimeLoading, setScreenTimeLoading] = useState(false);
  const [editingScreenTimeId, setEditingScreenTimeId] = useState(null);
  const [screenTimeData, setScreenTimeData] = useState({
    date: "",
    durationMinutes: "",
    activityType: "Educational",
  });
  const [showScreenTimeDeleteModal, setShowScreenTimeDeleteModal] = useState(false);
  const [selectedScreenTimeId, setSelectedScreenTimeId] = useState(null);
  const [isDeletingScreenTime, setIsDeletingScreenTime] = useState(false);
  // ==============================

  // ==============================
  // Sleep State
  const [sleepRecords, setSleepRecords] = useState([]);
  const [sleepLoading, setSleepLoading] = useState(false);
  const [editingSleepId, setEditingSleepId] = useState(null);
  const [sleepData, setSleepData] = useState({
    date: "",
    sleepHours: "",
    sleepQuality: "Good",
  });
  const [showSleepDeleteModal, setShowSleepDeleteModal] = useState(false);
  const [selectedSleepId, setSelectedSleepId] = useState(null);
  const [isDeletingSleep, setIsDeletingSleep] = useState(false);
  // ==============================

  // ==============================
  // Outdoor Activity State
  const [outdoorActivities, setOutdoorActivities] = useState([]);
  const [outdoorLoading, setOutdoorLoading] = useState(false);
  const [editingOutdoorId, setEditingOutdoorId] = useState(null);
  const [outdoorData, setOutdoorData] = useState({
    date: "",
    activityType: "",
    durationMinutes: "",
  });
  const [showOutdoorDeleteModal, setShowOutdoorDeleteModal] = useState(false);
  const [selectedOutdoorId, setSelectedOutdoorId] = useState(null);
  const [isDeletingOutdoor, setIsDeletingOutdoor] = useState(false);
  // ==============================

  // ==============================
  // Recommendation State
  const [recommendationData, setRecommendationData] = useState(null);
  const [recommendationLoading, setRecommendationLoading] = useState(false);
  const [recommendationError, setRecommendationError] = useState("");
  // ==============================

  // ==============================
  // Refs
  const screenTimeFormRef = useRef(null);
  const sleepFormRef = useRef(null);
  const outdoorFormRef = useRef(null);
  // ==============================

  // ==============================
  // Derived Data
  const { chartData: screenTimeChartData, chartOptions: screenTimeChartOptions } =
    getScreenTimeChart(screenTimes);

  const { chartData: sleepChartData, chartOptions: sleepChartOptions } =
    getSleepChart(sleepRecords);

  const { chartData: outdoorChartData, chartOptions: outdoorChartOptions } =
    getOutdoorChart(outdoorActivities);
  // ==============================

  // ==============================
  // Fetch Functions
  const fetchChild = async () => {
    try {
      const data = await getChildById(id);

      setChild(data.child);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateSuccess = async () => {
    await fetchChild();

    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      await deleteChild(child._id);

      toast.success("Child deleted successfully!");

      setShowDeleteModal(false);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to delete child");
    } finally {
      setIsDeleting(false);
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
  // ==============================

  // ==============================
  // Screen Time Handlers
  const handleScreenTimeChange = (e) => {
    setScreenTimeData({
      ...screenTimeData,
      [e.target.name]: e.target.value,
    });
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

      const isEditing = Boolean(editingScreenTimeId);

      if (editingScreenTimeId) {
        await updateScreenTime(editingScreenTimeId, screenTimeData);

        setEditingScreenTimeId(null);
      } else {
        await createScreenTime({
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
  const handleDeleteScreenTime = async () => {
    try {
      setIsDeletingScreenTime(true);

      await deleteScreenTime(selectedScreenTimeId);

      toast.success("Screen time deleted successfully!");

      setShowScreenTimeDeleteModal(false);
      setSelectedScreenTimeId(null);

      await fetchScreenTimes();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to delete screen time");
    } finally {
      setIsDeletingScreenTime(false);
    }
  };
  // ==============================

  // ==============================
  // Sleep Handlers
  const handleSleepChange = (e) => {
    setSleepData({
      ...sleepData,
      [e.target.name]: e.target.value,
    });
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
      const isEditing = Boolean(editingSleepId);

      if (editingSleepId) {
        await updateSleep(editingSleepId, sleepData);

        setEditingSleepId(null);
      } else {
        await createSleep({
          childId: child._id,
          ...sleepData,
        });
      }

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
  const handleDeleteSleep = async () => {
    try {
      setIsDeletingSleep(true);

      await deleteSleep(selectedSleepId);

      toast.success("Sleep record deleted successfully!");

      setShowSleepDeleteModal(false);
      setSelectedSleepId(null);

      await fetchSleepRecords();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to delete sleep record");
    } finally {
      setIsDeletingSleep(false);
    }
  };
  // ==============================
  // Outdoor Activity Handlers
  const handleOutdoorChange = (e) => {
    setOutdoorData({
      ...outdoorData,
      [e.target.name]: e.target.value,
    });
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

      const isEditing = Boolean(editingOutdoorId);

      if (editingOutdoorId) {
        await updateOutdoorActivity(editingOutdoorId, outdoorData);

        setEditingOutdoorId(null);
      } else {
        await createOutdoorActivity({
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
  const handleDeleteOutdoorActivity = async () => {
    try {
      setIsDeletingOutdoor(true);

      await deleteOutdoorActivity(selectedOutdoorId);

      toast.success("Outdoor activity deleted successfully!");

      setShowOutdoorDeleteModal(false);
      setSelectedOutdoorId(null);

      await fetchOutdoorActivities();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to delete outdoor activity");
    } finally {
      setIsDeletingOutdoor(false);
    }
  };
  // ==============================

  // ==============================
  // Effects
  useEffect(() => {
    fetchChild();
    fetchScreenTimes();
    fetchSleepRecords();
    fetchOutdoorActivities();
  }, [id]);
  // ==============================

  if (!child) {
    return (
      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-10 text-center">
          <p className="text-lg text-gray-600">Loading child profile...</p>
        </div>
      </div>
    );
  }

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

  // ==============================
  // Recommendation Helpers
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
  // ==============================

  // ==============================
  // Render
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">Child Profile</h1>

        {!isEditing && (
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(true)}
              className="border border-gray-300 bg-white px-5 py-2.5 rounded-xl text-gray-700 font-medium transition-all duration-300 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
            >
              Edit Child
            </button>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="border border-red-300 bg-white px-5 py-2.5 rounded-xl text-red-600 font-medium transition-all duration-300 hover:bg-red-50 hover:border-red-400 cursor-pointer"
            >
              Delete Child
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <EditChildForm
          child={child}
          onCancel={() => setIsEditing(false)}
          onSuccess={handleUpdateSuccess}
        />
      ) : (
        <ChildInfoCard child={child} />
      )}

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
        showDeleteModal={showScreenTimeDeleteModal}
        setShowDeleteModal={setShowScreenTimeDeleteModal}
        selectedScreenTimeId={selectedScreenTimeId}
        setSelectedScreenTimeId={setSelectedScreenTimeId}
        isDeleting={isDeletingScreenTime}
      />

      <SleepSection
        sleepData={sleepData}
        sleepLoading={sleepLoading}
        editingSleepId={editingSleepId}
        handleSleepChange={handleSleepChange}
        handleSleepSubmit={handleSleepSubmit}
        sleepRecords={sleepRecords}
        handleDeleteSleep={handleDeleteSleep}
        setEditingSleepId={setEditingSleepId}
        setSleepData={setSleepData}
        sleepFormRef={sleepFormRef}
        sleepChartData={sleepChartData}
        sleepChartOptions={sleepChartOptions}
        showDeleteModal={showSleepDeleteModal}
        setShowDeleteModal={setShowSleepDeleteModal}
        setSelectedSleepId={setSelectedSleepId}
        isDeleting={isDeletingSleep}
      />

      <OutdoorSection
        outdoorData={outdoorData}
        outdoorLoading={outdoorLoading}
        editingOutdoorId={editingOutdoorId}
        handleOutdoorChange={handleOutdoorChange}
        handleOutdoorSubmit={handleOutdoorSubmit}
        outdoorActivities={outdoorActivities}
        handleDeleteOutdoorActivity={handleDeleteOutdoorActivity}
        setEditingOutdoorId={setEditingOutdoorId}
        setOutdoorData={setOutdoorData}
        outdoorFormRef={outdoorFormRef}
        outdoorChartData={outdoorChartData}
        outdoorChartOptions={outdoorChartOptions}
        showDeleteModal={showOutdoorDeleteModal}
        setShowDeleteModal={setShowOutdoorDeleteModal}
        setSelectedOutdoorId={setSelectedOutdoorId}
        isDeleting={isDeletingOutdoor}
      />

      {showDeleteModal && (
        <ConfirmationModal
          title="Delete Child"
          message={
            <>
              Are you sure you want to permanently delete <strong>{child.name}</strong>'s profile?
              <br />
              <br />
              This action cannot be undone.
            </>
          }
          isDeleting={isDeleting}
          onCancel={() => setShowDeleteModal(false)}
          onDelete={handleDelete}
        />
      )}

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
// ==============================

export default ChildProfile;
