import { useState } from "react";

import { updateChild } from "../../services/childService";
import { toast } from "react-toastify";

const EditChildForm = ({ child, onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: child.name,
    age: child.age,
    gender: child.gender,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

      await updateChild(child._id, formData);

      toast.success("Child updated successfully!");

      onSuccess();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to update child");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-800">Edit Child</h2>

      <p className="text-gray-500 mt-2 mb-6">Update your child's basic information.</p>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Child Name
        </label>

        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          maxLength={100}
          spellCheck={false}
          required
          autoFocus
          className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-4 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />

        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
          Age
        </label>

        <input
          id="age"
          type="number"
          name="age"
          min="1"
          max="18"
          value={formData.age}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-4 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />

        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
          Gender
        </label>

        <select
          id="gender"
          name="gender"
          required
          value={formData.gender}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 mb-4 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option value="">Select Gender</option>

          <option value="Male">Male</option>

          <option value="Female">Female</option>
        </select>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={onCancel}
          className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Cancel
        </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 hover:enabled:bg-green-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditChildForm;
