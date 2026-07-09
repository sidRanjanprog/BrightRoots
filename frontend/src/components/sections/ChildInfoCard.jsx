const ChildInfoCard = ({ child }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p className="text-sm font-medium text-gray-500">Name</p>
          <p className="text-lg font-semibold text-gray-800 mt-1">{child.name}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">Age</p>
          <p className="text-lg font-semibold text-gray-800 mt-1">{child.age} Years</p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">Gender</p>
          <p className="text-lg font-semibold text-gray-800 mt-1">{child.gender}</p>
        </div>
      </div>
    </div>
  );
};

export default ChildInfoCard;
