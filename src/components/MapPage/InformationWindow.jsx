import { useMapsLibrary } from '@vis.gl/react-google-maps';
import React, { useEffect, useState } from 'react';
import useParkingStore from './parkingStoreContext';
import { useMap } from '@vis.gl/react-google-maps';
import { FaStar } from "react-icons/fa6";
import { FaWalking } from "react-icons/fa";
import { PiPhoneCallLight } from "react-icons/pi";
import { CiClock2 } from "react-icons/ci";
import { FaCreditCard } from "react-icons/fa";
import { FaGooglePay } from "react-icons/fa";
import { FaApplePay } from "react-icons/fa";
import { RiVisaLine } from "react-icons/ri";
import Slider from 'react-slick'; // Ensure you have this import
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SiPhonepe } from "react-icons/si";
import { FaCar } from "react-icons/fa6";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { MdCurrencyRupee } from "react-icons/md";
import { Link } from 'react-router-dom';


const InformationWindow = () => {
  const selectedParkingID = useParkingStore((state) => state.selectedParkingID);
  const isInfoWindowOpen = useParkingStore((state) => state.isInfoWindowOpen)
  const [infoContent, setInfoContent] = useState(null);
  const placesLib = useMapsLibrary("places");
  const map = useMap();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };


  useEffect(() => {
    if (!selectedParkingID) return;

    const service = new placesLib.PlacesService(map);

    service.getDetails(
      {
        placeId: selectedParkingID,
        fields: ["name", "rating", "review", "photos", "formatted_address", "international_phone_number", "opening_hours"]
      }, (place, status) => {
        console.log(place)
        if (status === placesLib.PlacesServiceStatus.OK) {
          setInfoContent({
            name: place.name,
            address: place.formatted_address,
            rating: place.rating ? place.rating : "Not Available",
            photos: place.photos ? place.photos.map((photo) => photo.getUrl()) : [],
            international_phone_number: place.international_phone_number ? place.international_phone_number : "Not Available",
            opening_hours: place.opening_hours ? place.opening_hours : [],
          });
          console.log(infoContent)
        } else {
          console.error("Failed to fetch place details:", status);
        }
      }
    );
  }, [selectedParkingID, placesLib]);

  if (!isInfoWindowOpen) return null;

  return (
    <div className='overflow-y-auto h-screen font-roboto'>
      {infoContent ? (
        <div className='flex flex-col space-y-4 mx-1'>
       {console.log(infoContent)}
       
       {infoContent.photos && (
  <Slider {...settings}>
    {infoContent.photos.map((photo, index) => (
      <div key={index}>
        <img
          src={photo}
          alt={`${infoContent.name} photo ${index + 1}`}
          className='max-h-72 w-full object-cover rounded'
        />
      </div>
    ))}
  </Slider>
)}

          <h2 className='font-inter text-4xl font-semibold my-5 '>{infoContent.name}</h2>
          <span className='flex items-center text-lg'><FaStar className='text-yellow-400 text-2xl mr-4' />{infoContent.rating}</span>
          <span className='flex items-center text-lg'><FaWalking className='text-2xl mr-4' /> 15 min walk</span>
          <Link to={""} className='flex items-center text-lg'><PiPhoneCallLight className='text-2xl mr-4' />{infoContent.international_phone_number}</Link>
          {/* <p className='text-xl'>{infoContent.address}</p> */}
          <h3 className='text-3xl font-semibold'>Reserve your parking</h3>
          <div className='flex justify-around py-3 mr-4 border border-black rounded-3xl'>
            <div className='flex flex-col items-center'>
              <p className='font-semibold mb-4'>ENTRANCE TIME</p>
              <p className='font-bold text-3xl'>3:30 PM</p>
              <p className='font-semibold'>wed, 3 Jul</p>
            </div>
            <div className='flex flex-col items-center'>
              <p className='font-semibold mb-4'>EXIT TIME</p>
              <p className='font-bold text-3xl'>5:30 PM</p>
              <p className='font-semibold'>wed, 3 Jul</p>
            </div>
          </div>
          <div className='flex justify-center'>
            <button className='text-xl font-bold text-white rounded-full px-16 py-4' style={{ backgroundColor: "#0000FF" }}>BOOK NOW</button>
          </div>
          <hr />
          <div>
            <h3 className='text-3xl font-semibold'>Prices</h3>
            <table className='table-fixed w-full mt-4'>
              <thead>
                <tr>
                  <th><span className='flex items-center justify-center'><CiClock2 className='text-2xl' /></span></th>
                  <th><span className='flex items-center justify-center'><MdCurrencyRupee className='text-2xl' /></span></th>
                </tr>
              </thead>
              <tbody>
                <tr className='text-center'>
                  <td>1 Hour</td>
                  <td>40</td>
                </tr>
                <tr className='text-center'>
                  <td>2 Hour</td>
                  <td>70</td>
                </tr>
                <tr className='text-center'>
                  <td>3 Hour</td>
                  <td>100</td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr />
          <div className='flex flex-col gap-3 pb-10'>
            <h3 className='text-3xl font-semibold'>Anemities</h3>
            <span className='flex items-center text-lg font-semibold'><CiClock2 className='text-2xl mr-4' /> Hours of operation</span>
            <div className='flex justify-center'>
              {/* <div className='flex justify-center'>
                <span>Weekdays :</span>
                <span>8:00 AM to 7:00 PM </span>
                <div className='flex justify-around'>
                  <span>Weekdends :</span>
                  <span>6:00 AM to 9:00 PM </span>
                </div>
              </div> */}
              {infoContent.opening_hours.weekday_text &&
                <div className="flex flex-col">
                  {infoContent.opening_hours.weekday_text.map((day, index) => (
                    <p key={index}>{day}</p>
                  ))}
                </div>
              }
            </div>
            <span className='flex items-center text-lg font-semibold'><FaCreditCard className='text-2xl mr-4' /> Payment Accepted</span>
            <div className='flex items-center justify-center gap-10'>
              <p><FaGooglePay className='text-5xl text-green-800' /></p>
              <p><FaApplePay className='text-5xl' /></p>
              <p><RiVisaLine className='text-5xl text-blue-700' /></p>
              <p><SiPhonepe className='text-3xl text-purple-800' /></p>
            </div>
            <span className='flex items-center text-lg font-semibold'><FaCar className='text-2xl mr-4' /> Outside Parking</span>
            <span className='flex items-center text-lg font-semibold'><VscWorkspaceTrusted className='text-2xl mr-4' /> 24/7 Security</span>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default InformationWindow;
