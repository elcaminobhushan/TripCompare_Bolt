import React, { useState } from 'react';
import { Package, ItineraryDay } from '../../../types';
import type { Transport as TransportType } from '../../../types';



import { ChevronDown, ChevronUp, Plane, Bus, Ship, Train, Car, Route } from 'lucide-react';
import { usePackageItinerary } from '../../../hooks/useItineraries';
import { useTransportByItineraryId } from '../../../hooks/useTransport';

interface TransportProps {
  packageData: Package;
}

const getTransportIcon = (type: string) => {
  switch (type) {
    case 'flight':
      return <Plane className="h-6 w-6 text-primary-600" />;
    case 'bus':
    case 'van':
      return <Bus className="h-6 w-6 text-primary-600" />;
    case 'train':
      return <Train className="h-6 w-6 text-primary-600" />;
    case 'boat':
    case 'ferry':
      return <Ship className="h-6 w-6 text-primary-600" />;
    case 'car':
      return <Car className="h-6 w-6 text-primary-600" />;
    default:
      return <Route className="h-6 w-6 text-primary-600" />;
  }
};

const Transport: React.FC<TransportProps> = ({ packageData }) => {
  const [expandedDays, setExpandedDays] = useState<number[]>([1]);
  const { data: itinerary } = usePackageItinerary(packageData.id);

  if (!itinerary || itinerary.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No transportation information available
      </div>
    );
  }

  const handleDayToggle = (day: number) => {
    setExpandedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="space-y-6">
      {itinerary.map((day) => (
        <TransportDayCard
          key={day.id}
          day={day}
          isExpanded={expandedDays.includes(day.day)}
          onToggle={() => handleDayToggle(day.day)}
        />
      ))}
    </div>
  );
};

const TransportDayCard: React.FC<{
  day: ItineraryDay;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ day, isExpanded, onToggle }) => {
  const { data: transportsForDay } = useTransportByItineraryId(day.id);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50"
      >
        <div className="flex items-center gap-4">
          <div className="bg-primary-600 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center">
            {day.day}
          </div>
          <div className="text-left">
            <h3 className="font-semibold">{day.title}</h3>
            <p className="text-sm text-gray-500">
              {transportsForDay?.length || 0}{' '}
              {transportsForDay?.length === 1 ? 'transport option' : 'transport options'}
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>

      {isExpanded && (
  <div className="p-4 bg-gray-50 border-t border-gray-200">
    {transportsForDay && transportsForDay.length > 0 ? (
      transportsForDay.map((transport: TransportType, index: number) => (
        <div
          key={transport.id}
          className={`bg-white rounded-lg p-6 ${index > 0 ? 'mt-4' : ''}`}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 bg-primary-50 rounded-full flex items-center justify-center">
              {getTransportIcon(transport.type)}
            </div>
          </div>

          {transport.description && (
            <p className="text-gray-600 mb-4">{transport.description}</p>
          )}

        </div>
      ))
    ) : (
      <div className="bg-white rounded-lg p-6 text-center text-gray-500">
        No transportation scheduled for this day
      </div>
    )}
  </div>
)}

    </div>
  );
};

export default Transport;
