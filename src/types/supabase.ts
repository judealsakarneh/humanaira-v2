export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: 'buyer' | 'freelancer' | 'admin';
          name: string | null;
          username: string | null;
          avatar_url: string | null;
          bio: string | null;
          headline: string | null;
          hourly_rate: number | null;
          skills: string[] | null;
          country: string | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['profiles']['Row']> & { id: string };
        Update: Partial<Database['public']['Tables']['profiles']['Row']>;
      };
      services: {
        Row: {
          id: string;
          freelancer_id: string;
          title: string;
          description: string;
          category: string;
          starting_price: number;
          delivery_time_days: number;
          tags: string[] | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['services']['Row']> & {
          freelancer_id: string;
          title: string;
          description: string;
          category: string;
          starting_price: number;
          delivery_time_days: number;
        };
        Update: Partial<Database['public']['Tables']['services']['Row']>;
      };
      service_packages: {
        Row: {
          id: string;
          service_id: string;
          name: string;
          price: number;
          description: string;
          delivery_time_days: number;
          revisions: number | null;
        };
        Insert: Partial<Database['public']['Tables']['service_packages']['Row']> & {
          service_id: string;
          name: string;
          price: number;
          description: string;
          delivery_time_days: number;
        };
        Update: Partial<Database['public']['Tables']['service_packages']['Row']>;
      };
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string;
          content: string;
          cover_image_url: string | null;
          tags: string[] | null;
          published: boolean;
          published_at: string | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['blog_posts']['Row']> & {
          slug: string;
          title: string;
          excerpt: string;
          content: string;
        };
        Update: Partial<Database['public']['Tables']['blog_posts']['Row']>;
      };
      orders: {
        Row: {
          id: string;
          buyer_id: string;
          freelancer_id: string;
          service_id: string;
          status: 'pending' | 'paid' | 'cancelled' | 'completed';
          amount: number;
          currency: string;
          stripe_payment_intent_id: string | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['orders']['Row']> & {
          buyer_id: string;
          freelancer_id: string;
          service_id: string;
          status: 'pending' | 'paid' | 'cancelled' | 'completed';
          amount: number;
          currency: string;
        };
        Update: Partial<Database['public']['Tables']['orders']['Row']>;
      };
      payouts: {
        Row: {
          id: string;
          freelancer_id: string;
          amount: number;
          status: 'pending' | 'processing' | 'paid';
          method: string | null;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['payouts']['Row']> & {
          freelancer_id: string;
          amount: number;
          status: 'pending' | 'processing' | 'paid';
        };
        Update: Partial<Database['public']['Tables']['payouts']['Row']>;
      };
      conversations: {
        Row: {
          id: string;
          buyer_id: string;
          freelancer_id: string;
          twilio_conversation_sid: string;
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['conversations']['Row']> & {
          buyer_id: string;
          freelancer_id: string;
          twilio_conversation_sid: string;
        };
        Update: Partial<Database['public']['Tables']['conversations']['Row']>;
      };
    };
  };
}
