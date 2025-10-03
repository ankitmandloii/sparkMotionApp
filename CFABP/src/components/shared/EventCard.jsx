import { Clock, MapPin, Calendar } from 'lucide-react';
import { Button } from './Button';
export const EventCard = ({ artist, time, stage, onRemind }) => {
    return (
        <div className="bg-gradient-to-br from-gray-900/80 via-red-950/40 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-red-900/30 hover:border-red-700/50 transition-all duration-300 shadow-xl hover:shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                        {artist}
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-3 text-gray-300 text-sm">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-red-400" />
                            <span>{time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-red-400" />
                            <span>{stage}</span>
                        </div>
                    </div>
                </div>
                <div className="w-full sm:w-auto">
                    <Button onClick={onRemind} />
                </div>
            </div>
        </div>
    );
};