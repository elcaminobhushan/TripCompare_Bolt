export interface Package {
  id: string;
  title: string;
  destinationId: string;
  mainImage: string;
  images: string [];
  price: number;
  currency: string;
  duration_days: number;
  duration_nights: number;
  description: string;
  inclusions: string[];
  exclusions: string[];
  featured?: boolean;
  discount?: number;
  departureLocations: string[]; // References to location IDs
  tourOperatorId: string;
  itineraryPdf : string;
  meal: string[];
  tags: string[];
}


export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  popularMonths: string[];
  climate: string;
  languages: string[];
  currency: string;
  timeZone: string;
  trending: boolean;
  searches: number;
}

export interface TourOperator {
  id: string;
  name: string;
  logo: string;
  description: string;
  rating: number;
  reviews: number;
  yearsInBusiness: number;
  specializations: string[];
  certifications: string[];
  locationId: string;
}

export interface Accommodation {
  id: string;
  name: string;
  type: string;
  rating: number;
  amenityIds: string[];
  image: string;
  locationId: string;
  description: string;
}

export interface Transport {
  id: string;
  itenaryId: string;
  type: string;
  name: string;
  source: string;
  destination: string;
  description: string;
}

export interface Activity {
  id: string;
  name: string;
  type: string;
  description: string;
  duration: number;
  difficulty: string;
  image: string;
  included: boolean;
  price?: number;
  locationId: string;
  tagIds: string[];
}

export interface Review {
  id: string;
  packageId: string;
  userId: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  likes: number;
  imageIds?: string[];
  verified: boolean;
  response?: {
    from: string;
    content: string;
    date: string;
  };
}

export interface Rating {
  id: string;
  packageId: string;
  category: string;
  score: number;
  count: number;
}

export interface Tag {
  id: string;
  name: string;
  category: string;
  icon?: string;
}

export interface Location {
  id: string;
  name: string;
  type: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  description: string;
  image: string;
  parentLocationId?: string;
}

export interface Image {
  id: string;
  url: string;
  type: string;
  title: string;
  description?: string;
  featured: boolean;
}

export interface Meal {
  id: string;
  name: string;
  type: string;
  cuisine: string;
  description: string;
  image: string;
  dietary?: {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    halal: boolean;
    kosher: boolean;
  };
  included: boolean;
  price?: number;
}

export interface Amenity {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  image?: string;
}

export interface ItineraryDay {
  id: string;
  packageId: string;
  day: number;
  title: string;
  description: string;
  notes?: string;
}