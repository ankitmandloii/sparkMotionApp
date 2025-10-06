import { Clock, MapPin, Calendar } from "lucide-react";
import { Button } from "./Button";
import CurveBackground from "./CurveBackground";
export const EventCard = ({ artist, time, stage, onRemind }) => {
    return (
        <div className=" relative bg-gradient-to-br  from-gray-900/80 via-red-950/40 to-gray-900/80 backdrop-blur-sm rounded-2xl md:p-6 p-2  use-border hover:border-red-700/50 transition-all duration-300 shadow-xl hover:shadow-2xl">
            <CurveBackground />
            <div className="flex justify-between sm:flex-row items-center sm:items-center md:gap-4 gap-2">
                <div className="flex flex-col">
                    <h3 className="text-sm md:text-2xl font-bold text-white mb-1 md:mb-3">
                        {artist}
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-1 md:gap-3 text-gray-300 text-sm">
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
                <div className=" sm:w-auto">
                    <Button onClick={onRemind} />
                </div>
            </div>
        </div>
    );
};