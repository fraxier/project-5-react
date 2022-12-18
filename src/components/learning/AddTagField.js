import { Alert, Button, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
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

export default function AddTagField ({ learningTags, learningId, setNewTags }) {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([])
  const [errors, setErrors] = useState()
  const [success, setSuccess] = useState()

  useEffect(() => {
    fetch(Utilities.railsUrls.getTags(), {credentials: 'include'})
    .then(res => res.json())
    .then(body => {
      setTags(body.filter((tag) => {
        return !learningTags.find((learnTag) => learnTag.name === tag.name)
      }))
    })
  }, [])

  const handleTagSelect = (event) => {
    const {
      target: { value },
    } = event;

    const tempTags = tags.filter((tag) => {
      return value.includes(tag.name)
    })
    setSelectedTags(tempTags)
  }

  const handleSubmit = () => {
    fetch(Utilities.railsUrls.addTags(), {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        learning_id: learningId,
        tags: selectedTags
      })
    }).then(res => res.json())
    .then(body => {
      if ('errors' in body) {
        setErrors(body.errors)
      } else {
        setSuccess('Successfully added tags')
        setNewTags(body.tags)
        setTags(tags.filter((tag) => {
          return !body.tags.find((learnTag) => learnTag.name === tag.name)
        }))
      }
    })
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
          <FormHelperText className='wave'>You can add tags here!</FormHelperText>
        </FormControl>
        <Button variant="outlined" onClick={handleSubmit}>Add</Button>
      </Box>
      {!!errors && (
        <Alert severity='error'>
          <Typography variant='code'>{errors}</Typography>
        </Alert>
      )}
      {!!errors && (
        <Alert severity='error'>
          <Typography variant='code'>{errors}</Typography>
        </Alert>
      )}
    </React.Fragment>
  )
}