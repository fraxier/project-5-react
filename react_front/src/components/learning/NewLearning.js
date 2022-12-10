import { Accordion, AccordionDetails, AccordionSummary, Alert, Button, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Stack } from "@mui/system";
import Utilities from "../../Utilities";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
};

export default function NewLearning() {
  const [open, setOpen] = useState(false)
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([])
  const [submissionData, setSubmissionData] = useState({
    name: '',
    motivation: ''
  })
  const [success, setSuccess] = useState(false)
  const [formErrors, setFormErrors] = useState({message: ''})

  useEffect(() => {
    fetch(Utilities.railsUrls.getTags(), {credentials: 'include'})
    .then(res => res.json())
    .then(body => { 
      setTags(body)
    })
  }, [])

  const handleChange = (event) => {
    const field = event.target.id;
    setSubmissionData({ ...submissionData, [field]: event.target.value })
  }

  const handleTagSelect = (event) => {
    console.log(event)
    const {
      target: { value },
    } = event;
    console.log(event)
    const tempTags = tags.filter((tag) => {
      return value.includes(tag.name)
    })
    setSelectedTags(tempTags)
  }
  
  const handleSubmit = () => {
    setSuccess(false)
    setFormErrors({message:''})
    fetch(Utilities.railsUrls.createLearning(), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...submissionData, tags: selectedTags })
    })
    .then(res => res.json())
    .then(body => {
      debugger;
      if ('errors' in body) {
        setFormErrors({message: body.errors})
      } else {
        setSubmissionData({ name: '', motivation: '' })
        setSelectedTags([])
        setSuccess(true)
        setOpen(false)
      }
    })
  }
  
  const handleOpen = () => {
    setOpen(!open)
  }

  return (
    <React.Fragment>
      <Accordion expanded={open} onChange={handleOpen}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ borderBottom: '1px solid #33333377' }}>
          <Typography variant="h5">Create a learning here!</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 3, pt: 4 }}>
          <Stack spacing={2}>
            <Typography variant="h5">I am Learning...</Typography>
            <TextField 
              required
              id="name"
              label="Name"
              onChange={handleChange}
              value={submissionData.name}
              helperText="Identify what it is you want to learn and give it an informative declarative name or description!"
            />
            <TextField
              required
              id="motivation"
              multiline
              label="Motivation"
              onChange={handleChange}
              value={submissionData.motivation}
              helperText="Give yourself a reminder why you want to learn what it is you're learning! It can be as long and as descriptive as you want."
            />
            {!!formErrors.message && (
              <Alert severity='error'>
                <Typography variant='code'>{` ${formErrors.message.join(' & ')} `}</Typography>
              </Alert>
            )}
            <FormControl sx={{ m: 1, width: '20%', minWidth:300 }}>
              <InputLabel id="tags-label">Tags</InputLabel>
              <Select
                labelId="tags-label"
                id="tags"
                multiple
                value={selectedTags.map((tag) => tag.name)}
                onChange={handleTagSelect}
                input={<OutlinedInput label="Tags" />}
                MenuProps={MenuProps}
              >
                {tags && tags.map((tag) => (
                  <MenuItem
                    key={tag.id}
                    value={tag.name}
                  >
                    {tag.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText className='wave'>Select tags to help identify what it is you are learning!</FormHelperText>
            </FormControl>
            <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
      {success && (
        <Alert severity='success'>
          <Typography variant='code'>Learning successfully created!</Typography>
        </Alert>
      )}
    </React.Fragment>
  )
}