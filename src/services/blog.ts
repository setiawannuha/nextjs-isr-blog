export const fetchDetailBlog = async (id: string) => {
  const response = await fetch(`https://api.slingacademy.com/v1/sample-data/blog-posts/${id}`);
  return response.json();
}
export const fetchBlog = async () => {
  const response = await fetch(`https://api.slingacademy.com/v1/sample-data/blog-posts`);
  return response.json();
}