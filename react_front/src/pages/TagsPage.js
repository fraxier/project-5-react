import { Box, Chip, IconButton, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import ColoredChip from "../components/ColoredChip";
import NewTagField from "../components/learning/NewTagField";
import LoadingWheel from "../components/LoadingWheel";
import Utilities from "../Utilities";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function TagsPage() {
  const [pageData, setPageData] = useState()

  useEffect(() => {
    fetch(Utilities.railsUrls.getTags(), {credentials: 'include'})
    .then(res => res.json())
    .then(body => {
      if ('errors' in body) {
        console.log(body)
      } else {
        setPageData(body)
      }
    })
  }, [])

  const setNewTag = (tag) => {
    setPageData([tag, ...pageData])
  }

  if (pageData === undefined) return <LoadingWheel />

  return (
    <React.Fragment>
      <Box>
        <Typography variant="h4" sx={{ mb: 2 }}>Available Tags</Typography>
        <NewTagField setNewTag={setNewTag}/>
        <Paper elevation={1} sx={{ p:3}}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {pageData.map((tag) => (
              <Stack direction='row' spacing={1} key={tag.id} sx={{ alignItems: 'center', mr: 2 }}>
                <ColoredChip label={tag.name} size='large' bgColor={tag.bg_color} color={tag.font_color} />
                <IconButton><DeleteForeverIcon /></IconButton>
              </Stack>
            ))}
          </Box>
        </Paper>
      </Box>
    </React.Fragment>
  )
}