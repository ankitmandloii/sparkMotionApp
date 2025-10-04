import { MusiccIcon, PlayIcon, ShareIcon, WhiteLocationIcon } from '../../assets/customSvg.js';
import { Button } from './Button.jsx';
import { MapPin, Play, Share2, Bookmark } from 'lucide-react';
import CurveBackground from './CurveBackground.jsx';
export const ArtistCard = ({ artist, stage, description, imageUrl, onScheduleClick }) => {
    return (
        <div className="group relative rounded-2xl overflow-hidden border border-[var(--border-color)] hover:border-gray-600 transition-all duration-300 shadow-xl hover:shadow-2xl">
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={artist}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-900/50 via-pink-900/50 to-blue-900/50 flex items-center justify-center">
                        <div className="text-6xl font-bold text-white/10">{artist.charAt(0)}</div>
                    </div>
                )}

                {/* Overlay Icons */}
                {/* <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-black/60 backdrop-blur-sm p-2 rounded-full hover:bg-black/80 transition-all">
                        <Play className="w-4 h-4 text-white" />
                    </button>
                    <button className="bg-black/60 backdrop-blur-sm p-2 rounded-full hover:bg-black/80 transition-all">
                        <Share2 className="w-4 h-4 text-white" />
                    </button>
                    <button className="bg-black/60 backdrop-blur-sm p-2 rounded-full hover:bg-black/80 transition-all">
                        <Bookmark className="w-4 h-4 text-white" />
                    </button>
                </div> */}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60"></div>
            </div>

            {/* Content */}
            <div className="relative p-6 bg-gradient-to-br from-gray-900/80 via-red-950/40 to-gray-900/80 backdrop-blur-3xl h-[100%]">
                <CurveBackground></CurveBackground>
                <div className='flex justify-between'>
                    <div>
                        <h3 className="text-sm md:text-xl font-bold text-white mb-2">
                            {artist}
                        </h3>

                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                            {/* <MapPin className="w-4 h-4 text-red-400" /> */}
                            <WhiteLocationIcon />
                            <span>{stage}</span>
                        </div>
                    </div>
                    <div class="flex items-center justify-center w-32 h-10  rounded-full text-white text-sm border border-[var(--border-color)] px-2 backdrop-blur-3xl ">
                        <div class="flex items-center justify-center w-8 h-8 cursor-pointer">
                            <PlayIcon />
                        </div>
                        <div class="w-px h-4 bg-gray-600 mx-2"></div>
                        <div class="flex items-center justify-center w-8 h-8 cursor-pointer">
                            <MusiccIcon />
                        </div>
                        <div class="w-px h-4 bg-gray-600 mx-2"></div>
                        <div class="flex items-center justify-center w-8 h-8">
                            <ShareIcon />
                        </div>
                    </div>
                </div>


                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {description}
                </p>

                <Button onClick={onScheduleClick}>
                    View Schedule
                </Button>
            </div>
        </div>
    );
};
