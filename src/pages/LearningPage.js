import { Alert, Box, Button, IconButton, Link, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddNoteButton from "../components/learning/AddNoteButton";
import NewHeading from "../components/learning/NewHeadingField";
import LoadingWheel from "../components/LoadingWheel";
import Utilities from "../Utilities";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ColoredChip from "../components/ColoredChip";
import NewTagField from "../components/learning/NewTagField";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddTagField from "../components/learning/AddTagField";

export default function LearningPage() {
  const { id } = useParams();
  const [pageData, setPageData] = useState()
  const [success, setSuccess] = useState({message: ''})
  const [error, setErrors] = useState('')

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
    setPageData({
      learning: pageData.learning, 
      tags: pageData.tags, 
      headings: [{ heading: heading, notes: [] }, ...pageData.headings]})
  }

  const setNewTags = (tags) => {
    console.log(tags)
    setPageData({
      learning: pageData.learning,
      tags: [...tags, ...pageData.tags],
      headings: pageData.headings
    })
  }

  const handleRemoveTag = (tagId) => {
    console.log(tagId)
    fetch(Utilities.railsUrls.removeTag(pageData.learning.id),{
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tag_id: tagId,
        learning_id: pageData.learning.id
      })
    }).then(res => res.json())
    .then(body => {
      if ('errors' in body) {
        setErrors(body.errros)
      } else {
        setSuccess({message: `Successfully removed tag: ${body.tag.name}`})
        setPageData({
          learning: pageData.learning,
          tags: pageData.tags.filter((tag) => tag.id != body.tag.id),
          headings: pageData.headings
        })
      }
    })
  }
  
  if (pageData === undefined) return (<LoadingWheel />)
  
  return (
    <React.Fragment>
      <Typography variant="h4">
        {pageData.learning.name}
        {pageData.tags && pageData.tags.map((tag) => (
          <React.Fragment key={tag.id}>
            <ColoredChip sx={{ ml: 2 }} key={tag.id} label={tag.name} bgColor={tag.bg_color} color={tag.font_color} />
            <IconButton onClick={() => {handleRemoveTag(tag.id)}}><DeleteForeverIcon /></IconButton>
          </React.Fragment>
        ))}
      </Typography>
      <AddTagField learningTags={pageData.tags} learningId={pageData.learning.id} setNewTags={setNewTags} />
      {!!success.message && (
        <Alert severity='success'>
          <Typography variant='code'>{success.message}</Typography>
        </Alert>
      )}
      {!!error && (
        <Alert severity='error'>
          <Typography variant='code'>{error}</Typography>
        </Alert>
      )}
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