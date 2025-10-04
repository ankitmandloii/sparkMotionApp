import React from 'react'
import { Button } from './Button'
import { useNavigate } from 'react-router';

function HomeHeaderButton() {
    const navigation = useNavigate();
    return (
        <div className='w-[417px] h-[50px] gap-4  flex '>

            <button
                onClick={() => navigation("/schedule")}
                className="button-bg-gradient cursor-pointer  w-[200px] hover:from-red-600 hover:to-red-700 text-white px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
                View Schedule
            </button>
            <button
                onClick={() => navigation("/map")}
                className="use-border w-[200px] bg-[#313131] text-white px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
            >
                Festival Map
            </button>
        </div >
    )
}

export default HomeHeaderButton