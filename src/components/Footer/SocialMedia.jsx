import React from 'react'

import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const SocialMedia = () => {
    return (
        <>
            <section className="flex flex-col gap-2 py-20 text-center text-white" style={{ backgroundColor: "#28388A" }}>
                <div className='text-xl font-semibold'> SOCIAL MEDIA</div>
                <div className="md:text-6xl text-4xl font-semibold"> Follow Us on Social Media</div>
                <div className="flex justify-center my-5 gap-8">
                    <a href="https://www.instagram.com/parkitup_in?igsh=MXFzZ2liOHRlY2Y3Yw%3D%3D&utm_source=qr" target='_blank'><FaInstagram className="md:text-8xl text-6xl" /></a>
                    <a href="https://www.linkedin.com/company/park-it-up/" target='_blank'><FaLinkedin className="md:text-8xl text-6xl" /></a>
                    <a href="#"><FaXTwitter className="md:text-8xl text-6xl" /></a>
                </div>
            </section>
        </>
    )
}

export default SocialMedia