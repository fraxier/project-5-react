import { Box, Button, Container, Link, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddNoteButton from "../components/learning/AddNoteButton";
import LoadingWheel from "../components/LoadingWheel";
import Utilities from "../Utilities";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function HeadingPage() {
  const { id } = useParams()
  const [pageData, setPageData] = useState()

  useEffect(() => {
    fetch(Utilities.railsUrls.getHeading(id), {credentials: 'include'})
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
      <Typography variant="h4">{pageData.heading.name}</Typography>
      <AddNoteButton href={Utilities.urls.addNote(id)}/>
      {!pageData.notes && (
        <Container>
          <Typography variant="h6">No notes have been added!</Typography>
        </Container>
      )}
    
      {pageData.notes.map((note) => (
        <Paper key={note.id} elevation={5} sx={{ p:3, my:2 }}>
          <Box key={note.id}>
              <Typography variant='body1'>{Utilities.limitString(note.content, 400)}</Typography>
              <Button color="primary" href={Utilities.urls.getNote(note.id)}>
                <Typography variant="caption">Read note</Typography><OpenInNewIcon />
              </Button>
            </Box>          
        </Paper>
      ))}
    </React.Fragment>
  )
}