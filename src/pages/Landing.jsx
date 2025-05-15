import React from 'react';
import { Link } from 'wasp/client/router';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">Welcome to House of Hope</h1>
      <p className="text-lg mb-8 text-center max-w-xl">
        Our mission is to connect orphanages with donors to fulfill urgent needs and bring hope to those who need it most. Join us in making a difference.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Log In
        </Link>
        <Link
          to="/signup"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
