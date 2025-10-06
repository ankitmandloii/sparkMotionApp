// import React from 'react'
// import ArtistPageButton from '../components/shared/ArtistPageButton'
// import { ArtistCard } from '../components/shared/ArtistCard';
// import ArtistImg from '../assets/images/CardImg.jpg'

// const artists = [
//   {
//     id: 1,
//     artist: 'BRANDON LAKE',
//     stage: 'Main Stage',
//     description: 'Get ready for an unforgettable known for powerful and anointed life Gravel Into Gardens.',
//     imageUrl: ArtistImg // Will show gradient placeholder
//   },
//   {
//     id: 2,
//     artist: 'PHIL WHICKHAM',
//     stage: 'Main Stage',
//     description: 'Renowned worship leader bringing songs like Living Hope and This is Amazing Grace.',
//     imageUrl: ArtistImg
//   },
//   {
//     id: 3,
//     artist: 'JOSIAH QUEEN',
//     stage: 'Electronic Stage',
//     description: 'An emerging artist blending soulful melodies with deep, heartfelt worship.',
//     imageUrl: ArtistImg
//   },
//   {
//     id: 4,
//     artist: 'LECRAE',
//     stage: 'Main Stage',
//     description: 'Hip-hop artist who uses his platform to blend faith and social justice.',
//     imageUrl: ArtistImg
//   }
// ];

// function Artists() {

//   return (
//     <div className="min-h-screen  text-white  px-4 w-full mb-3">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
//           <div>
//             <h1 className="text-3xl md:text-4xl font-bold ">ARTISTS</h1>
//             <p className="text-white text-sm italic font-[300]">Discover the amazing lineup</p>
//           </div>
//           <div>
//             <ArtistPageButton />
//           </div>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {artists.map((artist) => (
//             <ArtistCard
//               key={artist.id}
//               artist={artist.artist}
//               stage={artist.stage}
//               description={artist.description}
//               imageUrl={artist.imageUrl}
//             // onScheduleClick={() => handleScheduleClick(artist.artist)}
//             />
//           ))}
//         </div>


//       </div>
//     </div>
//   )
// }

// export default Artists
import React, { useState } from 'react'
import ArtistPageButton from '../components/shared/ArtistPageButton'
import { ArtistCard } from '../components/shared/ArtistCard';
import ArtistImg from '../assets/images/CardImg.jpg'

const artists = [
  {
    id: 1,
    artist: 'BRANDON LAKE',
    stage: 'Main Stage',
    description: 'Get ready for an unforgettable known for powerful and anointed life Gravel Into Gardens.',
    imageUrl: ArtistImg // Will show gradient placeholder
  },
  {
    id: 2,
    artist: 'PHIL WHICKHAM',
    stage: 'Main Stage',
    description: 'Renowned worship leader bringing songs like Living Hope and This is Amazing Grace.',
    imageUrl: ArtistImg
  },
  {
    id: 3,
    artist: 'JOSIAH QUEEN',
    stage: 'Electronic Stage',
    description: 'An emerging artist blending soulful melodies with deep, heartfelt worship.',
    imageUrl: ArtistImg
  },
  {
    id: 4,
    artist: 'LECRAE',
    stage: 'Main Stage',
    description: 'Hip-hop artist who uses his platform to blend faith and social justice.',
    imageUrl: ArtistImg
  }
];

function Artists() {
  const [selectedStage, setSelectedStage] = useState('All');

  const filteredArtists = selectedStage === 'All'
    ? artists
    : artists.filter(artist => artist.stage.toLowerCase().includes(selectedStage.toLowerCase()));

  return (
    <div className="min-h-screen  text-white py-8  px-4 md:px-14 w-full mb-3">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-center  md:justify-between items-start sm:items-center gap-4 mb-2">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold ">ARTISTS</h1>
            <p className="text-white text-sm italic font-[300]">Discover the amazing lineup</p>
          </div>
          <div className='mx-auto md:mx-0'>
            <ArtistPageButton />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArtists.map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist.artist}
              stage={artist.stage}
              description={artist.description}
              imageUrl={artist.imageUrl}
            // onScheduleClick={() => handleScheduleClick(artist.artist)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Artists