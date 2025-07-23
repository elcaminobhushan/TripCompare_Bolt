import React, { useState } from 'react';
import { Package } from '../../../types';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { usePackageItinerary } from '../../../hooks/useItineraries';
import { useActivitiesByItineraryId } from '../../../hooks/useActivities';

interface ActivitiesProps {
  packageData: Package;
}

const Activities: React.FC<ActivitiesProps> = ({ packageData }) => {
  const [expandedDays, setExpandedDays] = useState<number[]>([1]);
  const { data: itinerary } = usePackageItinerary(packageData.id);

  const handleDayToggle = (day: number) => {
    setExpandedDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  return (
    <div className="space-y-6">
      {itinerary?.map((day) => (
        <ActivitiesDayCard
          key={day.id}
          day={day}
          isExpanded={expandedDays.includes(day.day)}
          onToggle={() => handleDayToggle(day.day)}
        />
      ))}
    </div>
  );
};

const ActivitiesDayCard: React.FC<{
  day: any;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ day, isExpanded, onToggle }) => {
  const { data: activities } = useActivitiesByItineraryId(day.id);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50"
      >
        <div className="flex items-center gap-4">
          <div className="bg-primary-600 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center text-sm">
            {day.day}
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-800 text-base">{day.title}</h3>
            <p className="text-sm text-gray-500">
              {activities?.length || 0} activities planned
            </p>
          </div>
        </div>
        {isExpanded
          ? <ChevronUp className="h-5 w-5 text-gray-400" />
          : <ChevronDown className="h-5 w-5 text-gray-400" />}
      </button>

      {isExpanded && (
        <div className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-t border-gray-100">
    {activities && activities.length > 0 ? (
            <div className="space-y-6">
        {activities.map((activity) => (
          <div
            key={activity.id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-100"
          >
                <div className="flex flex-col lg:flex-row">
                  {/* Image Section */}
                  {activity.image && (
                    <div className="lg:w-1/3">
                      <img
                        src={activity.image}
                        alt={activity.name}
                        className="w-full h-48 lg:h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Content Section */}
                  <div className={`p-6 flex flex-col justify-center ${activity.image ? 'lg:w-2/3' : 'w-full'}`}>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-800 mb-2">
                {activity.name}
              </h4>

                        {activity.type && (
                          <div className="flex items-center gap-2 mb-3">
                            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
                              {activity.type.replace('-', ' ')}
                            </span>
                          </div>
                        )}

                        {activity.description && (
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {activity.description}
                </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        ))}
      </div>
    ) : (
            <div className="bg-white rounded-lg p-6 text-center">
              <p className="text-gray-500">No activities listed for this day.</p>
            </div>
    )}
  </div>
)}


    </div>
  );
};

export default Activities;
