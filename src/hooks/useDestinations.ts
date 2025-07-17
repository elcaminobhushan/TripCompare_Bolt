import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Destination } from '../types';

export function useDestinations() {
  const [data, setData] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchDestinations() {
      try {
        setIsLoading(true);
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
    async function fetchDestination() {
      try {
        setIsLoading(true);
        const { data: destination, error } = await supabase
          .from('destinations')
          .select('*')
          .eq('id', id)
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

    if (id) {
      fetchDestination();
    }
  }, [id]);

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
          .limit(limit);

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
  }, [limit]);

  return { data, isLoading, error };
}