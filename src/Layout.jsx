import { Link } from "wasp/client/router";
import { useAuth, logout } from "wasp/client/auth";
import { Outlet } from "react-router-dom";
import "./Main.css";

export const Layout = () => {
  const { data: user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary-800 text-white p-4">
        <div className="container mx-auto px-4 py-2 flex justify-between">
          <Link to="/">
            <h1 className="text-xl2 font-semibold">HouseOfHope</h1>
          </Link>
          { user ? (
            <span>
              Hi, {user.identities.username?.id}!{' '}
              <button onClick={logout} className="text-xl2 underline">
                (Log out)
              </button>
            </span>
          ) : (
            <Link to="/login">
              <h1 className="text-xl2 underline">Log in</h1>
            </Link>
          )}
        </div>
      </header>
      <main className="container mx-auto px-4 py-2 flex-grow">
        <Outlet />
      </main>
      <footer>
        <div className="container mx-auto p-4">
          <p className="text-center text-gray-500 text-sm">
            HouseOfHope ~ Powered by Wasp
          </p>
        </div>
      </footer>
    </div>
  );
};