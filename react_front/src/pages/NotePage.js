import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingWheel from "../components/LoadingWheel";
import Utilities from "../Utilities";

export default function NotePage() {
  const { id } = useParams()
  const [pageData, setPageData] = useState()

  useEffect(() => {
    fetch(Utilities.railsUrls.getNote(id), {credentials: 'include'})
    .then(res => res.json())
    .then(body => {
      if ('errors' in body) {
        console.log(body)
      } else {
        setPageData(body)
      }
    })
  }, [])

  if (pageData === undefined) return <LoadingWheel />

  return (
    <React.Fragment>
      <Typography variant="h5">{pageData.heading.name}</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Typography variant='caption'>Created:  {Utilities.niceDateTime(pageData.note.created_at)}</Typography>
        <Typography variant='caption'>Updated:  {Utilities.niceDateTime(pageData.note.updated_at)}</Typography>
      </Box>
      <Paper elevation={3} sx={{ p:3 }}>
        <Typography>{pageData.note.content}</Typography>
      </Paper>
    </React.Fragment>
  )
}