export interface School {
  id: string
  name: string
  address: string
  city: string
  state: string
  contact: string
  image_url: string | null
  email_id: string
  created_at: string
}

export type SchoolFormData = Omit<School, 'id' | 'created_at'>