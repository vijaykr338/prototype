import React from 'react'

import { RiFacebookCircleFill } from "react-icons/ri";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaApple } from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <section className="flex md:flex-row flex-col py-10 text-center text-white justify-around" style={{ backgroundColor: "#031025" }}>
                <div className="flex flex-col gap-5 my-6 md:items-start">
                    <h1 className="text-5xl font-bold">PARK It Up</h1>
                    <p className="text-lg">In a Hurry? PARK It Up!</p>
                    <div className='flex gap-3 my-6 justify-center'>
                        <a href="#"><RiFacebookCircleFill className="text-5xl" /></a>
                        <a href="https://www.instagram.com/parkitup_in?igsh=MXFzZ2liOHRlY2Y3Yw%3D%3D&utm_source=qr" target='_blank'><AiFillInstagram className="text-5xl" /></a>
                        <a href="#"><AiFillTwitterCircle className="text-5xl" /></a>
                    </div>
                    <p className="font-semibold text-lg"><span className="text-indigo-300">PARK It Up</span> &copy;2024. All Rights Reserved.</p>
                </div>

                <div className="flex flex-col gap-3 text-lg md:items-start">
                    <h2 className="text-2xl font-bold my-6">Features</h2>
                    <a href="#">Spend</a>
                    <a href="#">Save</a>
                    <a href="#">Budget</a>
                    <a href="#">Borrow</a>
                    <a href="#">Payments & Transfers</a>
                    <a href="#">Account</a>
                </div>

                <div className="flex flex-col gap-3 text-lg md:items-start">
                    <h2 className="text-2xl font-bold my-6">Transparency</h2>
                    <a href="#">Terms & Conditions</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Information Security Policy</a>
                    <a href="#">Cookie Policy</a>
                    <a href="#">Complaints</a>
                </div>

                {/* <div className="flex flex-col gap-3 items-center">
                    <h2 className="text-2xl font-bold my-6">Download App</h2>
                    <a href="">
                        <div className="flex items-center border p-2 rounded-md">
                            <IoLogoGooglePlaystore className="text-4xl" />
                            <div className='flex flex-col px-1'>
                                <p className="text-sm text-gray-300 leading-tight">Available on the</p>
                                <p className="text-lg font-semibold">Google Play</p>
                            </div>
                        </div>
                    </a>
                    <a href="">
                        <div className="flex items-center border p-2 rounded-md">
                            <FaApple className="text-4xl" />
                            <div className='flex flex-col px-1'>
                                <p className="text-sm text-gray-300 leading-tight">Download on the</p>
                                <p className="text-lg font-semibold">App Store</p>
                            </div>
                        </div>
                    </a>
                </div> */}

            </section>
        </>
    )
}

export default Footer