import React from 'react'

import { RiFacebookCircleFill } from "react-icons/ri";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";

const SocialMedia = () => {
    return (
        <>
            <section className="flex flex-col gap-2 py-20 text-center text-white" style={{ backgroundColor: "#28388A" }}>
                <div className='text-xl font-semibold'> SOCIAL MEDIA</div>
                <div className="md:text-6xl text-4xl font-semibold"> Follow Us on Social Media</div>
                <div className="flex justify-center my-5 gap-5">
                    <a href="#"><RiFacebookCircleFill className="md:text-8xl text-6xl" /></a>
                    <a href="https://www.instagram.com/parkitup_in?igsh=MXFzZ2liOHRlY2Y3Yw%3D%3D&utm_source=qr" target='_blank'><AiFillInstagram className="md:text-8xl text-6xl" /></a>
                    <a href="#"><AiFillTwitterCircle className="md:text-8xl text-6xl" /></a>
                    <a href="https://www.linkedin.com/company/park-it-up/" target='_blank'><AiFillLinkedin className="md:text-8xl text-6xl" /></a>
                </div>
            </section>
        </>
    )
}

export default SocialMedia