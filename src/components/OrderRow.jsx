export default function OrderRow({ order, onStatusChange, onCancel }) {
  const { _id, name, userEmail, bicyclenumber, rentalType, startTime, endTime, totalCost, status } = order;

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex justify-between items-start">
        <div>
          <p><strong>User:</strong> {name} ({userEmail})</p>
          <p><strong>Bike #:</strong> {bicyclenumber}</p>
          <p><strong>Rental:</strong> {rentalType}</p>
          <p><strong>Start:</strong> {new Date(startTime).toLocaleString()}</p>
          {endTime && <p><strong>End:</strong> {new Date(endTime).toLocaleString()}</p>}
          <p><strong>Cost:</strong> LKR {totalCost}</p>
        </div>

        <div className="flex flex-col space-y-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              status === 'active' ? 'bg-yellow-100 text-yellow-800' :
              status === 'completed' ? 'bg-green-100 text-green-800' :
              status === 'cancelled' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}
          >
            {status}
          </span>

          {status === 'active' && (
            <>
              <button
                onClick={() => onStatusChange(_id, 'completed')}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
              >
                Complete
              </button>
              <button
                onClick={() => onCancel(_id)}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}