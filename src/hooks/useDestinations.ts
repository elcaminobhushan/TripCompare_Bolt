import { useState, useEffect } from 'react';
import { supabase, isSupabaseConnected } from '../lib/supabase';
import type { Destination } from '../types';
import { destinations as localDestinations } from '../data/destinations';


export function useDestinations() {
  const [data, setData] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchDestinations() {
      try {
        setIsLoading(true);
        
        // If Supabase is not connected, use local data
        if (!isSupabaseConnected()) {
          setData(localDestinations);
          return;
        }
        
        const { data: destinations, error } = await supabase
          .from('destinations')
          .select('*');

        if (error) throw error;
        
        // Transform the data to match our Destination type
        const transformedDestinations = destinations.map(dest => ({
          id: dest.id,
          name: dest.name,
          country: dest.country,
          image: dest.image,
          description: dest.description,
          popularMonths: dest.popular_months,
          climate: dest.climate,
          languages: dest.languages,
          currency: dest.currency,
          timeZone: dest.time_zone,
          trending: dest.trending,
          searches: dest.searches
        }));

        setData(transformedDestinations);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        console.error('Error fetching destinations:', err);
        // Fallback to local data on error
        setData(localDestinations);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDestinations();
  }, []);

  return { data, isLoading, error };
}

export function useDestination(_id: string) {
  const [data, setData] = useState<Destination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!_id) return;

    
    async function fetchDestination() {
      try {
        setIsLoading(true);
        
        // If Supabase is not connected, use local data
        if (!isSupabaseConnected()) {
          const destination = localDestinations.find(d => d.id === _id);
          if (destination) {
            setData(destination);
          }
          return;
        }
        
        const { data: destination, error } = await supabase
          .from('destinations')
          .select('*').eq('id', _id)
          .single();

        if (error) throw error;
        
        // Transform the data to match our Destination type
        const transformedDestination = {
          id: destination.id,
          name: destination.name,
          country: destination.country,
          image: destination.image,
          description: destination.description,
          popularMonths: destination.popular_months,
          climate: destination.climate,
          languages: destination.languages,
          currency: destination.currency,
          timeZone: destination.time_zone,
          trending: destination.trending,
          searches: destination.searches
        };

        setData(transformedDestination);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        console.error('Error fetching destination:', err);
      } finally {
        setIsLoading(false);
      }
    }

    if (_id) {
      fetchDestination();
    }
  }, [_id]);

  return { data, isLoading, error };
}

export function usePopularDestinations(_limit: number = 6) {
  const [data, setData] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPopularDestinations() {
      try {
        setIsLoading(true);
        const { data: destinations, error } = await supabase
          .from('destinations')
          .select('*')
          .order('searches', { ascending: false })
          .limit(_limit);

        if (error) throw error;
        
        // Transform the data to match our Destination type
        const transformedDestinations = destinations.map(dest => ({
          id: dest.id,
          name: dest.name,
          country: dest.country,
          image: dest.image,
          description: dest.description,
          popularMonths: dest.popular_months,
          climate: dest.climate,
          languages: dest.languages,
          currency: dest.currency,
          timeZone: dest.time_zone,
          trending: dest.trending,
          searches: dest.searches
        }));

        setData(transformedDestinations);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        console.error('Error fetching popular destinations:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPopularDestinations();
  }, [_limit]);

  return { data, isLoading, error };
}