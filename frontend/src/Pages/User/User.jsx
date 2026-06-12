import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";
import { GoMail } from "react-icons/go";
import { FaMapPin, FaPhoneAlt } from "react-icons/fa";

function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/users");
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-[78.9vh] p-5">

      <h1 className="text-2xl font-bold mb-5">Users List</h1>

    
      <div className="flex flex-wrap gap-5">

        {users.map((user) => (
          
            
            <div   key={user.id}  className="w-[245px] shadow-[0_0_4px_gray] p-4 rounded-lg flex flex-col gap-2 hover:shadow-mauve-600 transition">

              <h2 className="text-lg font-semibold">{user.name.firstname} {user.name.lastname}</h2>

              <p className="text-sm text-gray-600 flex justify-start items-center gap-2"> <GoMail className="text-blue-500 mt-1"/> {user.email}</p>

              <p className="text-sm flex justify-start items-center gap-2"><FaMapPin className="text-red-500"/> {user.address.city}</p>

              <p className="text-sm flex justify-start items-center gap-2"><FaPhoneAlt className="text-gray-400"/> {user.phone}</p>
              <Link to={`/users/${user.id}`} key={user.id}>
              <button className="bg-black w-full hover:bg-rose-600 text-white text-sm py-1 rounded mt-2">
                View Details
              </button>
              </Link>

            </div>

        ))}

      </div>

    </div>
  );
}

export default User;