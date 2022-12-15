import { Chip, Link, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import NewLearningField from "../components/learning/NewLearningField";
import LoadingWheel from "../components/LoadingWheel";
import Utilities from "../Utilities";
import ColoredChip from '../components/ColoredChip'

export default function LearningsPage() {
  const [pageData, setPageData] = useState()

  useEffect(() => {
    fetch(Utilities.railsUrls.getLearnings(), {credentials: 'include'})
    .then(res => res.json())
    .then(body => {setPageData(body)})
  }, [])
  console.log(pageData)
  if (pageData === undefined) return (<LoadingWheel />)
  
  const setLearning = (newLearning) => {
    setPageData([newLearning, ...pageData])
  }

  return (
    <React.Fragment>
      <Typography variant="h4" className='fit-content'>Learnings</Typography>
      <NewLearningField setLearning={setLearning} />
      <Paper sx={{ p: 3}}>
        {pageData.map((row) => (
          <Box sx={{ my: 2 }} key={row.learning.id}>
            <Link href={Utilities.urls.learning(row.learning.id)}>
              <Typography variant="h5">{row.learning.name}</Typography>
            </Link>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">
                Created: {Utilities.niceDateTime(row.learning.created_at)}
              </Typography>
              <Typography variant="caption">
                Last Opened: {Utilities.niceDateTime(row.learning.updated_at)}
              </Typography>
            </Box>
            {row.tags && row.tags.map((tag) => (
              <ColoredChip key={tag.id} label={tag.name} bgColor={tag.bg_color} color={tag.font_color} />
            ))}
            <br/>
            <Typography variant="body">{row.learning.motivation}</Typography>
          </Box>
        ))}
      </Paper>
    </React.Fragment>
  )
}