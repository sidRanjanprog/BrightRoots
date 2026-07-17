const DeleteChildModal = ({ child, isDeleting, onCancel, onDelete }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900">Delete Child</h2>
        <p className="mt-4 text-gray-600 leading-relaxed">
          Are you sure you want to permanently delete <strong>{child.name}</strong>'s profile?
          <br />
          <br />
          This action cannot be undone.
        </p>
        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            disabled={isDeleting}
            onClick={onCancel}
            className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isDeleting}
            onClick={onDelete}
            className="bg-red-600 hover:enabled:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteChildModal;
