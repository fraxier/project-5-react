import { Box, IconButton, Link, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import AddNoteButton from "../components/learning/AddNoteButton";
import NewHeading from "../components/learning/NewHeadingField";
import LoadingWheel from "../components/LoadingWheel";
import Utilities from "../Utilities";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function LearningPage() {
  const { id } = useParams();
  const [pageData, setPageData] = useState()

  useEffect(() => {
    fetch(Utilities.railsUrls.getLearning(id), {credentials: 'include'})
    .then(res => res.json())
    .then(body => setPageData(body))

    fetch(Utilities.railsUrls.getLearning(id), {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: id, updated_at: true})
    })
    .then(res => res.json())
    .then(body => console.log(body))
  }, [])

  const setNewHeading = (heading) => {
    setPageData({learning: pageData.learning, headings: [{ heading: heading, notes: [] }, ...pageData.headings]})
  }
  
  if (pageData === undefined) return (<LoadingWheel />)
  console.log(pageData)
  return (
    <React.Fragment>
      <Typography variant="h4">{pageData.learning.name}</Typography>
      <NewHeading learningId={id} setNewHeading={setNewHeading} />
      {!pageData.headings && (
        <Container>
          <Typography variant="h6">No headings have been added!</Typography>
        </Container>
      )}
    
      {pageData.headings.map((row) => (
        <Paper key={row.heading.id} elevation={5} sx={{ p:3, my:2 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2, justifyContent: 'space-between'}}>
            <Link href={`${Utilities.urls.heading(row.heading.id)}`}>
              <Typography variant="h6">{row.heading.name}</Typography>
            </Link>
            <AddNoteButton href={Utilities.urls.addNote(row.heading.id)} />
          </Box>
          {row.notes.length === 0 && (
            <Container>
              <Typography variant="h6">No notes added here yet!</Typography>
            </Container>
          )}
          {row.notes.map((note) => (
            <Box key={note.id}>
              <Typography variant='body1'>{Utilities.limitString(note.content, 250)}</Typography>
              <Button color="primary" href={Utilities.urls.getNote(note.id)}>
                <Typography variant="caption">Read note</Typography><OpenInNewIcon />
              </Button>
            </Box>
          ))}
        </Paper>
      ))}
    </React.Fragment>
  )
}