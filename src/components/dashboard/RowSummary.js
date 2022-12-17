import { Button, Card, CardActions, CardContent, Stack, styled, Typography } from "@mui/material";
import React from "react";
import Utilities from "../../Utilities";
import LearningCard from "./LearningCard";

const EmptyCard = (msg, href = Utilities.urls.learnings()) => (
  <Card elevation={2} sx={{ textAlign: 'center', width: 275, flexShrink: 0 }}>
    <CardContent>
      <Typography variant='body2'>{msg}</Typography>
    </CardContent>
    <CardActions>
      <Button href={href} size="small">Do some learning!</Button>
    </CardActions>
  </Card>
)

export default function RowSummary({ data, cardType }) {
  
  return (
    <Stack direction='row' spacing={2} sx={{
      overflowX: 'auto',
      p: 2
    }}>
      {data && data.map((rows, i) => (
          <LearningCard key={rows.learn.id} data={rows} />
      ))}
      {!data && (
        cardType === Utilities.cardTypes.RECENTS && (EmptyCard(`You haven't done any learning recently but that's ok you can always start right now!`))
        || cardType === Utilities.cardTypes.MAINS && (EmptyCard(`You haven't got something you're focusing on at the moment but that's ok get in there and get started!`))
        || cardType === Utilities.cardTypes.COMPLETED && (EmptyCard(`You haven't completed any learnings so far but that's ok, sometimes the learning never stops!`))
      )}
    </Stack>
  )
}