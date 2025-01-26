import React from "react"

function Testimonials() {
  return (
    <section id="testimonials" className="py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container max-w-7xl  px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500 mb-4">
              "ParkEase has made my life so much easier. I no longer stress about finding parking in busy areas of
              Mumbai."
            </p>
            <p className="font-bold">- Priya S., Mumbai</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500 mb-4">
              "I've saved so much time and money using ParkEase. It's a game-changer for anyone who drives in Delhi."
            </p>
            <p className="font-bold">- Rahul K., Delhi</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

