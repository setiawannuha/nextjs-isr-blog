import React from 'react'
import Navbar from "@/components/navbar/Navbar"
import { useRouter } from 'next/router'
import {Container, Typography, Box, IconButton} from "@mui/material"
import Image from 'next/image'
import { WhatsApp, Facebook, AccountCircle, Instagram, Twitter } from '@mui/icons-material'
import {useDetailBlogQuery} from "@/query/blog"
import {IResponse, IResponseDetail} from "@/types/blog"
import { UseQueryResult, dehydrate, QueryClient } from "@tanstack/react-query"
import { GetStaticProps, GetStaticPaths } from 'next'
import {fetchDetailBlog, fetchBlog} from "@/services/blog"

const DetailBlog = () => {
  const router = useRouter()
  const id = router.query.id as string
  const { data, isError, isLoading, error }: UseQueryResult<IResponseDetail, unknown> = useDetailBlogQuery(id)
  if (isLoading) {
    return <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={100}>
      Loading...
    </Box>;
  }
  if (isError) {
    return <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={100}>
      Error: {error instanceof Error  ? error.message : 'An error occurred'}
    </Box>;
  }
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{paddingTop: 10}}>
          <Typography variant="h4" color={`#fff`} fontWeight={`bold`} textAlign={'left'} paddingTop={4} gutterBottom>
            {data.blog.title}
          </Typography>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Box display={'flex'}>
              <Box marginRight={1}>
                <AccountCircle sx={{fontSize: 56, color: '#ccc'}} />
              </Box>
              <Box>
                <Typography variant='subtitle1'>Anonymous</Typography>
                <Typography variant='subtitle2'>{data.blog.created_at}</Typography>
              </Box>
            </Box>
            <Box>
              <IconButton color='primary'><Facebook /></IconButton>
              <IconButton color='success'><WhatsApp /></IconButton>
              <IconButton color='secondary'><Instagram /></IconButton>
              <IconButton color='info'><Twitter /></IconButton>
            </Box>
          </Box>
          <Box height={360} marginBottom={4} marginTop={2} position={'relative'}>
            <Image fill alt="" src={data.blog.photo_url} />
          </Box>
          <Box marginY={4}>
            { <div dangerouslySetInnerHTML={{__html: data.blog.content_html}} /> }
          </Box>
      </Container>
    </>
  )
}

export default DetailBlog

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["blog-detail", id], 
    () => fetchDetailBlog(id)
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    },
    revalidate: 10,
  }
}
export const getStaticPaths: GetStaticPaths = async () => {
  const res: IResponse = await fetchBlog()
  const paths = res.blogs.map((blog: any) => ({
    params: { id: `${blog.id}` },
  }))
  return {
    paths,
    fallback: "blocking"
  };
};