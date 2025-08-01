export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      accommodation_amenities: {
        Row: {
          accommodation_id: string
          amenity: string
          created_at: string
          id: string
        }
        Insert: {
          accommodation_id: string
          amenity: string
          created_at?: string
          id?: string
        }
        Update: {
          accommodation_id?: string
          amenity?: string
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "accommodation_amenities_accommodation_id_fkey"
            columns: ["accommodation_id"]
            isOneToOne: false
            referencedRelation: "accommodations"
            referencedColumns: ["id"]
          },
        ]
      }
      accommodations: {
        Row: {
          created_at: string
          description: string
          id: string
          image: string
          location: string
          name: string
          rating: number
          type: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          image: string
          location: string
          name: string
          rating: number
          type: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          image?: string
          location?: string
          name?: string
          rating?: number
          type?: string
        }
        Relationships: []
      }
      activities: {
        Row: {
          created_at: string
          description: string
          difficulty: string
          duration: number
          id: string
          image: string
          included: boolean
          minimum_age: number | null
          name: string
          price: number | null
          type: string
        }
        Insert: {
          created_at?: string
          description: string
          difficulty: string
          duration: number
          id?: string
          image: string
          included?: boolean
          minimum_age?: number | null
          name: string
          price?: number | null
          type: string
        }
        Update: {
          created_at?: string
          description?: string
          difficulty?: string
          duration?: number
          id?: string
          image?: string
          included?: boolean
          minimum_age?: number | null
          name?: string
          price?: number | null
          type?: string
        }
        Relationships: []
      }
      destinations: {
        Row: {
          climate: string
          country: string
          created_at: string
          currency: string
          description: string
          id: string
          image: string
          languages: string[]
          name: string
          popular_months: string[]
          searches: number
          time_zone: string
          trending: boolean
          updated_at: string
        }
        Insert: {
          climate: string
          country: string
          created_at?: string
          currency: string
          description: string
          id?: string
          image: string
          languages: string[]
          name: string
          popular_months: string[]
          searches?: number
          time_zone: string
          trending?: boolean
          updated_at?: string
        }
        Update: {
          climate?: string
          country?: string
          created_at?: string
          currency?: string
          description?: string
          id?: string
          image?: string
          languages?: string[]
          name?: string
          popular_months?: string[]
          searches?: number
          time_zone?: string
          trending?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      itinerary_activities: {
        Row: {
          activity_id: string
          created_at: string
          id: string
          itinerary_day_id: string
        }
        Insert: {
          activity_id: string
          created_at?: string
          id?: string
          itinerary_day_id: string
        }
        Update: {
          activity_id?: string
          created_at?: string
          id?: string
          itinerary_day_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "itinerary_activities_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "itinerary_activities_itinerary_day_id_fkey"
            columns: ["itinerary_day_id"]
            isOneToOne: false
            referencedRelation: "itinerary_days"
            referencedColumns: ["id"]
          },
        ]
      }
      itinerary_days: {
        Row: {
          accommodation_id: string | null
          created_at: string
          day: number
          description: string
          id: string
          notes: string | null
          package_id: string
          title: string
        }
        Insert: {
          accommodation_id?: string | null
          created_at?: string
          day: number
          description: string
          id?: string
          notes?: string | null
          package_id: string
          title: string
        }
        Update: {
          accommodation_id?: string | null
          created_at?: string
          day?: number
          description?: string
          id?: string
          notes?: string | null
          package_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "itinerary_days_accommodation_id_fkey"
            columns: ["accommodation_id"]
            isOneToOne: false
            referencedRelation: "accommodations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "itinerary_days_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      itinerary_meals: {
        Row: {
          created_at: string
          id: string
          itinerary_day_id: string
          meal_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          itinerary_day_id: string
          meal_id: string
        }
        Update: {
          created_at?: string
          id?: string
          itinerary_day_id?: string
          meal_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "itinerary_meals_itinerary_day_id_fkey"
            columns: ["itinerary_day_id"]
            isOneToOne: false
            referencedRelation: "itinerary_days"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "itinerary_meals_meal_id_fkey"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals"
            referencedColumns: ["id"]
          },
        ]
      }
      itinerary_transports: {
        Row: {
          created_at: string
          id: string
          itinerary_day_id: string
          transport_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          itinerary_day_id: string
          transport_id: string
        }
        Update: {
          created_at?: string
          id?: string
          itinerary_day_id?: string
          transport_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "itinerary_transports_itinerary_day_id_fkey"
            columns: ["itinerary_day_id"]
            isOneToOne: false
            referencedRelation: "itinerary_days"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "itinerary_transports_transport_id_fkey"
            columns: ["transport_id"]
            isOneToOne: false
            referencedRelation: "transports"
            referencedColumns: ["id"]
          },
        ]
      }
      meals: {
        Row: {
          created_at: string
          cuisine: string
          description: string
          id: string
          image: string
          included: boolean
          name: string
          price: number | null
          type: string
        }
        Insert: {
          created_at?: string
          cuisine: string
          description: string
          id?: string
          image: string
          included?: boolean
          name: string
          price?: number | null
          type: string
        }
        Update: {
          created_at?: string
          cuisine?: string
          description?: string
          id?: string
          image?: string
          included?: boolean
          name?: string
          price?: number | null
          type?: string
        }
        Relationships: []
      }
      package_exclusions: {
        Row: {
          created_at: string
          description: string
          id: string
          package_id: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          package_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          package_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "package_exclusions_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      package_inclusions: {
        Row: {
          created_at: string
          description: string
          id: string
          package_id: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          package_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          package_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "package_inclusions_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      package_tags: {
        Row: {
          created_at: string
          id: string
          package_id: string
          tag: string
        }
        Insert: {
          created_at?: string
          id?: string
          package_id: string
          tag: string
        }
        Update: {
          created_at?: string
          id?: string
          package_id?: string
          tag?: string
        }
        Relationships: [
          {
            foreignKeyName: "package_tags_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      package_transports: {
        Row: {
          created_at: string
          id: string
          package_id: string
          transport_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          package_id: string
          transport_id: string
        }
        Update: {
          created_at?: string
          id?: string
          package_id?: string
          transport_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "package_transports_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "package_transports_transport_id_fkey"
            columns: ["transport_id"]
            isOneToOne: false
            referencedRelation: "transports"
            referencedColumns: ["id"]
          },
        ]
      }
      packages: {
        Row: {
          accommodation_id: string
          created_at: string
          currency: string
          description: string
          destination_id: string
          discount: number | null
          duration_days: number
          duration_nights: number
          featured: boolean
          id: string
          image: string
          price: number
          rating: number
          reviews: number
          title: string
          tour_operator_id: string
          updated_at: string
        }
        Insert: {
          accommodation_id: string
          created_at?: string
          currency?: string
          description: string
          destination_id: string
          discount?: number | null
          duration_days: number
          duration_nights: number
          featured?: boolean
          id?: string
          image: string
          price: number
          rating: number
          reviews?: number
          title: string
          tour_operator_id: string
          updated_at?: string
        }
        Update: {
          accommodation_id?: string
          created_at?: string
          currency?: string
          description?: string
          destination_id?: string
          discount?: number | null
          duration_days?: number
          duration_nights?: number
          featured?: boolean
          id?: string
          image?: string
          price?: number
          rating?: number
          reviews?: number
          title?: string
          tour_operator_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_packages_accommodation"
            columns: ["accommodation_id"]
            isOneToOne: false
            referencedRelation: "accommodations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_packages_destination"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_packages_tour_operator"
            columns: ["tour_operator_id"]
            isOneToOne: false
            referencedRelation: "tour_operators"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          content: string
          created_at: string
          date: string
          id: string
          likes: number
          package_id: string
          rating: number
          title: string
          user_id: string
          verified: boolean
        }
        Insert: {
          content: string
          created_at?: string
          date: string
          id?: string
          likes?: number
          package_id: string
          rating: number
          title: string
          user_id: string
          verified?: boolean
        }
        Update: {
          content?: string
          created_at?: string
          date?: string
          id?: string
          likes?: number
          package_id?: string
          rating?: number
          title?: string
          user_id?: string
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "reviews_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      tour_operators: {
        Row: {
          certifications: string[]
          created_at: string
          description: string
          id: string
          logo: string
          name: string
          rating: number
          reviews: number
          specializations: string[]
          updated_at: string
          years_in_business: number
        }
        Insert: {
          certifications: string[]
          created_at?: string
          description: string
          id?: string
          logo: string
          name: string
          rating: number
          reviews?: number
          specializations: string[]
          updated_at?: string
          years_in_business: number
        }
        Update: {
          certifications?: string[]
          created_at?: string
          description?: string
          id?: string
          logo?: string
          name?: string
          rating?: number
          reviews?: number
          specializations?: string[]
          updated_at?: string
          years_in_business?: number
        }
        Relationships: []
      }
      transports: {
        Row: {
          created_at: string
          description: string
          id: string
          name: string
          type: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          name: string
          type: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          name?: string
          type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
