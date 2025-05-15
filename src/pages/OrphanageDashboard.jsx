import React, { useState } from 'react';
import { useQuery, useAction } from 'wasp/client/operations';
import { getOrphanageNeeds, createNeed, updateNeed, deleteNeed } from 'wasp/client/operations';

const OrphanageDashboard = () => {
  const { data: needs, isLoading, error } = useQuery(getOrphanageNeeds, { orphanageId: 1 }); // Replace with actual orphanageId
  const createNeedFn = useAction(createNeed);
  const updateNeedFn = useAction(updateNeed);
  const deleteNeedFn = useAction(deleteNeed);

  const [newNeed, setNewNeed] = useState({ itemName: '', quantity: 0, urgencyLevel: '' });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateNeed = () => {
    createNeedFn({ ...newNeed, orphanageId: 1 }); // Replace with actual orphanageId
    setNewNeed({ itemName: '', quantity: 0, urgencyLevel: '' });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Orphanage Needs Dashboard</h1>
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl mb-2">Add New Need</h2>
        <input
          type="text"
          placeholder="Item Name"
          className="border rounded p-2 mb-2 w-full"
          value={newNeed.itemName}
          onChange={(e) => setNewNeed({ ...newNeed, itemName: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          className="border rounded p-2 mb-2 w-full"
          value={newNeed.quantity}
          onChange={(e) => setNewNeed({ ...newNeed, quantity: parseInt(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Urgency Level"
          className="border rounded p-2 mb-2 w-full"
          value={newNeed.urgencyLevel}
          onChange={(e) => setNewNeed({ ...newNeed, urgencyLevel: e.target.value })}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCreateNeed}
        >
          Add Need
        </button>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Current Needs</h2>
        {needs.map((need) => (
          <div key={need.id} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 flex justify-between items-center">
            <div>
              <p><strong>Item:</strong> {need.itemName}</p>
              <p><strong>Quantity:</strong> {need.quantity}</p>
              <p><strong>Urgency:</strong> {need.urgencyLevel}</p>
            </div>
            <div>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={() => deleteNeedFn({ needId: need.id })}
              >
                Delete
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => updateNeedFn({ needId: need.id, itemName: need.itemName, quantity: need.quantity, urgencyLevel: need.urgencyLevel })}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrphanageDashboard;
