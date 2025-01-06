import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";
import DashBoard from "./components/DashBoard";
import TravelCompany from "./components/Admin/TravelCompany";
import AdminProfile from "./components/Admin/AdminProfile";
import Rootes from "./components/Admin/Rootes";
import Hotels from "./components/Admin/Hotels";
import Room from "./components/Admin/Room";
import Passenger from "./components/Admin/Passenger";
import Rootes_Room from "./components/Admin/Rootes_Room";
import DashBoardTravel from "./components/DashBoardTravel";
import TravelProfile from "./components/Travel/TravelProfile";
import RootesT from "./components/Travel/RootesT";
import DashBoardHotel from "./components/DashBoardHotel";
import HotelProfile from "./components/Hotel/HotelProfile";
import RoomH from "./components/Hotel/RoomH";
import DashBoardPassenger from "./components/DashBoardPassenger";
import PassengerProfile from "./components/Passenger/PassengerProfile";
import TravelP from "./components/Passenger/TravelP";
import HotelP from "./components/Passenger/HotelP";
import DetailsP from "./components/Passenger/DetailsP";
// import axios from "axios";
import BookingSummary from './components/Passenger/BookingSummary';
import RoomBookingSummary from './components/Passenger/RoomBookingSummary';

function App() {
  // Add connect to Backend
  // axios.defaults.withCredentials = true;
  // axios.defaults.baseURL = "";

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard Route */}
        <Route path="/DashboardAdmin/*" element={<DashBoard />}>
          {/* Nested Routes under Dashboard */}
          <Route path="admin" element={<AdminProfile />} />
          <Route path="travelCompany" element={<TravelCompany />} />

          {/* Nested-in-Nested Routes for Rootes */}
          <Route path="rootes/*" element={<Rootes />}>
            <Route
              path="FaisalMovers"
              element={<Rootes_Room cmpnyName="Faisal Movers" />}
            />
            <Route
              path="DaewooExpress"
              element={<Rootes_Room cmpnyName="Daewoo Express" />}
            />
            <Route
              path="RoadMaster"
              element={<Rootes_Room cmpnyName="Road Master" />}
            />
            <Route
              path="NiaziExpress"
              element={<Rootes_Room cmpnyName="Niazi Express" />}
            />
            <Route
              path="QConnect"
              element={<Rootes_Room cmpnyName="Q Connect" />}
            />
            <Route
              path="Skyways"
              element={<Rootes_Room cmpnyName="Skyways" />}
            />
            <Route
              path="WaraichExpress"
              element={<Rootes_Room cmpnyName="Waraich Express" />}
            />
            {/* Default Route */}
            <Route
              index
              element={<Rootes_Room cmpnyName="Default Company" />}
            />
          </Route>

          <Route path="hotels" element={<Hotels />} />
          <Route path="rooms/*" element={<Room />}>
            <Route
              path="Hunza_Serena_Inn"
              element={
                <Rootes_Room
                  cmpnyName="Hunza Serena Inn"
                  rt1="Room3"
                  rt2="Room5"
                  rt3="Room4"
                />
              }
            />
            <Route
              path="Islamabad_Serena_Hotel"
              element={
                <Rootes_Room
                  cmpnyName="Islamabad Serena Hotel"
                  rt1="Room11"
                  rt2="Room112"
                  rt3="Room34"
                />
              }
            />
            <Route
              path="Gilgit_Serena_Hotel"
              element={
                <Rootes_Room
                  cmpnyName="Gilgit Serena Hotel"
                  rt1="Room17"
                  rt2="Room147"
                  rt3="Room97"
                />
              }
            />
            <Route
              path="Faisalabad_Serena_Hotel"
              element={
                <Rootes_Room
                  cmpnyName="Faisalabad Serena Hotel"
                  rt1="Room1167"
                  rt2="Room114"
                  rt3="Room193"
                />
              }
            />
            <Route
              path="Serena_Khaplu_Palace"
              element={
                <Rootes_Room
                  cmpnyName="Serena Khaplu Palace"
                  rt1="Room52"
                  rt2="Room78"
                  rt3="Room190"
                />
              }
            />
            <Route
              path="Swat_Serena_Hotel"
              element={
                <Rootes_Room
                  cmpnyName="Swat Serena Hotel"
                  rt1="Room83"
                  rt2="Room94"
                  rt3="Room96"
                />
              }
            />
            <Route
              path="Quetta_Serena_Hotel"
              element={
                <Rootes_Room
                  cmpnyName="Quetta Serena Hotel"
                  rt1="Room56"
                  rt2="Room78"
                  rt3="Room73"
                />
              }
            />
          </Route>
          <Route path="passengers" element={<Passenger />} />
        </Route>

        {/* Travel Dashboard Route */}
        <Route path="/DashboardTravel/*" element={<DashBoardTravel />}>
          <Route path="travel" element={<TravelProfile />} />
          <Route path="RootesT" element={<RootesT />} />
        </Route>
        {/* Hotel Dashboard  */}
        <Route path="/DashboardHotel/*" element={<DashBoardHotel />}>
          <Route path="Hotel" element={<HotelProfile />} />
          <Route path="RootesT" element={<RoomH />} />
        </Route>
        <Route path="/booking-summary" element={<BookingSummary />} />
        <Route path="/room-booking-summary" element={<RoomBookingSummary />} />


        {/* Passenger Dashboard  */}
        <Route path="/DashboardPassenger/*" element={<DashBoardPassenger />}>
          <Route path="passenger" element={<PassengerProfile />} />
          <Route path="travelP" element={<TravelP />} />
          <Route path="hotelP" element={<HotelP />} />
          <Route path="detailsP" element={<DetailsP />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
