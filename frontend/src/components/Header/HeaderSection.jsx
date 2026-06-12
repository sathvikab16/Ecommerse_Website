import React, { useState, useRef, useEffect } from 'react'; // ✅ NEW: added useRef & useEffect
import { BiLogOut } from 'react-icons/bi';
import { LuUser } from 'react-icons/lu';
import { NavLink, Link, useNavigate } from 'react-router-dom';

function HeaderSection() {

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  // ✅ NEW: create reference for dropdown
  const menuRef = useRef();

  // ✅ NEW: close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // if click is outside the menu
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false); // close menu
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className='flex justify-between items-center p-5 border-b border-gray-300'>

      <h1 className='text-2xl font-semibold'>E-Commerce</h1>

      <div className='flex gap-8 items-center'>

        {["/", "/products", "/cart", "/users"].map((path, index) => {
          const names = ["Home", "Products", "Cart", "Users"];

          return (
            <NavLink
              to={path}
              key={index}
              end={path === "/"}
              className={({ isActive }) => `relative pb-1 
                ${isActive ? "text-rose-600" : "hover:text-gray-400"} 
                after:content-[''] after:absolute after:left-0 after:bottom-0 
                after:h-[3px] after:w-0 after:bg-rose-500 
                after:transition-all after:duration-300 
                hover:after:w-full 
                ${isActive ? "after:w-full" : ""}`}
            >
              {names[index]}
            </NavLink>
          );
        })}

        {/* ✅ LOGIN BUTTON (when NOT logged in) */}
        {!token ? (
          <Link to="/signin">
            <button className='bg-blue-500 text-white px-6 py-2 rounded-lg'>
              Login
            </button>
          </Link>
        ) : (
          // ✅ WRAP icon + dropdown with ref (IMPORTANT)
          <div className='relative' ref={menuRef}>

            {/* USER ICON */}
            <div
              onClick={() => setShowMenu(!showMenu)}
              className='border w-10 h-10 flex justify-center items-center rounded-full cursor-pointer hover:bg-rose-400 hover:text-white'
            >
              <LuUser className='text-xl' />
            </div>

            {/* DROPDOWN MENU */}
            {showMenu && (
              <div className='absolute right-0 mt-6 shadow-lg rounded p-4 w-40 z-50 bg-gray-200'>

                <p className='text-sm mb-2'>
                  User: {user}
                </p>

                <button
                  onClick={logout}
                  className='bg-rose-500 text-white px-3 py-1 rounded w-full flex items-center gap-2'
                >
                  <BiLogOut className='text-[18px]' /> Logout
                </button>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default HeaderSection; 