import { Alert, Box, Chip, IconButton, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import ColoredChip from "../components/ColoredChip";
import NewTagField from "../components/learning/NewTagField";
import LoadingWheel from "../components/LoadingWheel";
import Utilities from "../Utilities";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function TagsPage() {
  const [pageData, setPageData] = useState()
  const [errors, setErrors] = useState()
  const [success, setSuccess] = useState()

  useEffect(() => {
    fetch(Utilities.railsUrls.getTags(), {credentials: 'include'})
    .then(res => res.json())
    .then(body => {
      if ('errors' in body) {
        setErrors(body.errors)
      } else {
        setPageData(body)
      }
    })
  }, [])

  const setNewTag = (tag) => {
    setPageData([tag, ...pageData])
  }
  
  const handleDelete = (id) => {
    setSuccess(null) || setErrors(null)

    fetch(Utilities.railsUrls.getTag(id), {
      method: 'DELETE',
      credentials: 'include'
    }).then(res => res.json())
    .then(body => {
      if ('errors' in body) {
        setErrors(body.errors)
        console.log(body)
      } else {
        setSuccess({message: `Successfully deleted ${body.tag.name}`})
        setPageData(pageData.filter((tag) => tag.id != body.tag.id))
        console.log(body)
      }
    })
  }

  if (pageData === undefined) return <LoadingWheel />

  return (
    <React.Fragment>
      <Box>
        <Typography variant="h4" sx={{ mb: 2 }}>Available Tags</Typography>
        <NewTagField setNewTag={setNewTag} setSuccess={setSuccess} setErrors={setErrors} />
        <Paper elevation={1} sx={{ p:3}}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {pageData.map((tag) => (
              <Stack direction='row' spacing={1} key={tag.id} sx={{ alignItems: 'center', mr: 2 }}>
                <ColoredChip label={tag.name} size='large' bgColor={tag.bg_color} color={tag.font_color} />
                <IconButton onClick={() => {handleDelete(tag.id)}}><DeleteForeverIcon /></IconButton>
              </Stack>
            ))}
          </Box>
          {!!errors && (
            <Alert severity='error'>
              <Typography variant='code'>{` ${errors.join(' & ')} `}</Typography>
            </Alert>
          )}
          {!!success && (
            <Alert severity='success'>
              <Typography variant='code'>{success.message}</Typography>
            </Alert>
          )}
        </Paper>
      </Box>
    </React.Fragment>
  )
}