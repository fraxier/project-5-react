import { Box, Chip, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ColoredChip from "../components/ColoredChip";
import NewTagField from "../components/learning/NewTagField";
import LoadingWheel from "../components/LoadingWheel";
import Utilities from "../Utilities";

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
        <Paper elevation={1} sx={{ p:3, display: 'flex', justifyContent: 'space-evenly' }}>
          {pageData.map((tag) => (
            <ColoredChip key={tag.id} label={tag.name} size='large' bgColor={tag.bg_color} color={tag.font_color} />
          ))}
        </Paper>
      </Box>
    </React.Fragment>
  )
}