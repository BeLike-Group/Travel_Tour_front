/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "./backend-services/authServices";
export default function Sidebar(props) {
  useEffect(() => {
    const t1 = gsap.timeline();
    t1.to("#prp1", { duration: 0, y: -50, opacity: 0 });
    // t1.to("#prp2", { duration: 0, y: -100, opacity: 0 });
    t1.to("#prp3", { duration: 0, y: -150, opacity: 0 });
    // t1.to("#prp4", { duration: 0, y: -200, opacity: 0 });
    t1.to("#prp5", { duration: 0, y: -250, opacity: 0 });
    t1.to("#prp6", { duration: 0, y: -250, opacity: 0 });

    const t2 = gsap.timeline();
    t2.to("#prp1", { duration: 0.5, y: 10, opacity: 1 });
    // t2.to("#prp2", { duration: 0.6, y: 20, opacity: 1 });
    t2.to("#prp3", { duration: 0.9, y: 30, opacity: 1 });
    // t2.to("#prp4", { duration: 1.2, y: 40, opacity: 1 });
    t2.to("#prp5", { duration: 1.5, y: 50, opacity: 1 });
    t2.to("#prp6", { duration: 1.5, y: 50, opacity: 1 });
  }, []);

  const navigate = useNavigate();

  // Handle Logout Users
  const handleLogout = async () => {
    try {
      await logoutUser(); // Call the logoutUser function
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div>
      <div className="flex-1 bg-transparent m-3 rounded-lg py-3 px-6  ">
        <p className="text-2xl font-semibold font-sans text-white">Quick As</p>
        {/* -----------------changing by props------------------------- */}
        <div className="text-white text-lg my-8 text-center">
          <p
            onClick={() => {
              navigate("admin");
            }}
            className="p-2 hover:cursor-pointer rounded-2xl my-3 backdrop-blur-sm bg-white/10  hover:shadow-md hover:shadow-black/40 active:shadow-md active:shadow-black/40"
          >
            {props.type} Profile
          </p>
          <div
            onClick={() => {
              navigate("travelCompany");
            }}
            id="prp1"
            className="p-2 px-10 backdrop-blur-sm bg-white/20  rounded-2xl my-3 cursor-pointer text-white hover:shadow-md hover:shadow-black/40"
          >
            <p>{props.prp1}</p>
          </div>
          {/* <div
            id="prp2"
            onClick={() => {
              navigate("rootes");
            }}
            className="p-2 backdrop-blur-sm bg-white/20  rounded-2xl my-3 cursor-pointer hover:shadow-md hover:shadow-black/40 active:shadow-md active:shadow-black/40"
          >
            <p>{props.prp2}</p>
          </div> */}
          <div
            id="prp3"
            onClick={() => {
              navigate("hotels");
            }}
            className="p-2 backdrop-blur-sm bg-white/20  rounded-2xl my-3 cursor-pointer hover:shadow-md hover:shadow-black/40 active:shadow-md active:shadow-black/40"
          >
            <p>{props.prp3}</p>
          </div>
          {/* <div
            id="prp4"
            onClick={() => {
              navigate("rooms");
            }}
            className="p-2 backdrop-blur-sm bg-white/20  rounded-2xl my-3 cursor-pointer hover:shadow-md hover:shadow-black/40 active:shadow-md active:shadow-black/40"
          >
            <p>{props.prp4}</p>
          </div> */}
          <div
            id="prp5"
            onClick={() => {
              navigate("passengers");
            }}
            className="p-2 backdrop-blur-sm bg-white/20  rounded-2xl my-3 cursor-pointer hover:shadow-md hover:shadow-black/40 active:shadow-md active:shadow-black/40"
          >
            <p>{props.prp5}</p>
          </div>
          <div
            id="prp6"
            onClick={handleLogout}
            className="p-2 backdrop-blur-sm bg-white/20  rounded-2xl my-3 cursor-pointer hover:shadow-md hover:shadow-black/40 active:shadow-md active:shadow-black/40"
          >
            <p>{props.prp6}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
