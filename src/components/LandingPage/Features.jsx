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

                <div className="flex lg:flex-row py-20 justify-around items-center">
                    <div className='text-center my-5 max-w-lg'>
                        <h1 className='sm:text-5xl text-xl tracking-wide leading-tight' style={{ fontWeight: 1000 }}>Find parking for concerts, events, airports & more.</h1>
                        <p className='sm:text-2xl my-3' style={{ color: '#3E4E60' }}> Mulpa earum molestiae commodi illum fugit voluptates. In dolor laboriosam, vero molestiae necessitatibus commodi?</p>
                    </div>
                    <img
                        src={first}
                        width={400}
                        className='responsive'
                    />
                </div>

                <div className="flex lg:flex-row py-20 justify-around items-center">
                    <img
                        src={second}
                        width={400}
                        className='responsive'
                    />
                    <div className='text-center my-5 max-w-lg'>
                        <h1 className='sm:text-5xl text-xl tracking-wide leading-tight' style={{ fontWeight: 1000 }}>Find parking for concerts, events, airports & more.</h1>
                        <p className='sm:text-2xl my-3' style={{ color: '#3E4E60' }}> Mulpa earum molestiae commodi illum fugit voluptates. In dolor laboriosam, vero molestiae necessitatibus commodi?</p>
                    </div>

                </div>

                <div className='flex lg:flex-row py-10 justify-around items-center'>
                    <div className='text-center my-5 max-w-lg'>
                        <h1 className='sm:text-5xl text-xl tracking-wide leading-tight' style={{ fontWeight: 1000 }}>Help you</h1>
                        <p className='sm:text-2xl my-3' style={{ color: '#3E4E60' }}>Mulpa earum molestiae commodi illum fugit voluptates. In dolor laboriosam, vero molestiae necessitatibus commodi?</p>
                    </div>
                    <img
                        src={third}
                        width={400}
                        className='responsive'
                    />
                </div>

            </div>
        </>
    );
}

export default Features