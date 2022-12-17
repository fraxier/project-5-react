import { Button, Card, CardActions, CardContent, CardHeader, Link, Typography } from "@mui/material";
import React from "react";
import Utilities from "../../Utilities";
import ColoredChip from "../ColoredChip";

export default function LearningCard({ data }) {

  return (
    <React.Fragment>
    {data.learn && (
      <Card elevation={2} sx={{ width: 275, flexShrink: 0, mr: 2, mb: 2 }}>
        <CardHeader 
          avatar={data.tags.map((tag) => (
            <ColoredChip key={tag.id} bgColor={tag.bg_color} color={tag.font_color} label={tag.name} size='small' />
          ))}
        />
        <CardContent>
          <Link href={`${Utilities.urls.learning(data.learn.id)}`}>
            <Typography variant='h6'>{data.learn.name}</Typography>
          </Link>
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
        <Card elevation={2} sx={{ width: 275, flexShrink: 0, mr: 2, mb: 2 }}>
          <CardContent>
            <Typography variant='body2'>You haven't got something you're focusing on at the moment but that's ok get in there and get started!</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Get started with some learning!</Button>
          </CardActions>
        </Card>
      )}
    </React.Fragment>
  )
}