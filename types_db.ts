export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      accounts: {
        Row: {
          approved: boolean | null
          company_id: number | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: number
          title: string | null
          user_id: string | null
        }
        Insert: {
          approved?: boolean | null
          company_id?: number | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: number
          title?: string | null
          user_id?: string | null
        }
        Update: {
          approved?: boolean | null
          company_id?: number | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: number
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accounts_company_id_fkey"
            columns: ["company_id"]
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accounts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      ad_analytics: {
        Row: {
          campaign_id: number | null
          clicked: boolean | null
          created_at: string | null
          effect_opened: boolean | null
          id: number
          impression: boolean | null
          ip_address: string | null
        }
        Insert: {
          campaign_id?: number | null
          clicked?: boolean | null
          created_at?: string | null
          effect_opened?: boolean | null
          id?: number
          impression?: boolean | null
          ip_address?: string | null
        }
        Update: {
          campaign_id?: number | null
          clicked?: boolean | null
          created_at?: string | null
          effect_opened?: boolean | null
          id?: number
          impression?: boolean | null
          ip_address?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_analytics_campaign_id_fkey"
            columns: ["campaign_id"]
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          }
        ]
      }
      campaigns: {
        Row: {
          account_id: number | null
          autoDeploy: boolean | null
          call_to_action_type:
            | Database["public"]["Enums"]["call_to_action_type"]
            | null
          created_at: string | null
          deployed: boolean | null
          effect_id: number | null
          id: number
          title: string | null
        }
        Insert: {
          account_id?: number | null
          autoDeploy?: boolean | null
          call_to_action_type?:
            | Database["public"]["Enums"]["call_to_action_type"]
            | null
          created_at?: string | null
          deployed?: boolean | null
          effect_id?: number | null
          id?: number
          title?: string | null
        }
        Update: {
          account_id?: number | null
          autoDeploy?: boolean | null
          call_to_action_type?:
            | Database["public"]["Enums"]["call_to_action_type"]
            | null
          created_at?: string | null
          deployed?: boolean | null
          effect_id?: number | null
          id?: number
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_account_id_fkey"
            columns: ["account_id"]
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaigns_effect_id_fkey"
            columns: ["effect_id"]
            referencedRelation: "effects"
            referencedColumns: ["id"]
          }
        ]
      }
      companies: {
        Row: {
          company_website: string | null
          created_at: string | null
          id: number
          industry: string | null
          name: string | null
        }
        Insert: {
          company_website?: string | null
          created_at?: string | null
          id?: number
          industry?: string | null
          name?: string | null
        }
        Update: {
          company_website?: string | null
          created_at?: string | null
          id?: number
          industry?: string | null
          name?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          id: string
          stripe_customer_id: string | null
        }
        Insert: {
          id: string
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          stripe_customer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      effects: {
        Row: {
          account_id: number | null
          created_at: string | null
          id: number
          name: string | null
          preview_file: string | null
          public_link: string | null
          state: Database["public"]["Enums"]["effect_state_type"] | null
        }
        Insert: {
          account_id?: number | null
          created_at?: string | null
          id?: number
          name?: string | null
          preview_file?: string | null
          public_link?: string | null
          state?: Database["public"]["Enums"]["effect_state_type"] | null
        }
        Update: {
          account_id?: number | null
          created_at?: string | null
          id?: number
          name?: string | null
          preview_file?: string | null
          public_link?: string | null
          state?: Database["public"]["Enums"]["effect_state_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "effects_account_id_fkey"
            columns: ["account_id"]
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          }
        ]
      }
      link_action: {
        Row: {
          campaign_id: number | null
          created_at: string | null
          icon: string | null
          id: number
          link: string | null
          prompt: string | null
        }
        Insert: {
          campaign_id?: number | null
          created_at?: string | null
          icon?: string | null
          id?: number
          link?: string | null
          prompt?: string | null
        }
        Update: {
          campaign_id?: number | null
          created_at?: string | null
          icon?: string | null
          id?: number
          link?: string | null
          prompt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "link_action_campaign_id_fkey"
            columns: ["campaign_id"]
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          }
        ]
      }
      prices: {
        Row: {
          active: boolean | null
          currency: string | null
          description: string | null
          id: string
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count: number | null
          metadata: Json | null
          product_id: string | null
          trial_period_days: number | null
          type: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount: number | null
        }
        Insert: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Update: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          active: boolean | null
          description: string | null
          id: string
          image: string | null
          metadata: Json | null
          name: string | null
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          id: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Update: {
          active?: boolean | null
          description?: string | null
          id?: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Relationships: []
      }
      promo_action: {
        Row: {
          campaign_id: number | null
          created_at: string | null
          id: number
          image_name: string | null
          link: string | null
          prompt: string | null
        }
        Insert: {
          campaign_id?: number | null
          created_at?: string | null
          id?: number
          image_name?: string | null
          link?: string | null
          prompt?: string | null
        }
        Update: {
          campaign_id?: number | null
          created_at?: string | null
          id?: number
          image_name?: string | null
          link?: string | null
          prompt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "promo_action_campaign_id_fkey"
            columns: ["campaign_id"]
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          }
        ]
      }
      subscriptions: {
        Row: {
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created: string
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          id: string
          metadata: Json | null
          price_id: string | null
          quantity: number | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          trial_end: string | null
          trial_start: string | null
          user_id: string
        }
        Insert: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id: string
        }
        Update: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_fkey"
            columns: ["price_id"]
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          billing_address: Json | null
          email_contact: string | null
          full_name: string | null
          id: string
          payment_method: Json | null
          phone_contact: string | null
          role: Database["public"]["Enums"]["user_role"] | null
        }
        Insert: {
          avatar_url?: string | null
          billing_address?: Json | null
          email_contact?: string | null
          full_name?: string | null
          id: string
          payment_method?: Json | null
          phone_contact?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
        }
        Update: {
          avatar_url?: string | null
          billing_address?: Json | null
          email_contact?: string | null
          full_name?: string | null
          id?: string
          payment_method?: Json | null
          phone_contact?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      call_to_action_type: "link" | "promo" | "input" | "competition"
      effect_state_type: "Active" | "Deactivated" | "In Development"
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
      user_role: "Influencer" | "Company" | "Admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
