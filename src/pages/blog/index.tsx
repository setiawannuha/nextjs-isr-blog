'use client'
import {ChangeEvent, useState, useEffect} from 'react'
import {Grid, Box, Container, Button, Input} from "@mui/material"
import Navbar from "@/components/navbar/Navbar"
import Card from '@/components/card/Card'
import {useBlogQuery} from '@/query/blog'
import {fetchBlog} from '@/services/blog'
import {IResponse, IBlog} from "@/types/blog"
import { UseQueryResult, dehydrate, QueryClient } from "@tanstack/react-query"
import { GetStaticProps } from 'next'

const Blog = () => {
  const [search, setSearch] = useState('')
  const [blogs, setBlogs] = useState<IBlog[]>([])
  const { data, isError, isLoading, error }: UseQueryResult<IResponse, unknown> = useBlogQuery()
  useEffect(() => {
    if(data){
      setBlogs(data.blogs)
    }
  }, [data])
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
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!search){
      setBlogs(data.blogs)
    }else{
      const dataBlog = data.blogs.filter((e: IBlog) => e.title.toLowerCase().includes(search))
      setBlogs(dataBlog)
    }
  }
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{paddingTop: 10}}>
        <form action="" onSubmit={handleSearch}>
          <Box paddingTop={4} display={`flex`} alignItems={'center'}>
            <Input fullWidth style={{backgroundColor: '#fff', padding: 2}} value={search} placeholder="Search Blog" onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setSearch(e.target.value)} />
            <Button variant='contained' type='submit'>Search</Button>
          </Box>
        </form>
        <Grid container spacing={4} paddingY={4}>
          {
            blogs.map((el: IBlog, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                  <Card data={el} />
                </Box>
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </>
  )
}
export default Blog


export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["blog"], 
    () => fetchBlog()
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    },
    revalidate: 10,
  }
}