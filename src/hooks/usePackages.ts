import { useState, useEffect } from 'react';
import { supabase, isSupabaseConnected } from '../lib/supabase';
import type { Package } from '../types';
import { packages as localPackages } from '../data/packages';

export function usePackages() {
  const [data, setData] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPackages() {
      try {
        setIsLoading(true);
        
        // If Supabase is not connected, use local data
        if (!isSupabaseConnected()) {
          setData(localPackages);
          return;
        }
        
        const { data: packages, error } = await supabase
          .from('packages')
          .select(`
            *,
            destination:destinations(*),
            accommodation:accommodations(*),
            tour_operator:tour_operators(*),
            inclusions:package_inclusions(description),
            exclusions:package_exclusions(description),
            tags:package_tags(tag),
            transports:package_transports(transport:transports(*))
          `);

        if (error) throw error;
        
        // Transform the data to match our Package type
        const transformedPackages = packages.map(pkg => ({
          id: pkg.id,
          title: pkg.title,
          destinationId: pkg.destination_id,
          mainImage: pkg.mainImage,
          images: pkg.images,
          price: pkg.price,
          currency: pkg.currency,
          duration_days: pkg.duration_days,
          duration_nights: pkg.duration_nights,
          description: pkg.description,
          tags : pkg.tags,
          tourOperatorId: pkg.tour_operator_id,
          inclusions: pkg.inclusions.map((i: any) => i.description),
          exclusions: pkg.exclusions.map((e: any) => e.description),
          featured: pkg.featured,
          discount: pkg.discount,
          departureLocations: pkg.departureLocations,
          itineraryPdf: pkg.itineraryPdf,
          meal : pkg.meal
        }));

        setData(transformedPackages);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        console.error('Error fetching packages:', err);
        // Fallback to local data on error
        setData(localPackages);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPackages();
  }, []);

  return { data, isLoading, error };
}

export function usePackage(id: string) {
  const [data, setData] = useState<Package | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;
    
    async function fetchPackage() {
      try {
        setIsLoading(true);
        
        // If Supabase is not connected, use local data
        if (!isSupabaseConnected()) {
          const pkg = localPackages.find(p => p.id === id);
          if (pkg) {
            setData(pkg);
          }
          return;
        }
        
        const { data: pkg, error } = await supabase
          .from('packages')
          .select(`
            *,
            destination:destinations(*),
            accommodation:accommodations(*),
            tour_operator:tour_operators(*),
            inclusions:package_inclusions(description),
            exclusions:package_exclusions(description),
            tags:package_tags(tag),
            transports:package_transports(transport:transports(*))
          `)
          .eq('id', id)
          .single();

        if (error) throw error;
        
        // Transform the data to match our Package type
        const transformedPackage = {
          id: pkg.id,
          title: pkg.title,
          destinationId: pkg.destination_id,
          mainImage: pkg.mainImage,
          images: pkg.images,
          price: pkg.price,
          currency: pkg.currency,
          duration_days: pkg.duration_days,
          duration_nights: pkg.duration_nights,
          description: pkg.description,
          tourOperatorId: pkg.tour_operator_id,
          inclusions: pkg.inclusions.map((i: any) => i.description),
          exclusions: pkg.exclusions.map((e: any) => e.description),
          featured: pkg.featured,
          discount: pkg.discount,
          departureLocations: pkg.departureLocations,
          itineraryPdf: pkg.itineraryPdf,
          meal : pkg.meal,
          tags : pkg.tags
        };

        setData(transformedPackage);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        console.error('Error fetching package:', err);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchPackage();
    }
  }, [id]);

  return { data, isLoading, error };
}

export function useRelatedPackages(id: string, limit: number = 3) {
  const [data, setData] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchRelatedPackages() {
      try {
        setIsLoading(true);
        
        // First get the destination_id of the current package
        const { data: currentPackage, error: packageError } = await supabase
          .from('packages')
          .select('destination_id')
          .eq('id', id)
          .single();

        if (packageError) throw packageError;

        // Then get other packages with the same destination_id
        const { data: relatedPackages, error } = await supabase
          .from('packages')
          .select(`
            *,
            destination:destinations(*),
            accommodation:accommodations(*),
            tour_operator:tour_operators(*),
            inclusions:package_inclusions(description),
            exclusions:package_exclusions(description),
            tags:package_tags(tag),
            transports:package_transports(transport:transports(*))
          `)
          .eq('destination_id', currentPackage.destination_id)
          .neq('id', id)
          .limit(limit);

        if (error) throw error;
        
        // Transform the data to match our Package type
        const transformedPackages = relatedPackages.map(pkg => ({
          id: pkg.id,
          title: pkg.title,
          destinationId: pkg.destination_id,
          mainImage: pkg.mainImage,
          images: pkg.images,
          price: pkg.price,
          currency: pkg.currency,
          duration_days: pkg.duration_days,
          duration_nights: pkg.duration_nights,
          description: pkg.description,
          tourOperatorId: pkg.tour_operator_id,
          inclusions: pkg.inclusions.map((i: any) => i.description),
          exclusions: pkg.exclusions.map((e: any) => e.description),
          featured: pkg.featured,
          discount: pkg.discount,
          departureLocations: pkg.departureLocations,
          itineraryPdf: pkg.itineraryPdf,
          meal : pkg.meal,
          tags : pkg.tags
        }));

        setData(transformedPackages);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        console.error('Error fetching related packages:', err);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchRelatedPackages();
    }
  }, [id, limit]);

  return { data, isLoading, error };
}

export function useFilteredPackages(filters: any) {
  const [data, setData] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchFilteredPackages() {
      try {
        setIsLoading(true);
        
        let query = supabase
          .from('packages')
          .select(`
            *,
            destination:destinations(*),
            accommodation:accommodations(*),
            tour_operator:tour_operators(*),
            inclusions:package_inclusions(description),
            exclusions:package_exclusions(description),
            tags:package_tags(tag),
            transports:package_transports(transport:transports(*))
          `);

        // Apply filters
        if (filters.priceRange) {
          query = query
            .gte('price', filters.priceRange[0])
            .lte('price', filters.priceRange[1]);
        }

        if (filters.duration) {
          query = query
            .gte('duration_days', filters.duration[0])
            .lte('duration_days', filters.duration[1]);
        }

        if (filters.rating) {
          query = query.gte('rating', filters.rating);
        }

        if (filters.destinationId) {
          query = query.eq('destination_id', filters.destinationId);
        }

        const { data: filteredPackages, error } = await query;

        if (error) throw error;
        
        // Transform the data to match our Package type
        const transformedPackages = filteredPackages.map(pkg => ({
          id: pkg.id,
          title: pkg.title,
          destinationId: pkg.destination_id,
          mainImage: pkg.mainImage,
          images: pkg.images,
          price: pkg.price,
          currency: pkg.currency,
          duration_days: pkg.duration_days,
          duration_nights: pkg.duration_nights,
          description: pkg.description,
          tourOperatorId: pkg.tour_operator_id,
          inclusions: pkg.inclusions.map((i: any) => i.description),
          exclusions: pkg.exclusions.map((e: any) => e.description),
          featured: pkg.featured,
          discount: pkg.discount,
          departureLocations: pkg.departureLocations,
          itineraryPdf: pkg.itineraryPdf,
          meal : pkg.meal,
          tags : pkg.tags
        }));

        setData(transformedPackages);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        console.error('Error fetching filtered packages:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFilteredPackages();
  }, [filters]);

  return { data, isLoading, error };
}