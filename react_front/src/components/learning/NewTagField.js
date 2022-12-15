import React, { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, Stack, styled, TextField, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Utilities from "../../Utilities";
import { HexColorPicker } from "react-colorful";
import ColoredChip from "../ColoredChip";

const Rainbow = styled(Box)({
  borderRadius: 7,
  width: 20,
  height: 30,
  cursor: 'pointer'
})

const sampleColors = [
  '#FF0000',
  '#FF8700',
  '#FFD300',
  '#fffc00',
  '#A1FF0A',
  '#0AFF99',
  '#0AEFFF',
  '#147DF5',
  '#580AFF',
  '#BE0AFF'
]

export default function NewTagField({ setNewTag }) {
  const [submissionData, setsubmissionData] = useState({name: ''});
  const [formErrors, setFormErrors] = useState({message: ''});
  const [open, setOpen] = useState(false);
  const [chipBG, setChipBG] = useState('#438684')
  const [chipColor, setChipColor] = useState('#fff')

  const handleOpen = () => {
    setOpen(!open)
  }
  const calcFontColor = (color) => {
    const r = parseInt(color.substr(1, 2), 16)
    const g = parseInt(color.substr(3, 2), 16)
    const b = parseInt(color.substr(5, 2), 16)

    const brightness = (r * 0.299) + (g * 0.587) + (b * 0.114)
    return brightness > 160 ? '#000' : '#fff'
  }
  const handleChange = (event) => {
    setsubmissionData({name: event.target.value})
  }
  const handleColorChange = (color) => {
    setChipBG(color)
    setChipColor(calcFontColor(color))
  }
  const handleSubmit = () => {
    const body = {
      name: submissionData.name,
      bg_color: chipBG,
      font_color: chipColor
    }
    setFormErrors({message: ''})

    fetch(Utilities.railsUrls.createTag(), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(res => res.json())
    .then(body => {
      if ('errors' in body) {
        setFormErrors({message: body.errors})
      } else {
        setNewTag(body.tag)
        setsubmissionData({name: ''})
        setOpen(false)
      }
    })
  }

  const handleSampleColor = (event) => {
    const color = getComputedStyle(event.target).backgroundColor
    const re = /\D/gm
    const colors = color.split(',').map((str) => parseInt(str.replace(re, '')).toString(16).padStart(2, '0'))
    console.log(colors)
    const hex = '#' + colors.join('')
    console.log(hex)
    setChipBG(hex)
    setChipColor(calcFontColor(hex))
  }

  return (
    <Accordion expanded={open} onChange={handleOpen}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ borderBottom: '1px solid #33333377' }}>
        <Typography variant="h5">Create tags here!</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 3, pt: 4 }}>
        <Stack spacing={2}>
          <Typography variant="h5">New Tag</Typography>
          <TextField 
            required
            id="name"
            label="Name"
            onChange={handleChange}
            value={submissionData.name}
            helperText="A tag is like a category! Provide a quick name that you can use to later categorise your learnings!"
          />
          {!!formErrors.message && (
            <Alert severity='error'>
              <Typography variant='code'>{` ${formErrors.message.join(' & ')} `}</Typography>
            </Alert>
          )}
          <Stack direction='row' spacing={2}>
            <HexColorPicker color={chipBG} onChange={handleColorChange}/>
            <ColoredChip size='large' bgColor={chipBG} color={chipColor} label={submissionData.name ? submissionData.name : 'Example!'} />
          </Stack>
          <Stack direction='row' spacing={2}>
            {sampleColors.map((color, i) =>(
              <Rainbow key={i} sx={{ backgroundColor: color }} onClick={handleSampleColor} />
            ))}
          </Stack>
          <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  )
}