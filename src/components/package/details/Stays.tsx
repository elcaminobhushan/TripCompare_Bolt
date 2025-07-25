import React, { useState } from 'react';
import { Package } from '../../../types';
import { ChevronDown, ChevronUp, Star, MapPin } from 'lucide-react';
import { usePackageItinerary } from '../../../hooks/useItineraries';
import { useAccommodationsByItineraryId, useAccommodationsByItineraryIds } from '../../../hooks/useAccommodations';

interface StaysProps {
  packageData: Package;
}

const Stays: React.FC<StaysProps> = ({ packageData }) => {
  const [expandedDays, setExpandedDays] = useState<number[]>([1]);
  const { data: itinerary } = usePackageItinerary(packageData.id);

  const handleDayToggle = (day: number) => {
    setExpandedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const hasAnyAccommodations = useAccommodationsByItineraryIds(itinerary.map(a => a.id));

  if (!itinerary || itinerary.length === 0) {
    return <div className="text-gray-500">No itinerary found for this package.</div>;
  }

  if (!hasAnyAccommodations) {
    return <div className="text-gray-500">The tour operator hasn't provided any stay information yet.</div>;
  }

  return (
    <div className="space-y-6">
      {itinerary.map((day) => (
        <StaysDayCard
          key={day.day}
          day={day}
          itineraryLength={itinerary.length}
          isExpanded={expandedDays.includes(day.day)}
          onToggle={() => handleDayToggle(day.day)}
        />
      ))}
    </div>
  );
};
const StaysDayCard: React.FC<{
  day: any;
  itineraryLength: number;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ day, itineraryLength, isExpanded, onToggle }) => {
  const { data: accommodations } = useAccommodationsByItineraryId(day.id);

  if (!accommodations || accommodations.length === 0) return null;

  const renderStarRating = (rating: number) => {
    if (!rating || rating <= 0) return null;
    return [...Array(Math.floor(rating))].map((_, i) => (
      <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
    ));
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50"
      >
        <div className="flex items-center gap-4">
          <div className="bg-primary-600 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center">
            {day.day}
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-base">
              {accommodations[0].name}
            </h3>
            <p className="text-sm text-gray-500">
              Night {day.day} of {itineraryLength}
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>

      {isExpanded && accommodations.map((acc) => (
        <div key={acc.id} className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-t border-gray-200">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <div className="lg:w-1/3">
            <img
              src={acc.image || '/default-hotel.jpg'}
              alt={acc.name}
                  className="w-full h-48 lg:h-full object-cover"
            />
              </div>
              
              {/* Content Section */}
              <div className="lg:w-2/3 p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-bold text-xl text-gray-800">{acc.name}</h4>
                      <div className="flex items-center gap-1">
                        {renderStarRating(acc.rating)}
                        {acc.rating && (
                          <span className="text-sm text-gray-600 ml-1">({acc.rating} stars)</span>
                        )}
                      </div>
                    </div>
                    
                    {acc.location && (
                      <p className="text-sm text-gray-500 mb-3 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {acc.location}
                      </p>
                    )}
                    
                    {acc.description && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {acc.description}
                </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stays;
