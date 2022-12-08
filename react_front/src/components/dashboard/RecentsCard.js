import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Button, Chip, Link } from '@mui/material';
import Utilities from '../../Utilities'


export default function RecentsCard({ data }) {
  
  return (
    <React.Fragment>
      {data && (
        <Card elevation={2} sx={{ width: 275, flexShrink: 0 }}>
          <CardContent>
            <Link href={`${Utilities.urls.learning(data.learn.id)}`}>
              <Typography variant='h6'>{data.learn.name}</Typography>
            </Link>
            {data.tags.map((tag) => (
              <Chip key={tag.id} label={tag.name} size='small' />
            ))}
            <Typography variant='body2'>
              <Typography fontWeight='bold' variant="caption">Motivation: </Typography>
              {Utilities.limitString(data.learn.motivation)}
              </Typography>
            <Typography variant='caption'>Last touched: {Utilities.niceDate(data.learn.updated_at)}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      )}
      {!data && (
        <Card elevation={2} sx={{ width: 275, flexShrink: 0 }}>
          <CardContent>
            <Typography variant='body2'>You haven't done any learning recently but that's ok you can always start right now!</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Do some learning!</Button>
          </CardActions>
        </Card>
      )}
    </React.Fragment>
  );
}