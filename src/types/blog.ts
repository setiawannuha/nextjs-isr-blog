export interface IResponse{
  success: boolean
  total_blogs: number
  message: string
  offset: number
  limit: number
  blogs: IBlog[]
}
export interface IResponseDetail{
  success: boolean
  message: string
  blog: IBlog
}
export interface IBlog {
  user_id: number
  title: string
  content_text: string
  photo_url: string
  created_at: string
  id: number
  description: string
  content_html: string
  category: string
  updated_at: string
}