/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { createBooking } from "../../backend-services/bookingServices";

export default function ModalRoom({ isOpen, onClose, room }) {
  if (!isOpen) return null;

  // Utility to format dates into YYYY-MM-DD
  const formatDate = (date) =>
    date ? new Date(date).toISOString().split("T")[0] : "";

  const handleSubmit = async (data) => {
    try {
      // Prepare the booking data to send, including serviceType as 'Hotel'
      const bookingData = {
        type: data.type,
        availabilityFrom: data.availabilityFrom,
        availabilityTo: data.availabilityTo,
        pricePerNight: data.pricePerNight,
        roomId: room._id, // assuming route has an _id field
        serviceType: "Hotel", // Assuming you are always dealing with Hotel rooms
      };

      // Call the createBooking function with the updated booking data
      const response = await createBooking(
        room._id,
        "Hotel",
        room._id,
        "confirmed"
      ); // pass the correct parameters

      console.log("Booking created successfully:", response);
      // Optionally close the modal after successful booking creation
      onClose();
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div
      style={{
        scrollbarWidth: "none" /* Firefox */,
        msOverflowStyle: "none" /* IE 10+ */,
      }}
      className="fixed inset-0 opacity-1 bg-black/60 backdrop-blur-2xl flex justify-center items-center z-50 overflow-auto"
    >
      <div className="pt-[2rem] rounded-lg shadow-md shadow-white/50 p-6 w-[30rem] backdrop-blur-3xl bg-white/15">
        <h2 className="text-lg font-semibold mb-4 text-white/80 text-center">
          Room Details
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            console.log("Form Data:", data); // Debugging: Check the form data
            handleSubmit(data);
          }}
        >
          {/* -------------------------Type---------------------------- */}
          <div className="my-6">
            <select
              name="Type"
              defaultValue={room?.type}
              required
              className="w-full mt-1 backdrop-blur-none bg-transparent px-4 py-1 shadow-sm shadow-white/70 text-white/80 rounded-md focus:outline-none focus:ring-2 placeholder-white/70"
            >
              <option value="" disabled className="text-gray-500">
                Select Type
              </option>
              <option value="Single" className="text-black">
                Single
              </option>
              <option value="Double" className="text-black">
                Double
              </option>
              <option value="Family" className="text-black">
                Family
              </option>
            </select>
          </div>
          {/* ------------------------Price----------------------------- */}
          <div className="my-4">
            <input
              type="number"
              name="Price"
              defaultValue={room?.pricePerNight || ""}
              required
              placeholder="Price"
              className="w-full mt-1 backdrop-blur-none bg-transparent px-4 py-1 shadow-sm shadow-white/70 text-white/80 rounded-md focus:outline-none focus:ring-2 placeholder-white/70"
            />
          </div>
          {/* -----------------------From---------------------------- */}
          <p className="text-sm text-white/80 mt-6">From</p>
          <div className="flex gap-1 justify-between">
            <div className="mb-4">
              <input
                type="date"
                name="Fromd"
                defaultValue={formatDate(room?.availability.from)}
                required
                className="w-full mt-1 backdrop-blur-none bg-transparent px-4 py-1 shadow-sm shadow-white/70 text-white/80 rounded-md focus:outline-none focus:ring-2 placeholder-white/70"
              />
            </div>
            {/* <div className="mb-4">
              <input
                type="time"
                name="Fromt"
                required
                className="w-full mt-1 backdrop-blur-none bg-transparent px-4 py-1 shadow-sm shadow-white/70 text-white/80 rounded-md focus:outline-none focus:ring-2 placeholder-white/70"
              />
            </div> */}
          </div>

          {/* ---------------------------To------------------------ */}
          <p className="text-sm text-white/80 mt-3">To</p>
          <div className="flex gap-1 justify-between">
            <div className="mb-4">
              <input
                type="date"
                name="Tod"
                defaultValue={formatDate(room?.availability.to)}
                required
                className="w-full mt-1 backdrop-blur-none bg-transparent px-4 py-1 shadow-sm shadow-white/70 text-white/80 rounded-md focus:outline-none focus:ring-2 placeholder-white/70"
              />
            </div>
            {/* <div className="mb-4">
              <input
                type="time"
                name="Tot"
                required
                className="w-full mt-1 backdrop-blur-none bg-transparent px-4 py-1 shadow-sm shadow-white/70 text-white/80 rounded-md focus:outline-none focus:ring-2 placeholder-white/70"
              />
            </div> */}
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="status"
              defaultValue={room?.status || "confirmed"} // Default to 'confirmed' if no value is provided
              required
              placeholder="Booking Status"
              className="w-full mt-1 backdrop-blur-none bg-transparent px-4 py-1 shadow-sm shadow-white/70 text-white/80 rounded-md focus:outline-none focus:ring-2 placeholder-white/70"
            />
          </div>
          {/* ------------------------buttons----------------------- */}
          <div className="flex justify-center gap-12 space-x-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-white/20 shadow-sm border border-white/10 shadow-white/50 px-2 py-1 rounded hover:bg-gray-300 hover:text-black/80"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-white/20 shadow-sm border border-white/10 shadow-white/50 text-white px-2 py-1 rounded hover:bg-gray-300 hover:text-black/80"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
