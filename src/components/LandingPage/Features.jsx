import React from 'react';
import first from './first.png';
import second from './second.png'
import third from './third.png'

const Features = () => {
    return (
        <>
            <style>
                {`
                @media (max-width: 480px) {
                    .small-screen-image {
                        height: 300px !important; /* Adjust the size as needed */
                    }
                }
                `}
            </style>
            <div className='container max-w-7xl mx-auto'>

                <div className="flex flex-col md:flex-row py-10 justify-around items-center">
                    <div className='text-center my-5 max-w-lg'>
                        <h1 className='sm:text-5xl text-xl tracking-wide leading-tight' style={{ fontWeight: 1000 }}>Find parking for concerts, events, airports & more.</h1>
                        <p className='sm:text-2xl my-3' style={{ color: '#3E4E60' }}>Enjoy the convenience of booking a parking spot at the venue ahead of time, ensuring you have a space when you arrive for games, concerts, and more.</p>
                    </div>
                    <img
                        src={first}
                        width={360}
                        className='responsive-image'
                    />
                </div>

                <div className="flex flex-col-reverse md:flex-row  py-10 justify-around items-center">
                    <img
                        src={second}
                        width={360}
                        className='responsive-image'
                    />
                    <div className='text-center my-5 max-w-lg'>
                        <h1 className='sm:text-5xl text-xl tracking-wide leading-tight' style={{ fontWeight: 1000 }}>Monthly Parking</h1>
                        <p className='sm:text-2xl my-3' style={{ color: '#3E4E60' }}>Search for secure monthly parking facilities that make it easy to park near your home or office</p>
                    </div>

                </div>

                <div className='flex flex-col md:flex-row py-10 justify-around items-center'>
                    <div className='text-center my-5 max-w-lg'>
                        <h1 className='sm:text-5xl text-xl tracking-wide leading-tight' style={{ fontWeight: 1000 }}>Help you</h1>
                        <p className='sm:text-2xl my-3' style={{ color: '#3E4E60' }}>We are always here to help you any time.</p>
                    </div>
                    <img
                        src={third}
                        width={360}
                        className='responsive-image'
                    />
                </div>

            </div>
        </>
    );
}

export default Features