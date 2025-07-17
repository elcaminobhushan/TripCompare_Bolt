import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Please connect to Supabase using the "Connect to Supabase" button.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      packages: {
        Row: {
          id: string;
          title: string;
          destination_id: string;
          image: string;
          price: number;
          currency: string;
          duration_days: number;
          duration_nights: number;
          rating: number;
          reviews: number;
          description: string;
          accommodation_id: string;
          tour_operator_id: string;
          featured: boolean;
          discount: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          title: string;
          destination_id: string;
          image: string;
          price: number;
          currency: string;
          duration_days: number;
          duration_nights: number;
          rating: number;
          reviews: number;
          description: string;
          accommodation_id: string;
          tour_operator_id: string;
          featured?: boolean;
          discount?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          destination_id?: string;
          image?: string;
          price?: number;
          currency?: string;
          duration_days?: number;
          duration_nights?: number;
          rating?: number;
          reviews?: number;
          description?: string;
          accommodation_id?: string;
          tour_operator_id?: string;
          featured?: boolean;
          discount?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      destinations: {
        Row: {
          id: string;
          name: string;
          country: string;
          image: string;
          description: string;
          popular_months: string[];
          climate: string;
          languages: string[];
          currency: string;
          time_zone: string;
          trending: boolean;
          searches: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          country: string;
          image: string;
          description: string;
          popular_months: string[];
          climate: string;
          languages: string[];
          currency: string;
          time_zone: string;
          trending?: boolean;
          searches?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          country?: string;
          image?: string;
          description?: string;
          popular_months?: string[];
          climate?: string;
          languages?: string[];
          currency?: string;
          time_zone?: string;
          trending?: boolean;
          searches?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      tour_operators: {
        Row: {
          id: string;
          name: string;
          logo: string;
          description: string;
          rating: number;
          reviews: number;
          years_in_business: number;
          specializations: string[];
          certifications: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          logo: string;
          description: string;
          rating: number;
          reviews: number;
          years_in_business: number;
          specializations: string[];
          certifications: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          logo?: string;
          description?: string;
          rating?: number;
          reviews?: number;
          years_in_business?: number;
          specializations?: string[];
          certifications?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      package_inclusions: {
        Row: {
          id: string;
          package_id: string;
          description: string;
          created_at: string;
        };
        Insert: {
          id: string;
          package_id: string;
          description: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          package_id?: string;
          description?: string;
          created_at?: string;
        };
      };
      package_exclusions: {
        Row: {
          id: string;
          package_id: string;
          description: string;
          created_at: string;
        };
        Insert: {
          id: string;
          package_id: string;
          description: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          package_id?: string;
          description?: string;
          created_at?: string;
        };
      };
      package_tags: {
        Row: {
          id: string;
          package_id: string;
          tag: string;
          created_at: string;
        };
        Insert: {
          id: string;
          package_id: string;
          tag: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          package_id?: string;
          tag?: string;
          created_at?: string;
        };
      };
      package_transports: {
        Row: {
          id: string;
          package_id: string;
          transport_id: string;
          created_at: string;
        };
        Insert: {
          id: string;
          package_id: string;
          transport_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          package_id?: string;
          transport_id?: string;
          created_at?: string;
        };
      };
      transports: {
        Row: {
          id: string;
          type: string;
          name: string;
          description: string;
          created_at: string;
        };
        Insert: {
          id: string;
          type: string;
          name: string;
          description: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          type?: string;
          name?: string;
          description?: string;
          created_at?: string;
        };
      };
      accommodations: {
        Row: {
          id: string;
          name: string;
          type: string;
          rating: number;
          image: string;
          location: string;
          description: string;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          type: string;
          rating: number;
          image: string;
          location: string;
          description: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          type?: string;
          rating?: number;
          image?: string;
          location?: string;
          description?: string;
          created_at?: string;
        };
      };
      accommodation_amenities: {
        Row: {
          id: string;
          accommodation_id: string;
          amenity: string;
          created_at: string;
        };
        Insert: {
          id: string;
          accommodation_id: string;
          amenity: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          accommodation_id?: string;
          amenity?: string;
          created_at?: string;
        };
      };
      itinerary_days: {
        Row: {
          id: string;
          package_id: string;
          day: number;
          title: string;
          description: string;
          accommodation_id: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          package_id: string;
          day: number;
          title: string;
          description: string;
          accommodation_id?: string | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          package_id?: string;
          day?: number;
          title?: string;
          description?: string;
          accommodation_id?: string | null;
          notes?: string | null;
          created_at?: string;
        };
      };
      itinerary_activities: {
        Row: {
          id: string;
          itinerary_day_id: string;
          activity_id: string;
          created_at: string;
        };
        Insert: {
          id: string;
          itinerary_day_id: string;
          activity_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          itinerary_day_id?: string;
          activity_id?: string;
          created_at?: string;
        };
      };
      activities: {
        Row: {
          id: string;
          name: string;
          type: string;
          description: string;
          duration: number;
          difficulty: string;
          image: string;
          included: boolean;
          price: number | null;
          minimum_age: number | null;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          type: string;
          description: string;
          duration: number;
          difficulty: string;
          image: string;
          included: boolean;
          price?: number | null;
          minimum_age?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          type?: string;
          description?: string;
          duration?: number;
          difficulty?: string;
          image?: string;
          included?: boolean;
          price?: number | null;
          minimum_age?: number | null;
          created_at?: string;
        };
      };
      itinerary_transports: {
        Row: {
          id: string;
          itinerary_day_id: string;
          transport_id: string;
          created_at: string;
        };
        Insert: {
          id: string;
          itinerary_day_id: string;
          transport_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          itinerary_day_id?: string;
          transport_id?: string;
          created_at?: string;
        };
      };
      itinerary_meals: {
        Row: {
          id: string;
          itinerary_day_id: string;
          meal_id: string;
          created_at: string;
        };
        Insert: {
          id: string;
          itinerary_day_id: string;
          meal_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          itinerary_day_id?: string;
          meal_id?: string;
          created_at?: string;
        };
      };
      meals: {
        Row: {
          id: string;
          name: string;
          type: string;
          cuisine: string;
          description: string;
          image: string;
          included: boolean;
          price: number | null;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          type: string;
          cuisine: string;
          description: string;
          image: string;
          included: boolean;
          price?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          type?: string;
          cuisine?: string;
          description?: string;
          image?: string;
          included?: boolean;
          price?: number | null;
          created_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          package_id: string;
          user_id: string;
          rating: number;
          title: string;
          content: string;
          date: string;
          likes: number;
          verified: boolean;
          created_at: string;
        };
        Insert: {
          id: string;
          package_id: string;
          user_id: string;
          rating: number;
          title: string;
          content: string;
          date: string;
          likes: number;
          verified: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          package_id?: string;
          user_id?: string;
          rating?: number;
          title?: string;
          content?: string;
          date?: string;
          likes?: number;
          verified?: boolean;
          created_at?: string;
        };
      };
    };
  };
};