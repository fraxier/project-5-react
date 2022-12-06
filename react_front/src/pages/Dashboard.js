import React, { useEffect, useState } from "react";
import { Typography, useTheme } from "@mui/material";
import MegaSummary from "../components/dashboard/MegaSummary";
import { Stack } from "@mui/system";
import RowSummary from "../components/dashboard/RowSummary";
import Utilities from "../Utilities";



export default function Dashboard() {
  const theme = useTheme()
  const [pageData, setPageData] = useState({})

  useEffect(() => {
    fetch('http://localhost:3000/mega_summary', {credentials: 'include'})
    .then(res => res.json())
    .then(body => {
      setPageData(body)
    })
  }, [])
  console.log(pageData)
  return (
    <React.Fragment>
      <MegaSummary data={pageData} />
      <Stack spacing={2}>
        <h1>Recent Learnings</h1>
        <Typography variant="body2">I've been working on these recently...</Typography>
        <RowSummary data={pageData.recent_learnings} cardType={Utilities.cardTypes.RECENTS} />
        <h1>Main Learnings</h1>
        <Typography variant="body2">Things I want to focus on...</Typography>
        <RowSummary data={pageData.main_learnings} cardType={Utilities.cardTypes.MAINS} />
        <h1>Completed Learnings</h1>
        <Typography variant="body2">Finished these but good to look back on!</Typography>
        <RowSummary data={pageData.completed_learnings} cardType={Utilities.cardTypes.COMPLETED} />
      </Stack>
    </React.Fragment>
  )
}
