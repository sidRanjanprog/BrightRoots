import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getChildById } from "../services/childService";

import {
  createScreenTime,
  getScreenTimes,
} from "../services/screenTimeService";

import {
  createSleep,
  getSleepRecords,
} from "../services/sleepService";

import {
  createOutdoorActivity,
  getOutdoorActivities,
} from "../services/outdoorActivityService";

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

  const [sleepRecords, setSleepRecords] =
  useState([]);

  const [sleepData, setSleepData] =
  useState({
    date: "",
    sleepHours: "",
    sleepQuality: "Good",
  });

  const [outdoorActivities, setOutdoorActivities] =
  useState([]);

  const [outdoorData, setOutdoorData] =
  useState({
    date: "",
    activityType: "",
    durationMinutes: "",
  });

  const handleScreenTimeChange = (
    e
  ) => {
    setScreenTimeData({
      ...screenTimeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSleepChange = (
    e
  ) => {
    setSleepData({
      ...sleepData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOutdoorChange = (
    e
  ) => {
    setOutdoorData({
      ...outdoorData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSleepSubmit = async (
    e
  ) => {
    e.preventDefault();
  
    try {
      const response =
        await createSleep({
          childId: child._id,
          ...sleepData,
        });
  
      console.log(response);

      fetchSleepRecords();
  
      setSleepData({
        date: "",
        sleepHours: "",
        sleepQuality: "Good",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleOutdoorSubmit = async (
  e
) => {
  e.preventDefault();

  try {
    const response =
      await createOutdoorActivity({
        childId: child._id,
        ...outdoorData,
      });

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

  const fetchSleepRecords = async () => {
    try {
      const data =
        await getSleepRecords(id);
  
      console.log(data);
  
      setSleepRecords(
        data.sleepRecords
      );
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOutdoorActivities = async () => {
    try {
      const data =
        await getOutdoorActivities(id);

      console.log(data);

      setOutdoorActivities(
        data.activities
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChild();
    fetchScreenTimes();
    fetchSleepRecords();
    fetchOutdoorActivities;
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

      <form 
        onSubmit={handleSleepSubmit}
        className="bg-white p-6 rounded shadow mt-8"
      >
        <h2 className="text-2xl font-semibold mb-4">
          Add Sleep Record
        </h2>

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
          <option value="Excellent">
            Excellent
          </option>

          <option value="Good">
            Good
          </option>

          <option value="Average">
            Average
          </option>

          <option value="Poor">
            Poor
          </option>
        </select>

        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-3 rounded"
        >
          Save Sleep Record
        </button>
      </form>

      <div className="bg-white p-6 rounded shadow mt-8">
        <h2 className="text-2xl font-semibold mb-4">
          Sleep History
        </h2>

        {sleepRecords.length === 0 ? (
          <p>No sleep records yet.</p>
        ) : (
          sleepRecords.map((record) => (
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
                <strong>Sleep Hours:</strong>{" "}
                {record.sleepHours}
              </p>

              <p>
                <strong>Quality:</strong>{" "}
                {record.sleepQuality}
              </p>
            </div>
          ))
        )}
      </div>

      <form
        onSubmit={handleOutdoorSubmit}
        className="bg-white p-6 rounded shadow mt-8">

        <h2 className="text-2xl font-semibold mb-4">
          Add Outdoor Activity
        </h2>

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
          className="bg-orange-600 text-white px-6 py-3 rounded"
        >
          Save Outdoor Activity
        </button>
      </form>

      <div className="bg-white p-6 rounded shadow mt-8">
        <h2 className="text-2xl font-semibold mb-4">
          Outdoor Activity History
        </h2>

        {outdoorActivities.length === 0 ? (
          <p>No outdoor activities yet.</p>
        ) : (
          outdoorActivities.map((activity) => (
            <div
              key={activity._id}
              className="border p-4 rounded mb-3"
            >
              <p>
                <strong>Date:</strong>{" "}
                {new Date(
                  activity.date
                ).toLocaleDateString()}
              </p>

              <p>
                <strong>Activity:</strong>{" "}
                {activity.activityType}
              </p>

              <p>
                <strong>Duration:</strong>{" "}
                {activity.durationMinutes} mins
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChildProfile;