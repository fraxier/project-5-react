import { Alert, Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingWheel from "../components/LoadingWheel";
import Utilities from "../Utilities";
import ContentEditable from 'react-contenteditable'
import { useRef } from "react";

export default function NotePage() {
  const { id } = useParams()
  const [pageData, setPageData] = useState()
  const contentEditable = useRef();
  const [html, setHtml] = useState('');
  const [disabled, setDisabled] = useState(true)
  const [formErrors, setFormErrors] = useState({message: ''})
  const [formSuccess, setFormSuccess] = useState(false)
  
  useEffect(() => {
    fetch(Utilities.railsUrls.getNote(id), {credentials: 'include'})
    .then(res => res.json())
    .then(body => {
      if ('errors' in body) {
        console.log(body)
      } else {
        setPageData(body)
        setHtml(body.note.content)
      }
    })
  }, [])

  const handleChange = (event) => {
    setHtml(event.target.value)
  }

  const handleToggleDisable = () => {
    setDisabled(false)
    setFormErrors({message: ''})
    setFormSuccess(false)
  }

  const handleSave = () => {
    setDisabled(true)
    // fetch
    fetch(Utilities.railsUrls.getNote(pageData.note.id), {
      credentials: 'include',
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: pageData.note.id,
        content: html
      })
    }).then(res => res.json())
    .then(body => {
      if ('errors' in body) {
        setFormErrors(body.errors)
      } else {
        setFormSuccess(true)
      }
    })
  }

  // const toggleFocus = () => {
  //   if (contentEditable.current.className === '') {
  //     contentEditable.current.className = 'editable'
  //   } else {
  //     contentEditable.current.className = ''
  //   }
  // }

  if (pageData === undefined) return <LoadingWheel />
  
  return (
    <React.Fragment>
      <Typography variant="h5">{pageData.heading.name}</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Typography variant='caption'>Created:  {Utilities.niceDateTime(pageData.note.created_at)}</Typography>
        <Typography variant='caption'>Updated:  {Utilities.niceDateTime(pageData.note.updated_at)}</Typography>
      </Box>
      <Paper elevation={3} sx={{ p:3 }}>
        <ContentEditable
          className={disabled ? '' : 'editable'}
          innerRef={contentEditable}
          html={html} // innerHTML of the editable div
          disabled={disabled}       // use true to disable editing
          onChange={handleChange} // handle innerHTML change
          // onFocus={toggleFocus}
          // onBlur={toggleFocus}
          tagName='div' // Use a custom HTML tag (uses a div by default)
        />
        <br/>
        {disabled && (<Button fullWidth variant="contained" onClick={handleToggleDisable}>Edit</Button>) }
        {!disabled && (<Button fullWidth variant="contained" onClick={handleSave}>Save</Button>) }
        {!!formErrors.message && (
          <Alert severity='error'>
            <Typography variant='code'>{` ${formErrors.message.join(' & ')} `}</Typography>
          </Alert>
        )}
        {!!formSuccess && (
          <Alert severity='success'>
            <Typography variant='code'>Successfully updated note</Typography>
          </Alert>
        )}
      </Paper>
    </React.Fragment>
  )
}