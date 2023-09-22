import React from 'react'
import Navbar from "@/components/navbar/Navbar"
import { Box } from '@mui/material'

const About = () => {
  return (
    <div>
      <Navbar/>
      <Box paddingTop={10} paddingX={2}>
        About
      </Box>
    </div>
  )
}

export default About