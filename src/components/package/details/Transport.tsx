import React, { useEffect, useState } from 'react';
import { Package } from '../../../types';
import { usePackageItinerary } from '../../../hooks/useItineraries';
import { useTransportByItineraryIds } from '../../../hooks/useTransport';
import {
  Plane, Bus, Ship, Train, Car, Route,
} from 'lucide-react';

const getTransportIcon = (type: string) => {
  switch (type) {
    case 'flight': return <Plane className="h-5 w-5 text-primary-600" />;
    case 'bus':
    case 'van': return <Bus className="h-5 w-5 text-primary-600" />;
    case 'train': return <Train className="h-5 w-5 text-primary-600" />;
    case 'boat':
    case 'ferry': return <Ship className="h-5 w-5 text-primary-600" />;
    case 'car': return <Car className="h-5 w-5 text-primary-600" />;
    default: return <Route className="h-5 w-5 text-primary-600" />;
  }
};

interface TransportProps {
  packageData: Package;
}

const Transport: React.FC<TransportProps> = ({ packageData }) => {
  const { data: itinerary } = usePackageItinerary(packageData.id);
  const itineraryIds = itinerary?.map((day) => day.id) ?? [];
  const { data: transports } = useTransportByItineraryIds(itineraryIds);
  const [transportGroups, setTransportGroups] = useState<Record<string, any[]>>({});

  useEffect(() => {
    if (!transports) return;
    const grouped: Record<string, any[]> = {};
    transports.forEach((t) => {
      if (!grouped[t.type]) grouped[t.type] = [];
      grouped[t.type].push(t);
    });
    setTransportGroups(grouped);
  }, [transports]);

  if (!transports || transports.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No transport information provided by the tour operator.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Object.entries(transportGroups).map(([type, list]) => (
        <div key={type} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-md p-6 border border-green-100">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
            {getTransportIcon(type)}
              <h3 className="text-lg font-bold capitalize text-gray-800">{type}</h3>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                {list.length} {list.length === 1 ? 'option' : 'options'}
              </span>
          </div>
            
            <div className="space-y-3">
            {list.map((t, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3 border-l-4 border-green-400">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      {t.name && (
                        <h4 className="font-semibold text-gray-800 mb-1">{t.name}</h4>
                      )}
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium">{t.source}</span>
                        <span className="mx-2 text-green-500">→</span>
                        <span className="font-medium">{t.destination}</span>
                      </div>
                      {t.description && (
                        <p className="text-xs text-gray-500 mt-1">{t.description}</p>
                      )}
                    </div>
                  </div>
                </div>
            ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Transport;
