import React from "react"
import { ChevronDown } from "lucide-react"

function FAQ() {
    return (
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 ">
            <div className="container px-4 md:px-6 mx-auto">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    <details className="group border-b pb-4">
                        <summary className="flex items-center justify-between cursor-pointer">
                            <h3 className="text-lg font-medium">How do I book a parking spot?</h3>
                            <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                        </summary>
                        <p className="mt-4 text-gray-500">
                            Simply enter your destination, choose an available spot, and complete the booking process. It's quick and
                            easy!
                        </p>
                    </details>
                    <details className="group border-b pb-4">
                        <summary className="flex items-center justify-between cursor-pointer">
                            <h3 className="text-lg font-medium">Can I cancel my booking?</h3>
                            <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                        </summary>
                        <p className="mt-4 text-gray-500">
                            Yes, you can cancel your booking up to 2 hours before the scheduled time for a full refund.
                        </p>
                    </details>
                    <details className="group border-b pb-4">
                        <summary className="flex items-center justify-between cursor-pointer">
                            <h3 className="text-lg font-medium">Is my payment secure?</h3>
                            <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                        </summary>
                        <p className="mt-4 text-gray-500">
                            We use industry-standard encryption to ensure all your transactions are safe and secure.
                        </p>
                    </details>
                </div>
            </div>
        </section>
    )
}

export default FAQ

