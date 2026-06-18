import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getChildById } from "../services/childService";

const ChildProfile = () => {
  const { id } = useParams();

  const [child, setChild] = useState(null);

  const fetchChild = async () => {
    try {
      const data = await getChildById(id);

      console.log(data);

      setChild(data.child);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChild();
  }, []);

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
    </div>
  );
};

export default ChildProfile;