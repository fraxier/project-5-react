import { Stack } from "@mui/material";
import React from "react";
import Utilities from "../../Utilities";
import CompletedCard from "./CompletedCard";
import MainsCard from "./MainsCard";
import RecentsCard from "./RecentsCard";

export default function RowSummary({ data, cardType }) {
  console.log(data)
  return (
    <Stack direction='row' spacing={2} sx={{
      overflowX: 'auto',
      p:2
    }}>
      { data && (
        cardType === Utilities.cardTypes.RECENTS && data.map((learn, i) => (
          <RecentsCard key={i} data={learn} />
        )) ||
        cardType === Utilities.cardTypes.MAINS && data.map((learn, i) => (
          <MainsCard key={i} data={learn} />
        )) || 
        cardType === Utilities.cardTypes.COMPLETED && data.map((learn, i) => (
          <CompletedCard key={i} data={learn} />
        ))
      )}
      { !data && (
        cardType === Utilities.cardTypes.RECENTS && (
          <RecentsCard data={null} />
        ) ||
        cardType === Utilities.cardTypes.MAINS && (
          <MainsCard data={null} />
        ) ||
        cardType === Utilities.cardTypes.COMPLETED && (
          <CompletedCard data={null} />
        )
      )}
    </Stack>
  )
}