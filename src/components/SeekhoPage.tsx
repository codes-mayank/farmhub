import React from 'react';
import { SEEKHO_VIDEOS } from '../data/centralData';
import { 
  GraduationCap, 
  Play, 
  Clock, 
  Eye, 
  CheckCircle2, 
  Sparkles, 
  BookOpen,
  Volume2
} from 'lucide-react';

export const SeekhoPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <GraduationCap className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900">
              Seekho • Agricultural Short-Video Learning Hub
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Bite-sized agronomic masterclasses from ICAR scientists and successful progressive farmers in Hindi and regional dialects.
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
          KVK Validated Video Cards
        </span>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SEEKHO_VIDEOS.map((video) => (
          <div 
            key={video.id}
            className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
          >
            <div>
              {/* Thumbnail & Video Badges */}
              <div className="h-48 w-full bg-stone-100 relative overflow-hidden">
                <img 
                  src={video.thumbnailUrl} 
                  alt={video.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-stone-950/25 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-emerald-800 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-900/80 text-white backdrop-blur-xs">
                    {video.crop}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white backdrop-blur-xs">
                    {video.language}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded-lg flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{video.duration}</span>
                </div>
              </div>

              {/* Video Content Body */}
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold text-emerald-700">{video.creator}</span>
                  <span className="flex items-center space-x-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{video.views} views</span>
                  </span>
                </div>

                <h3 className="font-black text-base text-stone-900 leading-snug group-hover:text-emerald-700 transition-colors">
                  {video.title}
                </h3>

                {/* Key Takeaways */}
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-1.5 text-xs">
                  <span className="font-extrabold text-stone-800 block text-[11px] uppercase tracking-wider">
                    Key Practical Takeaways:
                  </span>
                  {video.keyTakeaways.map((tip, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-stone-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => alert(`Playing: "${video.title}" by ${video.creator}`)}
                className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-xs transition-colors cursor-pointer text-center flex items-center justify-center space-x-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Watch Video Lesson ({video.duration})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
