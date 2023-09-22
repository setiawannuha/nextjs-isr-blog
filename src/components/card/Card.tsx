import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { IBlog } from '@/types/blog';

interface IProps {
  data: IBlog
}
const CardComponent = ({data}: IProps) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={data.photo_url}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {data.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {data.content_text.substring(0, 50)}...
        </Typography>
        <Typography gutterBottom variant="body2" marginTop={2}>
          {data.created_at}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/blog/${data.id}`}>
          <Button>Read More</Button>
        </Link>
      </CardActions>
    </Card>
  )
}

export default CardComponent