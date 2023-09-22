import { useQuery } from '@tanstack/react-query';
import { QueryFunctionContext } from '@tanstack/react-query';
import {fetchBlog, fetchDetailBlog} from '@/services/blog'

const getBlog = async () => {
  const response = await fetchBlog();
  return response;
};
export function useBlogQuery() {
  return useQuery({
    queryKey: ["blog"],
    queryFn: getBlog,
  });
}


const getDetailBlog = async ({queryKey}: QueryFunctionContext<[string, string]>) => {
  const [_, id] = queryKey
  const response = await fetchDetailBlog(id);
  return response;
};
export function useDetailBlogQuery(id: string) {
  return useQuery({
    queryKey: ["blog-detail", id],
    queryFn: getDetailBlog,
  });
}