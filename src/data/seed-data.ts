import { supabase } from '../lib/supabase';
import { destinations } from './destinations';
import { tourOperators } from './tour-operators';
import { accommodations } from './accommodations';
import { packages } from './packages';
import { activities } from './activities';
import { transport } from './transport';
import { meals } from './meals';
import { itineraries } from './itineraries';
import { reviews } from './reviews';

export async function seedDatabase() {
  console.log('Starting database seeding...');
  
  try {
    // Insert destinations
    console.log('Seeding destinations...');
    for (const destination of destinations) {
      const { error } = await supabase.from('destinations').upsert({
        id: destination.id,
        name: destination.name,
        country: destination.country,
        image: destination.image,
        description: destination.description,
        popular_months: destination.popularMonths,
        climate: destination.climate,
        languages: destination.languages,
        currency: destination.currency,
        time_zone: destination.timeZone,
        trending: destination.trending,
        searches: destination.searches
      });
      
      if (error) {
        console.error('Error inserting destination:', error);
      }
    }
    
    // Insert tour operators
    console.log('Seeding tour operators...');
    for (const operator of tourOperators) {
      const { error } = await supabase.from('tour_operators').upsert({
        id: operator.id,
        name: operator.name,
        logo: operator.logo,
        description: operator.description,
        rating: operator.rating,
        reviews: operator.reviews,
        years_in_business: operator.yearsInBusiness,
        specializations: operator.specializations,
        certifications: operator.certifications
      });
      
      if (error) {
        console.error('Error inserting tour operator:', error);
      }
    }
    
    // Insert accommodations
    console.log('Seeding accommodations...');
    for (const accommodation of accommodations) {
      const { error } = await supabase.from('accommodations').upsert({
        id: accommodation.id,
        name: accommodation.name,
        type: accommodation.type,
        rating: accommodation.rating,
        image: accommodation.image,
        location: accommodation.location,
        description: accommodation.description
      });
      
      if (error) {
        console.error('Error inserting accommodation:', error);
      }
      
      // Insert accommodation amenities
      for (const amenity of accommodation.amenities) {
        const { error: amenityError } = await supabase.from('accommodation_amenities').upsert({
          id: `${accommodation.id}_${amenity.replace(/\s+/g, '_').toLowerCase()}`,
          accommodation_id: accommodation.id,
          amenity: amenity
        });
        
        if (amenityError) {
          console.error('Error inserting accommodation amenity:', amenityError);
        }
      }
    }
    
    // Insert transports
    console.log('Seeding transports...');
    for (const item of transport) {
      const { error } = await supabase.from('transports').upsert({
        id: item.id,
        type: item.type,
        name: item.name,
        description: item.description
      });
      
      if (error) {
        console.error('Error inserting transport:', error);
      }
    }
    
    // Insert activities
    console.log('Seeding activities...');
    for (const activity of activities) {
      const { error } = await supabase.from('activities').upsert({
        id: activity.id,
        name: activity.name,
        type: activity.type,
        description: activity.description,
        duration: activity.duration,
        difficulty: activity.difficulty,
        image: activity.image,
        included: activity.included,
        price: activity.price,
        minimum_age: activity.minimumAge
      });
      
      if (error) {
        console.error('Error inserting activity:', error);
      }
    }
    
    // Insert meals
    console.log('Seeding meals...');
    for (const meal of meals) {
      const { error } = await supabase.from('meals').upsert({
        id: meal.id,
        name: meal.name,
        type: meal.type,
        cuisine: meal.cuisine,
        description: meal.description,
        image: meal.image,
        included: meal.included,
        price: meal.price
      });
      
      if (error) {
        console.error('Error inserting meal:', error);
      }
    }
    
    // Insert packages
    console.log('Seeding packages...');
    for (const pkg of packages) {
      const { error } = await supabase.from('packages').upsert({
        id: pkg.id,
        title: pkg.title,
        destination_id: pkg.destinationId,
        image: pkg.image,
        price: pkg.price,
        currency: pkg.currency,
        duration_days: pkg.duration_days,
        duration_nights: pkg.duration_nights,
        rating: pkg.rating,
        reviews: pkg.reviews,
        description: pkg.description,
        accommodation_id: pkg.accommodationId,
        tour_operator_id: pkg.tourOperatorId,
        featured: pkg.featured || false,
        discount: pkg.discount || null
      });
      
      if (error) {
        console.error('Error inserting package:', error);
      }
      
      // Insert package inclusions
      for (const inclusion of pkg.inclusions) {
        const { error: inclusionError } = await supabase.from('package_inclusions').upsert({
          id: `${pkg.id}_${inclusion.substring(0, 10).replace(/\s+/g, '_').toLowerCase()}`,
          package_id: pkg.id,
          description: inclusion
        });
        
        if (inclusionError) {
          console.error('Error inserting package inclusion:', inclusionError);
        }
      }
      
      // Insert package exclusions
      for (const exclusion of pkg.exclusions) {
        const { error: exclusionError } = await supabase.from('package_exclusions').upsert({
          id: `${pkg.id}_${exclusion.substring(0, 10).replace(/\s+/g, '_').toLowerCase()}`,
          package_id: pkg.id,
          description: exclusion
        });
        
        if (exclusionError) {
          console.error('Error inserting package exclusion:', exclusionError);
        }
      }
      
      // Insert package tags
      for (const tag of pkg.tags) {
        const { error: tagError } = await supabase.from('package_tags').upsert({
          id: `${pkg.id}_${tag.replace(/\s+/g, '_').toLowerCase()}`,
          package_id: pkg.id,
          tag: tag
        });
        
        if (tagError) {
          console.error('Error inserting package tag:', tagError);
        }
      }
      
      // Insert package transports
      for (const transportId of pkg.transportIds) {
        const { error: transportError } = await supabase.from('package_transports').upsert({
          id: `${pkg.id}_${transportId}`,
          package_id: pkg.id,
          transport_id: transportId
        });
        
        if (transportError) {
          console.error('Error inserting package transport:', transportError);
        }
      }
    }
    
    // Insert itineraries
    console.log('Seeding itineraries...');
    for (const day of itineraries) {
      const { error } = await supabase.from('itinerary_days').upsert({
        id: day.id,
        package_id: day.packageId,
        day: day.day,
        title: day.title,
        description: day.description,
        accommodation_id: day.accommodation,
        notes: day.notes
      });
      
      if (error) {
        console.error('Error inserting itinerary day:', error);
      }
      
      // Insert itinerary activities
      if (day.activities) {
        for (const activityId of day.activities) {
          const { error: activityError } = await supabase.from('itinerary_activities').upsert({
            id: `${day.id}_${activityId}`,
            itinerary_day_id: day.id,
            activity_id: activityId
          });
          
          if (activityError) {
            console.error('Error inserting itinerary activity:', activityError);
          }
        }
      }
      
      // Insert itinerary meals
      if (day.meals) {
        for (const mealId of day.meals) {
          const { error: mealError } = await supabase.from('itinerary_meals').upsert({
            id: `${day.id}_${mealId}`,
            itinerary_day_id: day.id,
            meal_id: mealId
          });
          
          if (mealError) {
            console.error('Error inserting itinerary meal:', mealError);
          }
        }
      }
      
      // Insert itinerary transports
      if (day.transport) {
        for (const transportId of day.transport) {
          const { error: transportError } = await supabase.from('itinerary_transports').upsert({
            id: `${day.id}_${transportId}`,
            itinerary_day_id: day.id,
            transport_id: transportId
          });
          
          if (transportError) {
            console.error('Error inserting itinerary transport:', transportError);
          }
        }
      }
    }
    
    // Insert reviews
    console.log('Seeding reviews...');
    for (const review of reviews) {
      const { error } = await supabase.from('reviews').upsert({
        id: review.id,
        package_id: review.packageId,
        user_id: review.userId,
        rating: review.rating,
        title: review.title,
        content: review.content,
        date: review.date,
        likes: review.likes,
        verified: review.verified
      });
      
      if (error) {
        console.error('Error inserting review:', error);
      }
    }
    
    console.log('Database seeding completed successfully!');
    return { success: true };
  } catch (error) {
    console.error('Error seeding database:', error);
    return { success: false, error };
  }
}