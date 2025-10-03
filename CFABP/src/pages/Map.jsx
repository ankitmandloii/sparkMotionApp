import React from 'react'
import { locationIcon  } from '../assets/customSvg'
function Map() {
  return (

    <section className='bg-black py-4 px-14 text-white w-full'>

      {/* title  start*/}

      <h2 className="uppercase   text-3xl font-bold">festival map</h2>
      <p className='  text-xs italic'>Navigate the festival ground</p>
      {/* title  end*/}

      {/* legend start */}
      <div className='bg-[#1A1A1A] px-6 py-6 my-8 rounded-[20px]'>

        <div>
          <p className='uppercase py-1 font-bold text-lg'>map legend</p>

          <div className="   bg-[#313131] rounded-[16px] text-sm border border-white border-opacity-15">
            <div className="text-base text-white flex flex-col md:flex-row">

              {/* First Row */}
              <ul className="py-2 flex w-full md:flex-1 md:flex border-b border-white border-opacity-15 md:border-none">


                <li className="text-[var(--stage)] w-1/3 md:flex-1 text-center py-3">
                  <div className="flex justify-center items-center gap-1 border-r border-white border-opacity-15 inline-block">
                    <locationOnIcon fontSize="small" />
                    Stage
                  </div>
                </li>

                <li className="text-[var(--merch)] w-1/3 md:flex-1 text-center py-3">
                  <div className="flex justify-center items-center gap-1 border-r border-white border-opacity-15 inline-block">
                    <locationOnIcon fontSize="small" />
                    Food
                  </div>
                </li>

                <li className="text-[var(--parking)] w-1/3 md:flex-1 text-center py-3  md:border-r border-white border-opacity-15">
                  <div className="flex justify-center items-center gap-1">
                    <locationOnIcon fontSize="small" />
                    Merch
                  </div>
                </li>
              </ul>

              {/* Second Row */}
              <ul className="py-2 flex   md:flex-1 md:flex">
                <li className="text-[var(--food)] w-1/3 md:flex-1 text-center py-3">
                  <div className="flex justify-center items-center gap-1 border-r border-white border-opacity-15  ">
                    <locationOnIcon fontSize="small" />
                    Parking
                  </div>
                </li>

                <li className="text-[var(--restroom)] w-1/3 md:flex-1 text-center py-3">
                  <div className="flex justify-center items-center gap-1 border-r border-white border-opacity-15 ">
                    <locationOnIcon fontSize="small" />
                    Restroom
                  </div>
                </li>
                <li className="text-[var(--entrance)] w-1/3 md:flex-1 text-center py-3">
                  <div className="flex justify-center items-center gap-1 border-r border-white border-opacity-15  ">
                    <locationOnIcon fontSize="small" />
                    Entrance
                  </div>
                </li>
              </ul>

            </div>
          </div>

        </div>

      </div>

      {/* legend end*/}
      {/* tips start */}
      <div className='bg-[#1A1A1A] px-6 py-6 my-8 rounded-[20px]'>

        <div>
          <p className='uppercase py-1 font-bold text-lg'>festival tips</p>

          <div className='py-2 leading-10 bg-[#313131] rounded-[16px] py-2 px-4 text-sm  border border-white border-opacity-15'>
            <ul>
              <li className='border-b border-gray-400 border-white border-opacity-15'>
                This app works offline! Content will sync automatically when you have intenal connections.
              </li>

              <li className='border-b border-gray-400 border-white border-opacity-15'>
                This app works offline! Content will sync automatically when you have intenal connections.
              </li>

              <li>
                This app works offline! Content will sync automatically when you have intenal connections.
              </li>

            </ul>
          </div>

        </div>

      </div>
      {/* tips end */}
    </section>
  )
}

export default Map