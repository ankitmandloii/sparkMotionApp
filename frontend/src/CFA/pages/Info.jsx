
// import './App.css';

const DetailsCard = ({ title, data }) => {
    return <div>
        <p className='uppercase py-1 font-bold text-lg'>{title}</p>
        <div className='leading-10 bg-[#313131] rounded-[16px] py-2 px-4 text-sm use-border  border-opacity-15'>
            <ul>
                {
                    data.map((d, index) => (
                        <li className={`${index < data.length - 1 ? "border-b" : ""} border-[var(--border-color)] border-opacity-15 flex gap-1`}>
                            <span className='font-semibold'>{d.key}:</span>
                            <span className='font-thin text-gray-300'>{d.value}</span>
                        </li>
                    ))
                }
            </ul>
        </div>

    </div>

}
function Info() {
    const festivalDetails = [
        {
            id: 1,
            title: "Event Details",
            data: [
                { key: "Dates", value: "September 6-7, 2025" },
                { key: "Location", value: "City Park Arena, Downtown" },
                { key: "Times", value: "11:00 AM - 11:00 PM Daily" },
                { key: "Ages", value: "All Ages Welcome" },
            ],
        },
        {
            id: 2,
            title: "Ticketing Info",
            data: [
                { key: "GA Price", value: "$150 / day" },
                { key: "VIP Price", value: "$300 / day" },
                { key: "On Sale", value: "Next Friday at 10 AM" },
                { key: "Box Office", value: "Opens at 10 AM on Event Days" },
            ],
        },
        {
            id: 3,
            title: "Access & Transport",
            data: [
                { key: "Parking", value: "Available ($20/day)" },
                { key: "Public Transit", value: "Metro stop 'Arena'" },
                { key: "Rideshare", value: "Designated drop-off zone" },
                { key: "Accessibility", value: "ADA compliant paths" },
            ],
        },
        {
            id: 4,
            title: "Health & Safety",
            data: [
                { key: "Medical", value: "First-aid tents available" },
                { key: "Security", value: "24/7 Patrol and Bag Checks" },
                { key: "Water Stations", value: "Free Refills provided" },
                { key: "COVID Policy", value: "Check website for updates" },
            ],
        },
    ];
    const importantUpdates = [
        "This app works offline! Content will sync automatically when you have internet connections.",
        "Check the performance schedule for the latest set times and secret guests.",
        "Lost & Found is located near the main entrance until midnight. Inquire at the Information Booth.",
    ];

    return (
        <>
            <section className='bg-black py-8 px-4 md:px-14 text-white w-full overflow-hidden'>

                {/* heading section start */}
                <div className="max-w-7xl mx-auto">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold uppercase">FESTIVAL INFO </h1>
                        <p className="color-text-base text-sm italic">Everything you need to know.</p>
                    </div>
                    {/* <h2 className="uppercase text-[34px] color-primary-base font-extrabold color-text-bas ">Festival Map</h2>
                    <p className='text-[16px] font-medium  color-primary-base  italic  '>Everything you need to know.</p> */}
                </div>
                {/* heading section end*/}
                {/* event details section start */}

                <div className='bg-[#1A1A1A]  px-6 py-6 my-8 rounded-[20px] grid grid-cols-1 lg:grid-cols-2 gap-6'>

                    {
                        festivalDetails.map((details) => {
                            return <DetailsCard title={details.title} data={details.data}></DetailsCard>
                        })
                    }


                </div>
                {/* event details section end  */}


                {/* important updates start */}

                <div className='bg-[#1A1A1A] px-6 py-6 my-8 rounded-[20px]'>


                    <div>
                        <p className='uppercase py-1 font-bold text-lg'>important updates</p>

                        <div className='py-2 leading-10 bg-[#313131] rounded-[16px]  px-4 text-sm  use-border border-opacity-15'>
                            {
                                importantUpdates.map((update, index) => {
                                    return <li 
                                    key={index}
                                    className={`'${index < importantUpdates.length - 1 ? " border-b " : ""} border-[var(--border-color)]  border-opacity-15 list-none text-sm p-1 '`}>
                                        {update}
                                    </li>
                                })

                            }                            <ul>
                                {/* <li className='border-b border-gray-400 border-white border-opacity-15'>
                                        This app works offline! Content will sync automatically when you have intenal connections.
                                    </li>

                                    <li className='border-b border-gray-400 border-white border-opacity-15'>
                                        This app works offline! Content will sync automatically when you have intenal connections.
                                    </li>

                                    <li>
                                        This app works offline! Content will sync automatically when you have intenal connections.
                                    </li> */}

                            </ul>
                        </div>

                    </div>

                </div>

                {/* important updates end */}



            </section>
        </>
    );
}

export default Info;
