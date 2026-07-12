import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createChild, getChildren } from "../services/childService";

import { toast } from "react-toastify";
import { getDashboardInsights } from "../services/recommendationService";

const Dashboard = () => {
  // Navigation
  const navigate = useNavigate();

  // Logged-in User
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const firstName = user?.fullName?.split(" ")[0] || "Parent";

  // State
  const [children, setChildren] = useState([]);
  const [dashboardInsights, setDashboardInsights] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
  });

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Event Handlers
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      if (!formData.name.trim()) {
        toast.error("Child name is required");
        return;
      }

      if (Number(formData.age) < 1 || Number(formData.age) > 18) {
        toast.error("Age must be between 1 and 18");
        return;
      }

      if (!formData.gender) {
        toast.error("Please select a gender");
        return;
      }

      await createChild(formData);

      toast.success("Child added successfully!");

      await Promise.all([fetchChildren(), fetchDashboardInsights()]);

      setFormData({
        name: "",
        age: "",
        gender: "",
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add child");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  // Data Fetching
  const fetchChildren = async () => {
    try {
      const data = await getChildren();

      setChildren(data.children);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDashboardInsights = async () => {
    try {
      const data = await getDashboardInsights();

      setDashboardInsights(data);
    } catch (error) {
      console.error(error);
    }
  };

  const initializeDashboard = async () => {
    setLoading(true);

    try {
      await Promise.all([fetchChildren(), fetchDashboardInsights()]);
    } finally {
      setLoading(false);
    }
  };

  // Effects
  useEffect(() => {
    initializeDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-12 text-center">
          <div className="w-10 h-10 mx-auto mb-5 border-[5px] border-green-600 border-t-transparent rounded-full animate-spin"></div>

          <h2 className="text-xl font-semibold text-gray-800">Loading Dashboard</h2>

          <p className="text-gray-500 mt-2">Gathering your wellness insights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Welcome back, {firstName} 👋</h1>

          <p className="mt-2 text-lg text-gray-500">
            Here's an overview of your children's wellness.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="border border-gray-300 bg-white px-5 py-2.5 rounded-xl text-gray-700 font-medium transition-all duration-300 hover:border-red-300 hover:bg-red-50 hover:text-red-600 cursor-pointer"
        >
          Logout
        </button>
      </div>
      {/* Dashboard Insights */}
      {dashboardInsights && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-blue-50 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 min-h-[180px] text-center flex flex-col justify-center">
            <div className="text-4xl mb-3">👶</div>
            <h3 className="text-gray-600 font-medium">Total Children</h3>
            <p className="text-5xl font-bold text-gray-900 mt-2">
              {dashboardInsights.totalChildren}
            </p>
          </div>

          <div className="bg-green-50 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 min-h-[180px] text-center flex flex-col justify-center">
            <div className="text-4xl mb-3">💚</div>
            <h3 className="text-gray-600 font-medium">Average Wellness Score</h3>
            <p className="text-5xl font-bold text-gray-900 mt-2">
              {dashboardInsights.averageWellnessScore}
            </p>
          </div>

          <div className="bg-red-50 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 min-h-[180px] text-center flex flex-col justify-center">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="text-gray-600 font-medium">Highest Risk Child</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {dashboardInsights.highestRiskChild || "None"}
            </p>
          </div>

          <div className="bg-yellow-50 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 min-h-[180px] text-center flex flex-col justify-center">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="text-gray-600 font-medium">Average Screen Time</h3>
            <p className="text-5xl font-bold text-gray-900 mt-2">
              {dashboardInsights.averageScreenTime} mins
            </p>
          </div>

          <div className="bg-purple-50 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 min-h-[180px] text-center flex flex-col justify-center">
            <div className="text-4xl mb-3">😴</div>
            <h3 className="text-gray-600 font-medium">Average Sleep</h3>
            <p className="text-5xl font-bold text-gray-900 mt-2">
              {dashboardInsights.averageSleep} hrs
            </p>
          </div>

          <div className="bg-orange-50 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 min-h-[180px] text-center flex flex-col justify-center">
            <div className="text-4xl mb-3">⚽</div>
            <h3 className="text-gray-600 font-medium">Average Outdoor Time</h3>
            <p className="text-5xl font-bold text-gray-900 mt-2">
              {dashboardInsights.averageOutdoorTime} mins
            </p>
          </div>
        </div>
      )}
      {/* Your Children */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Children</h2>

        {children.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center border border-gray-100">
            <p className="text-gray-500 text-lg">No children added yet.</p>

            <p className="text-gray-400 mt-2">
              Add your first child to begin tracking their wellness journey.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {children.map((child) => (
              <div
                key={child._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-6"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-700 mb-4">
                    {child.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-gray-800">{child.name}</h3>

                  {/* Details */}
                  <p className="text-gray-500 mt-2">
                    {child.gender} • {child.age} Years
                  </p>

                  {/* Button */}
                  <button
                    onClick={() => navigate(`/dashboard/child/${child._id}`)}
                    className="mt-6 w-full bg-blue-600 hover:enabled:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition-all duration-300 cursor-pointer"
                  >
                    View Profile →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Add Child */}
      <div className="mt-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-md border border-gray-100 p-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Child</h2>
          <p className="text-gray-500 mt-2 mb-6">
            Create a child profile to begin tracking their wellness and daily activities.
          </p>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Child Name
          </label>

          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter child's name"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-4 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={formData.name}
            onChange={handleChange}
          />

          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
            Age
          </label>

          <input
            id="age"
            type="number"
            name="age"
            placeholder="Enter age (1–18)"
            min="1"
            max="18"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-4 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={formData.age}
            onChange={handleChange}
          />

          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>

          <select
            id="gender"
            name="gender"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-4 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>

            <option value="Male">Male</option>

            <option value="Female">Female</option>
          </select>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 hover:enabled:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Adding..." : "Add Child"}
          </button>
        </form>
      </div>
    </div>
  );
};;

export default Dashboard;
