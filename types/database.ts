export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          city: string
          country: string
          created_at: string
          id: string
          is_default: boolean
          label: string | null
          line1: string
          line2: string | null
          postal_code: string
          profile_id: string
          region: string | null
        }
        Insert: {
          city: string
          country: string
          created_at?: string
          id?: string
          is_default?: boolean
          label?: string | null
          line1: string
          line2?: string | null
          postal_code: string
          profile_id: string
          region?: string | null
        }
        Update: {
          city?: string
          country?: string
          created_at?: string
          id?: string
          is_default?: boolean
          label?: string | null
          line1?: string
          line2?: string | null
          postal_code?: string
          profile_id?: string
          region?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "addresses_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_id: string | null
          body: string | null
          cover_image: string | null
          created_at: string
          id: string
          is_published: boolean
          published_at: string | null
          slug: string
          summary: string | null
          title: string
        }
        Insert: {
          author_id?: string | null
          body?: string | null
          cover_image?: string | null
          created_at?: string
          id?: string
          is_published?: boolean
          published_at?: string | null
          slug: string
          summary?: string | null
          title: string
        }
        Update: {
          author_id?: string | null
          body?: string | null
          cover_image?: string | null
          created_at?: string
          id?: string
          is_published?: boolean
          published_at?: string | null
          slug?: string
          summary?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_experiences: {
        Row: {
          booking_id: string
          experience_id: string
          quantity: number
        }
        Insert: {
          booking_id: string
          experience_id: string
          quantity?: number
        }
        Update: {
          booking_id?: string
          experience_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "booking_experiences_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_experiences_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          check_in: string
          check_out: string
          created_at: string
          guests: number
          id: string
          profile_id: string
          sanctuary_id: string
          status: Database["public"]["Enums"]["booking_status"]
          stay_range: unknown
          total_cents: number
        }
        Insert: {
          check_in: string
          check_out: string
          created_at?: string
          guests?: number
          id?: string
          profile_id: string
          sanctuary_id: string
          status?: Database["public"]["Enums"]["booking_status"]
          stay_range?: unknown
          total_cents: number
        }
        Update: {
          check_in?: string
          check_out?: string
          created_at?: string
          guests?: number
          id?: string
          profile_id?: string
          sanctuary_id?: string
          status?: Database["public"]["Enums"]["booking_status"]
          stay_range?: unknown
          total_cents?: number
        }
        Relationships: [
          {
            foreignKeyName: "bookings_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_sanctuary_id_fkey"
            columns: ["sanctuary_id"]
            isOneToOne: false
            referencedRelation: "sanctuaries"
            referencedColumns: ["id"]
          },
        ]
      }
      cart_items: {
        Row: {
          cart_id: string
          created_at: string
          id: string
          product_variant_id: string
          quantity: number
        }
        Insert: {
          cart_id: string
          created_at?: string
          id?: string
          product_variant_id: string
          quantity: number
        }
        Update: {
          cart_id?: string
          created_at?: string
          id?: string
          product_variant_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "carts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_product_variant_id_fkey"
            columns: ["product_variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      carts: {
        Row: {
          created_at: string
          id: string
          profile_id: string | null
          session_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          profile_id?: string | null
          session_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          profile_id?: string | null
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "carts_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      case_studies: {
        Row: {
          body: string | null
          cover_image: string | null
          created_at: string
          id: string
          is_published: boolean
          published_at: string | null
          slug: string
          summary: string | null
          title: string
        }
        Insert: {
          body?: string | null
          cover_image?: string | null
          created_at?: string
          id?: string
          is_published?: boolean
          published_at?: string | null
          slug: string
          summary?: string | null
          title: string
        }
        Update: {
          body?: string | null
          cover_image?: string | null
          created_at?: string
          id?: string
          is_published?: boolean
          published_at?: string | null
          slug?: string
          summary?: string | null
          title?: string
        }
        Relationships: []
      }
      commodities: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          images: string[]
          is_published: boolean
          name: string
          slug: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          images?: string[]
          is_published?: boolean
          name: string
          slug: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          images?: string[]
          is_published?: boolean
          name?: string
          slug?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          division: string | null
          email: string
          id: string
          message: string
          name: string
          subject: string | null
        }
        Insert: {
          created_at?: string
          division?: string | null
          email: string
          id?: string
          message: string
          name: string
          subject?: string | null
        }
        Update: {
          created_at?: string
          division?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          subject?: string | null
        }
        Relationships: []
      }
      experiences: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_published: boolean
          name: string
          price_cents: number
          sanctuary_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean
          name: string
          price_cents: number
          sanctuary_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_published?: boolean
          name?: string
          price_cents?: number
          sanctuary_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "experiences_sanctuary_id_fkey"
            columns: ["sanctuary_id"]
            isOneToOne: false
            referencedRelation: "sanctuaries"
            referencedColumns: ["id"]
          },
        ]
      }
      inquiries: {
        Row: {
          commodity_id: string | null
          company_name: string
          contact_name: string
          created_at: string
          email: string
          id: string
          message: string
          phone: string | null
          status: Database["public"]["Enums"]["inquiry_status"]
        }
        Insert: {
          commodity_id?: string | null
          company_name: string
          contact_name: string
          created_at?: string
          email: string
          id?: string
          message: string
          phone?: string | null
          status?: Database["public"]["Enums"]["inquiry_status"]
        }
        Update: {
          commodity_id?: string | null
          company_name?: string
          contact_name?: string
          created_at?: string
          email?: string
          id?: string
          message?: string
          phone?: string | null
          status?: Database["public"]["Enums"]["inquiry_status"]
        }
        Relationships: [
          {
            foreignKeyName: "inquiries_commodity_id_fkey"
            columns: ["commodity_id"]
            isOneToOne: false
            referencedRelation: "commodities"
            referencedColumns: ["id"]
          },
        ]
      }
      investor_documents: {
        Row: {
          category: string | null
          created_at: string
          file_url: string
          id: string
          title: string
          visibility: Database["public"]["Enums"]["document_visibility"]
        }
        Insert: {
          category?: string | null
          created_at?: string
          file_url: string
          id?: string
          title: string
          visibility?: Database["public"]["Enums"]["document_visibility"]
        }
        Update: {
          category?: string | null
          created_at?: string
          file_url?: string
          id?: string
          title?: string
          visibility?: Database["public"]["Enums"]["document_visibility"]
        }
        Relationships: []
      }
      investor_memberships: {
        Row: {
          joined_at: string
          profile_id: string
          tier: Database["public"]["Enums"]["membership_tier"]
        }
        Insert: {
          joined_at?: string
          profile_id: string
          tier?: Database["public"]["Enums"]["membership_tier"]
        }
        Update: {
          joined_at?: string
          profile_id?: string
          tier?: Database["public"]["Enums"]["membership_tier"]
        }
        Relationships: [
          {
            foreignKeyName: "investor_memberships_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          cover_letter: string | null
          created_at: string
          email: string
          id: string
          job_posting_id: string
          name: string
          resume_url: string | null
        }
        Insert: {
          cover_letter?: string | null
          created_at?: string
          email: string
          id?: string
          job_posting_id: string
          name: string
          resume_url?: string | null
        }
        Update: {
          cover_letter?: string | null
          created_at?: string
          email?: string
          id?: string
          job_posting_id?: string
          name?: string
          resume_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_posting_id_fkey"
            columns: ["job_posting_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
        ]
      }
      job_postings: {
        Row: {
          created_at: string
          department: string | null
          description: string | null
          employment_type: string | null
          id: string
          is_published: boolean
          location: string | null
          title: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          description?: string | null
          employment_type?: string | null
          id?: string
          is_published?: boolean
          location?: string | null
          title: string
        }
        Update: {
          created_at?: string
          department?: string | null
          description?: string | null
          employment_type?: string | null
          id?: string
          is_published?: boolean
          location?: string | null
          title?: string
        }
        Relationships: []
      }
      media_bookings: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          preferred_date: string | null
          project_type: string | null
          status: Database["public"]["Enums"]["inquiry_status"]
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          preferred_date?: string | null
          project_type?: string | null
          status?: Database["public"]["Enums"]["inquiry_status"]
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          preferred_date?: string | null
          project_type?: string | null
          status?: Database["public"]["Enums"]["inquiry_status"]
        }
        Relationships: []
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_variant_id: string
          quantity: number
          unit_price_cents: number
        }
        Insert: {
          id?: string
          order_id: string
          product_variant_id: string
          quantity: number
          unit_price_cents: number
        }
        Update: {
          id?: string
          order_id?: string
          product_variant_id?: string
          quantity?: number
          unit_price_cents?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_variant_id_fkey"
            columns: ["product_variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          currency: string
          id: string
          profile_id: string
          shipping_address_id: string | null
          status: Database["public"]["Enums"]["order_status"]
          total_cents: number
        }
        Insert: {
          created_at?: string
          currency?: string
          id?: string
          profile_id: string
          shipping_address_id?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          total_cents: number
        }
        Update: {
          created_at?: string
          currency?: string
          id?: string
          profile_id?: string
          shipping_address_id?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          total_cents?: number
        }
        Relationships: [
          {
            foreignKeyName: "orders_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_shipping_address_id_fkey"
            columns: ["shipping_address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variants: {
        Row: {
          color: string | null
          created_at: string
          id: string
          price_override_cents: number | null
          product_id: string
          size: string | null
          sku: string
          stock_quantity: number
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: string
          price_override_cents?: number | null
          product_id: string
          size?: string | null
          sku: string
          stock_quantity?: number
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: string
          price_override_cents?: number | null
          product_id?: string
          size?: string | null
          sku?: string
          stock_quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string | null
          created_at: string
          currency: string
          description: string | null
          id: string
          images: string[]
          is_published: boolean
          name: string
          price_cents: number
          slug: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          images?: string[]
          is_published?: boolean
          name: string
          price_cents: number
          slug: string
        }
        Update: {
          category?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          id?: string
          images?: string[]
          is_published?: boolean
          name?: string
          price_cents?: number
          slug?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: []
      }
      sanctuaries: {
        Row: {
          base_price_cents: number
          capacity: number
          created_at: string
          description: string | null
          id: string
          images: string[]
          is_published: boolean
          name: string
          slug: string
        }
        Insert: {
          base_price_cents: number
          capacity?: number
          created_at?: string
          description?: string | null
          id?: string
          images?: string[]
          is_published?: boolean
          name: string
          slug: string
        }
        Update: {
          base_price_cents?: number
          capacity?: number
          created_at?: string
          description?: string | null
          id?: string
          images?: string[]
          is_published?: boolean
          name?: string
          slug?: string
        }
        Relationships: []
      }
      wishlists: {
        Row: {
          created_at: string
          product_id: string
          profile_id: string
        }
        Insert: {
          created_at?: string
          product_id: string
          profile_id: string
        }
        Update: {
          created_at?: string
          product_id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlists_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wishlists_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_booking: {
        Args: {
          p_check_in: string
          p_check_out: string
          p_experience_ids?: Json
          p_guests: number
          p_sanctuary_id: string
        }
        Returns: {
          check_in: string
          check_out: string
          created_at: string
          guests: number
          id: string
          profile_id: string
          sanctuary_id: string
          status: Database["public"]["Enums"]["booking_status"]
          stay_range: unknown
          total_cents: number
        }
        SetofOptions: {
          from: "*"
          to: "bookings"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      create_order: {
        Args: { p_items: Json; p_shipping_address_id: string }
        Returns: {
          created_at: string
          currency: string
          id: string
          profile_id: string
          shipping_address_id: string | null
          status: Database["public"]["Enums"]["order_status"]
          total_cents: number
        }
        SetofOptions: {
          from: "*"
          to: "orders"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      booking_status: "pending" | "confirmed" | "cancelled"
      document_visibility: "public" | "investor_only"
      inquiry_status: "new" | "in_progress" | "closed"
      membership_tier: "member" | "inner_circle" | "founder"
      order_status: "pending" | "paid" | "fulfilled" | "cancelled"
      user_role: "customer" | "investor" | "admin"
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
    Enums: {
      booking_status: ["pending", "confirmed", "cancelled"],
      document_visibility: ["public", "investor_only"],
      inquiry_status: ["new", "in_progress", "closed"],
      membership_tier: ["member", "inner_circle", "founder"],
      order_status: ["pending", "paid", "fulfilled", "cancelled"],
      user_role: ["customer", "investor", "admin"],
    },
  },
} as const
