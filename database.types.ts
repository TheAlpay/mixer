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
      library_items: {
        Row: {
          id: string
          title: string
          description: string
          content_type: 'pdf' | 'image' | 'video' | 'iframe'
          file_url: string
          preview_text: string
          created_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string
          content_type: 'pdf' | 'image' | 'video' | 'iframe'
          file_url: string
          preview_text?: string
          created_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string
          content_type?: 'pdf' | 'image' | 'video' | 'iframe'
          file_url?: string
          preview_text?: string
          created_at?: string
          created_by?: string | null
        }
      }
      dictionary_entries: {
        Row: {
          id: string
          term: string
          definition: string
          created_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          term: string
          definition: string
          created_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          term?: string
          definition?: string
          created_at?: string
          created_by?: string | null
        }
      }
      supplements: {
        Row: {
          id: string
          name: string
          description: string
          default_dosage: string
          side_effects: string
          risk_level: number
          contraindications: string
          age_restrictions: Json
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string
          default_dosage?: string
          side_effects?: string
          risk_level?: number
          contraindications?: string
          age_restrictions?: Json
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          default_dosage?: string
          side_effects?: string
          risk_level?: number
          contraindications?: string
          age_restrictions?: Json
          created_at?: string
        }
      }
      complaints: {
        Row: {
          id: string
          name: string
          category: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          category?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          created_at?: string
        }
      }
      mixer_recommendations: {
        Row: {
          id: string
          user_id: string | null
          age: number
          height: number
          weight: number
          complaints: Json
          recommendations: Json
          risk_accepted: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          age: number
          height: number
          weight: number
          complaints?: Json
          recommendations?: Json
          risk_accepted?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          age?: number
          height?: number
          weight?: number
          complaints?: Json
          recommendations?: Json
          risk_accepted?: boolean
          created_at?: string
        }
      }
    }
  }
}
