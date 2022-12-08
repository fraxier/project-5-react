import { Box, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import LoadingWheel from "../components/LoadingWheel";
import Utilities from "../Utilities";

export default function Learning() {
  const { id } = useParams();
  const [pageData, setPageData] = useState()

  useEffect(() => {
    fetch(Utilities.urls.getLearning(id), {credentials: 'include'})
    .then(res => res.json())
    .then(body => setPageData(body))
  }, [])
  
  if (pageData === undefined) return (<LoadingWheel />)
  
  return (
    <React.Fragment>
      <Typography variant="h4">{pageData.learning.name}</Typography>
      {!pageData.headings && (
        <Container>
          <Typography variant="h6">No headings have been added!</Typography>
        </Container>
      )}
      
      {pageData.headings.map((row) => (
        <Paper elevation={5} sx={{ p:3, my:2 }}>
          <Typography variant="h6">{row.heading.name}</Typography>
          {row.notes.length === 0 && (
            <Container>
              <Typography variant="h6">No notes added here yet!</Typography>
            </Container>
          )}
          {row.notes.map((note) => (
            <Box>
              <Typography variant='body1'>{note.content}</Typography>
            </Box>
          ))}
        </Paper>
      ))}
    </React.Fragment>
  )
}