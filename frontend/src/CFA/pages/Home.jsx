import React from 'react';
import { Calendar, MapPin, Music, Users, Sparkles } from 'lucide-react';
import bgImage from '../assets/images/Rectangle1.jpg'
import InfoCard from '../components/shared/InfoCard';
import { RedcalendarIcon, RedlocationIcon, RedMusicIcon, RedStarIcon } from '../assets/customSvg';
import CurveBackground from '../components/shared/CurveBackground';

function Home({ config }) {
  return (
    <div className=" text-white w-full">

      {/* Hero Section */}
      <section className="text-center px-4 py-12 md:py-20" style={{
        backgroundColor: 'var(--color-surface-background)',
        // backfaceVisibility:"visible",
        backgroundImage: ` url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
          {/* CHRISTIAN FESTIVAL ASSOCIATION */}
          {config?.style?.eventName}
        </h1>
        <p className="text-gray-300 text-sm md:text-base mb-8 italic">
          The Passion & Purpose Experience
        </p>

        {/* Event Details Badge */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-12 text-xs md:text-sm">
          <div className="flex items-center gap-2  border border-[var(--border-color)] rounded-full px-4 py-2">
            <div className="flex items-center gap-2 md:mr-4 md:relative md:after:content-[''] md:after:absolute md:after:inset-y-0 md:after:right-[-10px] md:after:w-px md:after:bg-[var(--text-yellow)] ">
              <MapPin className="w-4 h-4  text-[var(--text-yellow)]" />
              <span className='text-[var(--text-yellow)]'>{config?.style?.eventAddress}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4  text-[var(--text-yellow)]" />
              <span className='text-[var(--text-yellow)]'>{config?.style?.eventDate}</span>
            </div>

          </div>
          {/* <div className="flex items-center gap-2 bg-amber-900/30 border border-amber-700/50 rounded-full px-4 py-2">
            
          </div> */}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 max-w-2xl mx-auto">
          {/* Artists Stat */}
          <div className="flex items-center gap-3 md:mr-4 md:relative md:after:content-[''] md:after:absolute md:after:inset-y-0 md:after:right-[-20px] md:after:w-px md:after:bg-[#FFFFFF1A]">
            <Music className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
            <div className="text-left min-w-0">
              <div className="text-xl md:text-2xl font-bold text-white">{config?.style?.Artistcount ?? "25+"}</div>
              <div className="text-xs md:text-sm text-gray-400">Artists</div>
            </div>
          </div>

          {/* Days Stat */}
          <div className="flex items-center gap-3 md:mr-4 md:relative md:after:content-[''] md:after:absolute md:after:inset-y-0 md:after:right-[-20px] md:after:w-px md:after:bg-[#FFFFFF1A]">
            <Calendar className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
            <div className="text-left min-w-0">
              <div className="text-xl md:text-2xl font-bold text-white">{config?.style?.eventNoOfDays}</div>
              <div className="text-xs md:text-sm text-gray-400">Days</div>
            </div>
          </div>

          {/* Attendees Stat */}
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
            <div className="text-left min-w-0">
              <div className="text-xl md:text-2xl font-bold text-white">{config?.style?.eventAttendeesCount}</div>
              <div className="text-xs md:text-sm text-gray-400">Attendees</div>
            </div>
          </div>
        </div>
      </section >
      {/* background: ; */}


      {/* Happening Now Banner */}
      < div className="relative bg-gradient-to-br from-black-900/80 via-red-950/40 to-black-900/80 backdrop-blur-sm border-t border-b border-red-800/50 py-8 px-4" >
        <CurveBackground></CurveBackground>
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 button-bg-gradient rounded-full animate-pulse"></div>
            <span className="gradient-text  text-xs md:text-sm font-semibold uppercase tracking-wider">
              Happening Now
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-2">{config?.style?.eventDate}</h2>
          <p className="text-gray-300 text-sm md:text-base italic font-[300]">
            Join 15,000+ believers in transformational worship
          </p>
        </div>
      </div >

      {/* Explore The Festival */}
      < section className="py-16 px-4 bg-black" >
        <h2 className="text-2xl md:text-2xl font-bold text-center mb-12">
          EXPLORE THE FESTIVAL
        </h2>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Card 1 */}
          <InfoCard
            icon={RedcalendarIcon}
            title="March 7-9, 2025"
            description={`${config?.style?.eventNoOfDays} Days of Music, Art, & Adventure`}
          />

          {/* Card 2 */}
          <InfoCard
            icon={RedlocationIcon}
            title="Tulsa, Oklahoma"
            description="3 Premier Festival Sites"
          />

          {/* Card 3 */}
          <InfoCard
            icon={RedMusicIcon}
            title="Amazing Artists"
            description="Brandon Lake, Maverick & More"
          />

          {/* Card 4 */}
          <InfoCard
            icon={RedStarIcon}
            title="Interactive Experiences"
            description="Soul-engaging Activities"
          />
        </div>
      </section >

      {/* Featured Artists */}
      <h2 className="text-xl md:text-2xl font-bold text-center mb-12">
        FEATURED ARTISTS
      </h2>
      < div className="w-full bg-black px-8 py-7 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 items-center relative mb-7" >
        {/* <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/20 via-black via-50% to-yellow-900/20"></div> */}
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-800/10 via-transparent to-yellow-800/10"></div>

        {/* Brandon Lake Section */}
        < div className="text-center md:mr-4 md:relative md:after:content-[''] md:after:absolute md:after:inset-y-0 md:after:right-0 md:after:w-px md:after:bg-[#FFFFFF1A] border-b border-b-[var(--border-color)] md:border-none py-5" >
          <h3 className="text-3xl font-bold text-[var(--text-yellow)] mb-1 ">BRANDON LAKE</h3>
          <p className="text-[#ffffff] text-sm italic">Saturday Headliner</p>
        </div >

        {/* Phil Wickham Section */}
        < div className="text-center md:mr-4 md:relative md:after:content-[''] md:after:absolute md:after:inset-y-0 md:after:right-0 md:after:w-px md:after:bg-[#FFFFFF1A] border-b border-b-[var(--border-color)] py-5 md:border-none" >
          <h3 className="text-3xl font-bold text-[var(--text-yellow)] mb-1">PHIL WICKHAM</h3>
          <p className="text-[#ffffff] text-sm italic">Sunday Headliner</p>
        </div >

        {/* Josiah Queen Section */}
        < div className="text-center " >
          <h3 className="text-3xl font-bold text-[var(--text-yellow)] mb-1">JOSIAH QUEEN</h3>
          <p className="text-[#ffffff] text-sm italic">Saturday</p>
        </div >
      </div >
    </div >
  );
}

export default Home;