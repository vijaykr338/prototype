import React from "react"

import { FaRegClock } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

function WhyChoose() {
  return (
    <section id="features" className="py-12 md:py-18 my-10 bg-white">
      <div className="container max-w-7xl px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Why Choose ParkItUp?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 transition-transform hover:scale-105">
            <div className="flex flex-col items-center space-y-4">
              <FaRegClock className="w-12 h-12 text-blue-600" />
              <h3 className="text-2xl font-bold text-center">Save Time</h3>
              <p className="text-gray-500 text-center">
                No more circling for parking. Book in advance and drive straight to your spot.
              </p>
            </div>
          </div>
          <div className="p-6 transition-transform hover:scale-105">
            <div className="flex flex-col items-center space-y-4">
              <FaCreditCard className="w-12 h-12 text-blue-600" />
              <h3 className="text-2xl font-bold text-center">Save Money</h3>
              <p className="text-gray-500 text-center">
                Get the best rates with our competitive pricing and exclusive discounts.
              </p>
            </div>
          </div>
          <div className="p-6 transition-transform hover:scale-105">
            <div className="flex flex-col items-center space-y-4">
              <FaLocationDot className="w-12 h-12 text-blue-600" />
              <h3 className="text-2xl font-bold text-center">Nationwide Coverage</h3>
              <p className="text-gray-500 text-center">Find parking spots in all major cities across India.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChoose

