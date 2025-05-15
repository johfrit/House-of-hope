import React from 'react';
import { useQuery, useAction } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';
import { getNearbyOrphanages, markDonation } from 'wasp/client/operations';

const DonorDashboard = () => {
  const { data: orphanages, isLoading, error } = useQuery(getNearbyOrphanages, { location: 'your-location' });
  const markDonationFn = useAction(markDonation);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleMarkDonation = (needId, donorId) => {
    markDonationFn({ needId, donorId });
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Nearby Orphanages</h1>
      {orphanages.map((orphanage) => (
        <div key={orphanage.id} className='mb-6'>
          <h2 className='text-xl font-semibold'>{orphanage.name}</h2>
          <p className='text-gray-600'>{orphanage.location}</p>
          <div className='mt-4'>
            {orphanage.needs.map((need) => (
              <div key={need.id} className='flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-2'>
                <div>
                  <p className='font-medium'>{need.itemName}</p>
                  <p>Quantity: {need.quantity}</p>
                  <p>Urgency: {need.urgencyLevel}</p>
                </div>
                <button
                  onClick={() => handleMarkDonation(need.id, 'your-donor-id')}
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                >
                  Mark as Donated
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DonorDashboard;
