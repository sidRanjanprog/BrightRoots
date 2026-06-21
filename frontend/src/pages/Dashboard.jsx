import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getChildren, createChild } from "../services/childService";

import { getDashboardInsights } from "../services/recommendationService";

const Dashboard = () => {
  const [children, setChildren] = useState([]);
  const [dashboardInsights, setDashboardInsights] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchChildren = async () => {
    try {
      const data = await getChildren();

      console.log(data);

      setChildren(data.children);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDashboardInsights = async () => {
    try {
      const data = await getDashboardInsights();

      console.log(data);

      setDashboardInsights(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.name.trim()) {
        alert("Child name is required");
        return;
      }

      if (Number(formData.age) < 1 || Number(formData.age) > 18) {
        alert("Age must be between 1 and 18");
        return;
      }

      if (!formData.gender) {
        alert("Please select a gender");
        return;
      }
      const response = await createChild(formData);

      console.log(response);

      await fetchChildren();

      setFormData({
        name: "",
        age: "",
        gender: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChildren();
    fetchDashboardInsights();
  }, []);

  console.log("Children State:", children);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow mb-8"
      >
        <h2 className="text-2xl font-semibold mb-4">Add Child</h2>

        <input
          type="text"
          name="name"
          placeholder="Child Name"
          className="w-full border p-3 mb-4 rounded"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          className="w-full border p-3 mb-4 rounded"
          value={formData.age}
          onChange={handleChange}
        />

        <select
          name="gender"
          className="w-full border p-3 mb-4 rounded"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>

          <option value="Male">Male</option>

          <option value="Female">Female</option>
        </select>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          Add Child
        </button>
      </form>

      {dashboardInsights && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-100 p-4 rounded shadow">
            <h3 className="font-semibold">Total Children</h3>

            <p className="text-3xl font-bold">
              {dashboardInsights.totalChildren}
            </p>
          </div>

          <div className="bg-green-100 p-4 rounded shadow">
            <h3 className="font-semibold">Avg Wellness</h3>

            <p className="text-3xl font-bold">
              {dashboardInsights.averageWellnessScore}
            </p>
          </div>

          <div className="bg-red-100 p-4 rounded shadow">
            <h3 className="font-semibold">Highest Risk Child</h3>

            <p className="text-xl font-bold">
              {dashboardInsights.highestRiskChild || "None"}
            </p>
          </div>

          <div className="bg-yellow-100 p-4 rounded shadow">
            <h3 className="font-semibold">Avg Screen Time</h3>

            <p className="text-2xl font-bold">
              {dashboardInsights.averageScreenTime} mins
            </p>
          </div>

          <div className="bg-purple-100 p-4 rounded shadow">
            <h3 className="font-semibold">Avg Sleep</h3>

            <p className="text-2xl font-bold">
              {dashboardInsights.averageSleep} hrs
            </p>
          </div>

          <div className="bg-orange-100 p-4 rounded shadow">
            <h3 className="font-semibold">Avg Outdoor Time</h3>

            <p className="text-2xl font-bold">
              {dashboardInsights.averageOutdoorTime} mins
            </p>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Children</h2>

        {children.length === 0 ? (
          <p>No children added yet.</p>
        ) : (
          children.map((child) => (
            <div key={child._id} className="border p-4 rounded mb-4 shadow-sm">
              <p>
                <strong>Name:</strong> {child.name}
              </p>

              <p>
                <strong>Age:</strong> {child.age}
              </p>

              <p>
                <strong>Gender:</strong> {child.gender}
              </p>

              <button
                onClick={() => navigate(`/dashboard/child/${child._id}`)}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
              >
                View Profile
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
