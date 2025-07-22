import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package } from '../types';
import { getPackageById } from '../data/packages';
import { getDestinationById } from '../data/destinations';
import { getAccommodationByPackageId } from '../data/accommodations';
import { getTransportByPackageId } from '../data/transport';
import { getActivitiesByPackageId } from '../data/activities';
import { useCompareStore } from '../store/useStore';

import { Plane, Bus, Train, Ship, Car ,Scale, X,Activity,Star} from "lucide-react"; 
  
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { getPackageRating } from '@/data/reviews';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement
);

type TabType = 'overview' | 'accommodations' | 'activities' | 'transport' | 'meals' | 'analysis';

const ComparePage: React.FC = () => {
  const navigate = useNavigate();
  const compareList = useCompareStore((state) => state.compareList);
  const removeFromCompare = useCompareStore((state) => state.removeFromCompare);
  
  const [packages, setPackages] = useState<Package[]>([]);
  const [activeTab] = useState<TabType>('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const selectedPackages = compareList
      .map(id => getPackageById(id))
      .filter((pkg): pkg is Package => pkg !== undefined);
    setPackages(selectedPackages);
    setIsLoading(false);
  }, [compareList]);

  const getRadarChartData = () => {
    const labels = ['Value', 'Accommodation', 'Activities', 'Transport', 'Meals'];
  
    const maxPrice = Math.max(...packages.map(p => p.price));
    const maxActivities = Math.max(...packages.map(p => getActivitiesByPackageId(p.id)?.length ?? 0));
    const maxTransports = Math.max(...packages.map(p => getTransportByPackageId(p.id)?.length ?? 0));
    const maxMeals = Math.max(...packages.map(p => p.meal?.length ?? 0));
  
    const colors = [
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 99, 132, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(153, 102, 255, 0.2)',
    ];
  
    const borderColors = [
      'rgb(54, 162, 235)',
      'rgb(255, 99, 132)',
      'rgb(75, 192, 192)',
      'rgb(255, 206, 86)',
      'rgb(153, 102, 255)',
    ];
  
    const datasets = packages.map((pkg, index) => {
      const accommodation = getAccommodationByPackageId(pkg.id) ?? [];
      const transport = getTransportByPackageId(pkg.id) ?? [];
      const activities = getActivitiesByPackageId(pkg.id) ?? [];
      const meals = pkg.meal ?? [];
  
      // Normalized scores
      const valueScore = 100 - ((pkg.price / maxPrice) * 100); // lower price → higher score
      const accommodationScore =
        accommodation.length > 0
          ? (accommodation.reduce((sum, acc) => sum + acc.rating, 0) / (accommodation.length * 5)) * 100
          : 0;
      const activitiesScore = maxActivities > 0 ? (activities.length / maxActivities) * 100 : 0;
      const transportScore = maxTransports > 0 ? (transport.length / maxTransports) * 100 : 0;
      const mealsScore = maxMeals > 0 ? (meals.length / maxMeals) * 100 : 0;
  
      return {
        label: pkg.title,
        data: [valueScore, accommodationScore, activitiesScore, transportScore, mealsScore],
        backgroundColor: colors[index % colors.length],
        borderColor: borderColors[index % borderColors.length],
        borderWidth: 2,
      };
    });
  
    return { labels, datasets };
  };
  

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading comparison...</p>
        </div>
      </div>
    );
  }

  if (packages.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Scale className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">No Packages to Compare</h1>
            <p className="text-gray-600 mb-8">
              Select packages to compare by clicking the compare button on package cards.
            </p>
            <button
              onClick={() => navigate('/packages')}
              className="btn-primary"
            >
              Browse Packages
            </button>
          </div>
        </div>
      </div>
    );
  }

  {packages.map(pkg => {
    const destination = getDestinationById(pkg.destinationId);
    const accommodations = getAccommodationByPackageId(pkg.id) ?? [];
    const transport = getTransportByPackageId(pkg.id) ?? [];
    const activities = getActivitiesByPackageId(pkg.id) ?? [];
    const meals = pkg.meal ?? [];
    const rating = getPackageRating(pkg.id);
    return (
      <div key={pkg.id} className="relative">
        <button
          onClick={() => removeFromCompare(pkg.id)}
          className="absolute -top-2 -right-2 p-2 bg-white rounded-full shadow-md text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
  
        {/* Package Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <img
            src={pkg.mainImage}
            alt={pkg.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">{pkg.title}</h3>
            <p className="text-gray-600 mb-3">
              {destination?.name}, {destination?.country}
            </p>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-2xl font-bold">₹{pkg.price}</span>
              {pkg.discount && (
                <span className="text-green-600 text-sm font-medium">
                  Save {pkg.discount}%
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-amber-500">
              <Star className="h-5 w-5 fill-current" />
              <span className="font-medium">{rating.rating}</span>
              <span className="text-gray-500">({rating.count}+ reviews)</span>
            </div>
          </div>
        </div>
  
        {/* Tab Content */}
        {activeTab === 'accommodations' && accommodations.length > 0 && (
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium mb-4">Accommodation Details</h4>
            {accommodations.map((acc) => (
              <div key={acc.id} className="mb-4">
                <img
                  src={acc.image}
                  alt={acc.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <div>
                  <h5 className="font-medium">{acc.name}</h5>
                </div>
              </div>
            ))}
          </div>
        )}
  
        {activeTab === 'activities' && (
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium mb-4">Activities Included</h4>
            <div className="space-y-3">
            {activities && activities.length > 0 ? (
              <ul className="space-y-2">
                {activities.map((act, i) => (
                  <li key={act.id ?? i} className="flex items-center gap-2 text-sm">
                    <Activity className="h-4 w-4 text-primary-600" />
                    {act.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No activities scheduled</p>
            )}

            </div>
          </div>
        )}
  
        {activeTab === 'transport' && (
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium mb-4">Transportation</h4>
            <div className="space-y-4">
              {transport.map((t) => (
                <div key={t.id} className="flex items-start gap-3">
                  <div className="bg-primary-50 p-2 rounded-full">
                    {getTransportIcon(t.type)}
                  </div>
                  <div>
                    <h5 className="font-medium">{t.type}</h5>
                    <p className="text-sm text-gray-600">{t.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
  
        {activeTab === 'meals' && (
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium mb-4">Meals Included</h4>
            {meals.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {meals.map((meal, i) => (
                  <span
                    key={i}
                    className="bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-sm"
                  >
                    {meal}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No meals included</p>
            )}
          </div>
        )}
  
        {activeTab === 'analysis' && (
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium mb-6">Package Analysis Overview</h4>
            <div className="aspect-square">
              <Radar
                data={getRadarChartData()} // call once outside map if used for all packages
                options={{
                  scales: {
                    r: {
                      angleLines: { display: true },
                      suggestedMin: 0,
                      suggestedMax: 100,
                      ticks: { display: false },
                    },
                  },
                  plugins: {
                    legend: { position: 'bottom' },
                  },
                }}
              />
            </div>
            <div className="mt-6">
              <h5 className="font-medium mb-3">Insights</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <span className="font-medium text-gray-900">{pkg.title}</span>:
                  {transport.length > 0 ? ' Includes transportation,' : ' No transportation,'}
                  {' '}
                  {activities.length} activities, and {meals.length} meals included.
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  })}

  const getTransportIcon = (transport: string) => {
    switch (transport) {
      case 'flight': return <Plane className="h-5 w-5 text-blue-500" />;
      case 'bus': return <Bus className="h-5 w-5 text-green-500" />;
      case 'train': return <Train className="h-5 w-5 text-purple-500" />;
      case 'ship': return <Ship className="h-5 w-5 text-cyan-500" />;
      default: return <Car className="h-5 w-5 text-gray-500" />;
    }
  };
};

export default ComparePage;