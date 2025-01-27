import React from "react"
import look from './look.avif'
import book from './book.avif'
import parking from './parking.webp'

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col justify-center items-center space-y-4">
            <img src={look} width={200} alt="Look" className="responsive-image" />
            <h3 className="text-xl font-bold text-center">Look</h3>
            <p className="text-gray-500 text-center">Search and compare prices at thousands of parking facilities across India.</p>
          </div>
          <div className="flex flex-col justify-center items-center space-y-4">
            <img src={book} width={200} alt="Look" className="responsive-image" />
            <h3 className="text-xl font-bold text-center">Book</h3>
            <p className="text-gray-500 text-center">Pay securely and receive a prepaid parking pass instantly via email or in the app.</p>
          </div>
          <div className="flex flex-col justify-center items-center space-y-4">
            <img src={parking} width={200} alt="Look" className="responsive-image" />
            <h3 className="text-xl font-bold text-center">Park</h3>
            <p className="text-gray-500 text-center">
            When you arrive, follow the instructions included in your pass, park, and go!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

