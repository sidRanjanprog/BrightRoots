import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getChildById } from "../services/childService";

import {
  createScreenTime,
  getScreenTimes,
} from "../services/screenTimeService";

const ChildProfile = () => {
  const { id } = useParams();

  const [child, setChild] = useState(null);

  const [screenTimes, setScreenTimes] =
  useState([]);

  const [screenTimeData, setScreenTimeData] =
  useState({
    date: "",
    durationMinutes: "",
    activityType: "Educational",
  });

  const handleScreenTimeChange = (
    e
  ) => {
    setScreenTimeData({
      ...screenTimeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleScreenTimeSubmit = async (
    e
  ) => {
    e.preventDefault();
  
    try {
      const response =
        await createScreenTime({
          childId: child._id,
          ...screenTimeData,
        });
  
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

  useEffect(() => {
    fetchChild();
    fetchScreenTimes();
  }, [id]);

  if (!child) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Child Profile
      </h1>

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

      <form
        onSubmit={handleScreenTimeSubmit}
        className="bg-white p-6 rounded shadow mt-8"
      >
        <h2 className="text-2xl font-semibold mb-4">
          Add Screen Time
        </h2>

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
          <option value="Educational">
            Educational
          </option>

          <option value="Entertainment">
            Entertainment
          </option>

          <option value="Gaming">
            Gaming
          </option>

          <option value="Social Media">
            Social Media
          </option>

          <option value="Other">
            Other
          </option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Save Screen Time
        </button>
      </form>

      <div className="bg-white p-6 rounded shadow mt-8">
        <h2 className="text-2xl font-semibold mb-4">
          Screen Time Records
        </h2>

        {screenTimes.length === 0 ? (
          <p>No screen time records yet.</p>
        ) : (
          screenTimes.map((record) => (
            <div
              key={record._id}
              className="border p-4 rounded mb-3"
            >
              <p>
                <strong>Date:</strong>{" "}
                {new Date(
                  record.date
                ).toLocaleDateString()}
              </p>

              <p>
                <strong>Duration:</strong>{" "}
                {record.durationMinutes} mins
              </p>

              <p>
                <strong>Activity:</strong>{" "}
                {record.activityType}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChildProfile;