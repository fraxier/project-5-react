import { Button, Card, CardActions, CardContent, Link, Typography } from "@mui/material";
import React from "react";
import Utilities from "../../Utilities";

export default function CompletedCard({ data }) {
  
  return (
    <React.Fragment>
      {data && (
        <Card elevation={2} sx={{ width: 275, flexShrink: 0 }}>
          <CardContent>
            <Link href={`${Utilities.urls.getLearning(data.id)}`}>
              <Typography variant='h6'>{data.name}</Typography>
            </Link>
            <Typography variant='body2'>
              <Typography fontWeight='bold' variant="caption">Motivation: </Typography>
              {Utilities.limitString(data.motivation)}
            </Typography>
            <Typography variant='caption'>Last touched: {Utilities.niceDate(data.updated_at)}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      )}
      {!data && (
        <Card elevation={2} sx={{ width: 275, flexShrink: 0 }}>
          <CardContent>
            <Typography variant='body2'>You haven't completed any learnings so far but that's ok, sometimes the learning never stops!</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Complete some learnings!</Button>
          </CardActions>
        </Card>
      )}
    </React.Fragment>
  )
}