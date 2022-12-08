import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";
import Utilities from "../../Utilities";

export default function MainsCard({ data }) {
  
  return (
    <React.Fragment>
    {data && (
      <Card elevation={2} sx={{ width: 275, flexShrink: 0 }}>
        <CardContent>
          <Typography variant='h6'>{data.name}</Typography>
          <Typography variant='body2'>
            <Typography fontWeight='bold' variant="caption">Motivation: </Typography>
            {Utilities.limitString(data.motivation)}
          </Typography>
          <Typography variant='caption'>Last touched: {data.updated_at}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    )}
    {!data && (
        <Card elevation={2} sx={{ width: 275, flexShrink: 0 }}>
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