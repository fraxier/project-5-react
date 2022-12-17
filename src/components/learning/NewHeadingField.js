import { Accordion, AccordionDetails, AccordionSummary, Alert, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Stack } from "@mui/system";
import Utilities from "../../Utilities";

export default function NewHeadingField({ learningId, setNewHeading }) {
  const [open, setOpen] = useState(false)
  const [submissionData, setsubmissionData] = useState({name: ''})
  const [formErrors, setFormErrors] = useState({message: ''})
  const handleOpen = () => {
    setOpen(!open)
  }

  const handleChange = (event) => {
    setsubmissionData({learning_id: learningId, name: event.target.value })
  }

  const handleSubmit = () => {
    fetch(Utilities.railsUrls.createHeading(), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submissionData)
    }).then(res => res.json())
    .then(body => {
      if ('errors' in body) {
        setFormErrors({ message: body.errors })
      } else {
        setNewHeading(body.heading)
        setsubmissionData({name: ''})
        setOpen(false)
      }
    })
  }

  return (
    <Accordion expanded={open} onChange={handleOpen}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ borderBottom: '1px solid #33333377' }}>
        <Typography variant="h5">Add a heading here!</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 3, pt: 4 }}>
        <Stack spacing={2}>
          <Typography variant="h5">New Heading</Typography>
          <TextField 
            required
            id="Name"
            label="Name"
            onChange={handleChange}
            value={submissionData.name}
            helperText="Identify what it is you want to learn and give it an informative declarative name or description!"
          />
          {!!formErrors.message && (
            <Alert severity='error'>
              <Typography variant='code'>{` ${formErrors.message.join(' & ')} `}</Typography>
            </Alert>
          )}
          <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  )
}