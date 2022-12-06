import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";
import Utilities from "../../Utilities";

export default function CompletedCard({ data }) {
  console.log(data)
  return (
    <React.Fragment>
      {data && (
        <Card elevation={2} sx={{ width: 275, flexShrink: 0 }}>
          <CardContent>
            <Typography variant='h6'>{data.name}</Typography>
            <Typography variant='body2'>{Utilities.limitString(data.motivation)}</Typography>
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