import React from 'react';
import { useQuery } from 'wasp/client/operations';
import { getNearbyOrphanages } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const MapPage = () => {
  const { data: orphanages, isLoading, error } = useQuery(getNearbyOrphanages, { location: 'currentLocation' });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Orphanages Map</h1>
      <div className="bg-gray-100 rounded-lg p-4">
        {/* Map placeholder, replace with actual map implementation */}
        <div className="w-full h-96 bg-gray-300">Map goes here</div>
        <ul className="mt-4">
          {orphanages.map(orphanage => (
            <li key={orphanage.id} className="mb-2">
              <div className="flex justify-between items-center bg-white p-2 rounded shadow">
                <div>
                  <p className="font-semibold">{orphanage.name}</p>
                  <p className="text-sm text-gray-600">{orphanage.location}</p>
                </div>
                <Link to={`/orphanage/${orphanage.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                  View Details
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapPage;
