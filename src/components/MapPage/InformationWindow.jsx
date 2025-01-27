import React, { useEffect, useState } from "react";
import { useMapsLibrary, useMap } from "@vis.gl/react-google-maps";
import { FaStar, FaWalking, FaCar, FaCreditCard, FaArrowLeft } from "react-icons/fa";
import { PiPhoneCallLight } from "react-icons/pi";
import { CiClock2 } from "react-icons/ci";
import { FaGooglePay, FaApplePay } from "react-icons/fa";
import { RiVisaLine } from "react-icons/ri";
import { SiPhonepe } from "react-icons/si";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import Slider from "react-slick";
import useParkingStore from "./parkingStoreContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const InformationWindow = () => {
  const selectedParkingID = useParkingStore((state) => state.selectedParkingID);
  const isInfoWindowOpen = useParkingStore((state) => state.isInfoWindowOpen);
  const setInfoWindowOpen = useParkingStore((state) => state.setInfoWindowOpen);
  const [infoContent, setInfoContent] = useState(null);
  const placesLib = useMapsLibrary("places");
  const map = useMap();

  const settings = {
    dots: infoContent?.photos?.length > 1,
    infinite: infoContent?.photos?.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: infoContent?.photos?.length > 1,
  };

  const handleReturn = () => {
    setInfoWindowOpen(!isInfoWindowOpen);
  }

  useEffect(() => {
    if (!selectedParkingID) return;

    const service = new placesLib.PlacesService(map);
    service.getDetails(
      {
        placeId: selectedParkingID,
        fields: [
          "name",
          "rating",
          "photos",
          "formatted_address",
          "international_phone_number",
          "opening_hours",
        ],
      },
      (place, status) => {
        if (status === placesLib.PlacesServiceStatus.OK) {
          setInfoContent({
            name: place.name,
            rating: place.rating || "Not Available",
            photos: place.photos
              ? place.photos.map((photo) => photo.getUrl())
              : [],
            phone: place.international_phone_number || "Not Available",
            opening_hours: place.opening_hours || [],
          });
        }
      }
    );
  }, [selectedParkingID, placesLib]);

  if (!isInfoWindowOpen || !infoContent) return null;

  return (
    <div className="bg-white font-raleway relative shadow-2xl overflow-y-auto overflow-x-hidden max-h-screen w-full">
       <button
      onClick={() => setInfoWindowOpen(false)}
      className="absolute top-4 left-4 z-40 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
    >
      <FaArrowLeft className="w-5 h-5 text-white" />
    </button>
     
     
      {infoContent.photos && infoContent.photos.length > 0 && (
        <div className="w-full relative">
        <Slider {...settings}>
          {infoContent.photos.map((photo, index) => (
            <div key={index} className="w-full aspect-[4/3]">
              <img
                src={photo}
                alt={`${infoContent.name}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>
      )}

      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-800">
            {infoContent.name}
          </h2>
          <div className="flex items-center bg-blue-100 text-blue-800 px-4 py-2 text-lg  rounded-lg">
            <FaStar className="mr-2 sm:text-3xl text-yellow-500" />
            {infoContent.rating}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-5">
          <div className="flex items-center space-x-4">
            <FaWalking className="text-xl sm:text-3xl text-blue-600" />
            <span>15 min walk</span>
          </div>
          <div className="flex items-center space-x-4">
            <PiPhoneCallLight className="text-lg sm:text-3xl  text-green-600" />
            <span className="font-roboto">{infoContent.phone}</span>
          </div>
        </div>

        <div className="bg-blue-50 p-5">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-5 text-blue-800">
            Parking Reservation
          </h3>
          <div className="flex justify-between text-xl">
            <div className="text-center">
              <p className="text-gray-600">ENTRANCE</p>
              <p className="text-3xl font-bold font-noto">3:30 PM</p>
              <p className="text-lg text-gray-500 font-noto">Wed, 3 Jul</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600">EXIT</p>
              <p className="text-3xl font-bold font-noto">5:30 PM</p>
              <p className="text-lg text-gray-500 font-noto">Wed, 3 Jul</p>
            </div>
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-5 text-2xl hover:bg-blue-700 transition-colors">
          BOOK NOW
        </button>

        <div className="bg-gray-50 p-5">
          <h3 className="text-3xl font-semibold mb-5">Pricing</h3>
          <div className="grid grid-cols-3 gap-4 text-center text-xl font-noto">
            <div className="">
              <p className="font-bold">1 Hour</p>
              <p className="text-blue-600">₹40</p>
            </div>
            <div>
              <p className="font-bold">2 Hours</p>
              <p className="text-blue-600">₹70</p>
            </div>
            <div>
              <p className="font-bold">3 Hours</p>
              <p className="text-blue-600">₹100</p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <h3 className="text-xl sm:text-3xl font-semibold">Amenities</h3>
          <div className="grid grid-cols-2 gap-5 sm:text-lg">
            <div className="flex items-center space-x-4">
              <CiClock2 className="text-3xl text-blue-600" />
              <span>24/7 Operation</span>
            </div>
            <div className="flex items-center space-x-4">
              <FaCreditCard className="text-3xl text-green-600" />
              <span>Multiple Payments</span>
            </div>
            <div className="flex items-center space-x-4">
              <FaCar className="text-3xl text-gray-600" />
              <span>Outside Parking</span>
            </div>
            <div className="flex items-center space-x-4">
              <VscWorkspaceTrusted className="text-3xl text-blue-600" />
              <span>24/7 Security</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
  <h3 className="text-lg sm:text-2xl font-semibold mb-4">Payment Methods</h3>
  
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
    {[
      { icon: <FaGooglePay/>, name: 'Google Pay', color: 'text-green-600' },
      { icon: <SiPhonepe/>, name: 'PhonePe', color: 'text-purple-600' },
      { icon: <RiVisaLine/>, name: 'Visa', color: 'text-blue-700' },
      { icon: <FaCreditCard/>, name: 'Card', color: 'text-gray-700' }
    ].map((method) => (
      <div key={method.name} 
        className="flex items-center justify-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
        <div className={`text-3xl sm:text-4xl ${method.color}`}>
          {method.icon}
        </div>
      </div>
    ))}
  </div>
</div>
      </div>



    </div>
  );
};

export default InformationWindow;
