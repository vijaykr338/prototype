import React from 'react'
import first from '../Features/first.svg'
import second from '../Features/second.png'
import third from '../Features/third.png'
import fourth from '../Features/fourth.png'
import fifth from '../Features/fifth.png'


const Featuro = () => {
    return (
        <div className='flex font-poppins flex-col items-center my-32 space-y-44'>



            <div className='flex w-3/5'>
                <div>
                <h1 className=' text-5xl tracking-wide leading-tight' style={{ fontWeight: 1000 }}>Find parking for concerts, events, airports & more.</h1>
                <p className='text-2xl my-3' style={{color: '#3E4E60'}}> Mulpa earum molestiae commodi illum fugit voluptates. In dolor laboriosam, vero molestiae necessitatibus commodi?</p>
                </div>
                <img src={second} className='ml-20' style={{height: '600px' }} />
            </div>

            <div className='flex w-3/4'>
                <img src={third} alt="" style={{height: '600px' }} />
                <div className='ml-20'>
                <h1 className=' text-5xl tracking-wide leading-tight' style={{ fontWeight: 1000 }}>Flexible options to fit your needs & budget.</h1>
                <p className='text-2xl my-3' style={{color: '#3E4E60'}}>Mulpa earum molestiae commodi illum fugit voluptates. In dolor laboriosam, vero molestiae necessitatibus commodi?</p>

                </div>
            </div>

            <div className='flex w-3/5'>
                <div className='mt-20'>
                <h1 className=' text-5xl tracking-wide leading-tight' style={{ fontWeight: 1000 }}>We Are Always Happy To Help You</h1>
                <p className='text-2xl my-3' style={{color: '#3E4E60'}}> Mulpa earum molestiae commodi illum fugit voluptates. In dolor laboriosam, vero molestiae necessitatibus commodi?</p>

                </div>
                <img src={fourth} className='ml-20' style={{height: '600px' }} />
            </div>


           
        </div>
    )
}

export default Featuro
