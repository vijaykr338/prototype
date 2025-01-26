import React, { useState, useEffect } from "react";
import logo from "./file.png";
import { auth } from "../../config/firebaseconfig";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup the listener when the component unmounts
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (e) {
      console.log("Error signing out", e);
    }
  };

  return (
    <div className="sticky flex justify-between items-center sm:mx-4 sm:my-2 rounded-lg">
      <div className="flex items-center">
        <img src={logo} className="h-28" alt="logo" />
      </div>

      <div
        className="sm:hidden flex items-center mr-10"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className="space-y-2">
          <span className="block w-8 h-0.5 bg-black"></span>
          <span className="block w-8 h-0.5 bg-black"></span>
          <span className="block w-8 h-0.5 bg-black"></span>
        </div>
      </div>

      <div
        className={`absolute top-full left-0 w-full bg-white shadow-md py-5 px-6 ${
          isMenuOpen ? "block" : "hidden"
        } sm:hidden`}
      >
        <ul className="flex flex-col space-y-4">
          <li>Company</li>
          <li>Contact</li>
          {user ? (
            <li>
              <button
                className="w-full text-xl py-2 rounded-full text-white font-extrabold"
                style={{ backgroundColor: "#000A62" }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <button
                  className="w-full text-xl py-2 rounded-full text-white font-extrabold"
                  style={{ backgroundColor: "#000A62" }}
                >
                  <Link to={"/signup"}>SIGN UP</Link>
                </button>
              </li>
              <li>
                <button
                  className="w-full text-xl py-2 rounded-full font-extrabold border-black border-2 border-solid"
                  style={{ color: "#000A62" }}
                >
                  <Link to={"/login"}>LOG IN</Link>
                </button>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="hidden sm:flex space-x-8">
        <ul className="flex text-2xl py-4 space-x-14 mr-7">
          <li>Company</li>
          <li>Contact</li>
        </ul>

        {user ? (
          <button
            className="text-xl px-12 py-4 rounded-full text-white font-extrabold"
            style={{ backgroundColor: "#000A62" }}
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <>
            <button
              className="text-xl px-12 py-4 rounded-full text-white font-extrabold"
              style={{ backgroundColor: "#000A62" }}
            >
              <Link to={"/signup"}>SIGN UP</Link>
            </button>
            <button
              className="text-xl px-12 py-4 rounded-full font-extrabold border-black border-2 border-solid"
              style={{ color: "#000A62" }}
            >
              <Link to={"/login"}>LOGIN</Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
