import React from 'react';
import second from '../Features/second.png';
import third from '../Features/third.png'
import fourth from '../Features/fourth.png'

const Featuro = () => {
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
            <div className='sm:flex font-poppins sm:flex-col sm:items-center sm:my-32 px-4 sm:space-y-44'>
                
                <div className='flex flex-col xl:flex-row-reverse sm:flex-row px-5 py-10 sm:items-center sm:w-4/5'>
                    <img src={second} className='sm:mr-20 small-screen-image my-3' style={{ height: '600px' }} />
                    <div className='sm:mr-14 sm:px-32'>
                        <h1 className='sm:text-5xl text-xl tracking-wide leading-tight' style={{ fontWeight: 1000 }}>Find parking for concerts, events, airports & more.</h1>
                        <p className='sm:text-2xl my-3' style={{ color: '#3E4E60' }}> Mulpa earum molestiae commodi illum fugit voluptates. In dolor laboriosam, vero molestiae necessitatibus commodi?</p>
                    </div>
                </div>


            <div className='flex flex-col sm:flex-row px-5 py-10 sm:items-center sm:w-3/4'>
                <img src={third}  className='sm:mr-20 small-screen-image my-3' alt="" style={{height: '600px' }} />
                <div className='sm:ml-20'>
                <h1 className='sm:text-5xl text-xl tracking-wide leading-tight' style={{ fontWeight: 1000 }}>Flexible options to fit your needs & budget.</h1>
                <p className='sm:text-2xl my-3' style={{color: '#3E4E60'}}>Mulpa earum molestiae commodi illum fugit voluptates. In dolor laboriosam, vero molestiae necessitatibus commodi?</p>

                </div>
            </div>

            <div className='flex flex-col sm:flex-row-reverse px-5 py-10 sm:items-center sm:w-3/5'>
                <img src={fourth} className='sm:ml-20 sm:my-3 ' />
                <div className='sm:mt-20'>
                <h1 className='sm:text-5xl text-xl tracking-wide leading-tight'  style={{ fontWeight: 1000 }}>We Are Always Happy To Help You</h1>
                <p className='sm:text-2xl my-3' style={{color: '#3E4E60'}}> Mulpa earum molestiae commodi illum fugit voluptates. In dolor laboriosam, vero molestiae necessitatibus commodi?</p>

                </div>
            </div>

            </div>



        </>
    );
}

export default Featuro;