
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/axios";
import { LuCross } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate =useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get(`/users/${id}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-[78vh] flex justify-center items-center bg-gray-100 p-5">

      <div className="bg-white shadow-lg rounded-lg p-6 w-[400px] flex flex-col gap-3">
        <div className=" flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold  ">
          User Details
        </h1>
        <RxCross2 onClick={() => navigate("/user")} size={20} className="hover:text-rose-500 cursor-pointer shadow-gray-800"/>
            
        </div>

        <p><span className="font-semibold">Name:</span> {user.name.firstname} {user.name.lastname}</p>

        <p><span className="font-semibold">Username:</span> {user.username}</p>

        <p><span className="font-semibold">Email:</span> {user.email}</p>

        <p><span className="font-semibold">Phone:</span> {user.phone}</p>

        <p>
          <span className="font-semibold">Address:</span><br />
          {user.address.number}, {user.address.street},<br />
          {user.address.city}, {user.address.zipcode}
        </p>

      </div>

    </div>
  );
}

export default UserDetails
