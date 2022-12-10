import { Link, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import NewLearning from "../components/learning/NewLearning";
import LoadingWheel from "../components/LoadingWheel";
import Utilities from "../Utilities";

export default function Learnings() {
  const [pageData, setPageData] = useState()

  useEffect(() => {
    fetch(Utilities.railsUrls.getLearnings(), {credentials: 'include'})
    .then(res => res.json())
    .then(body => {setPageData(body)})
  }, [])

  if (pageData === undefined) return (<LoadingWheel />)
  
  return (
    <React.Fragment>
      <Typography variant="h4">Learnings</Typography>
      <NewLearning />
      <Paper sx={{ p: 3}}>
        {pageData.map((learning) => (
          <Box sx={{ my: 2 }} key={learning.id}>
            <Link href={Utilities.urls.learning(learning.id)}>
              <Typography variant="h5">{learning.name}</Typography>
            </Link>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">
                Created: {Utilities.niceDate(learning.created_at)}
              </Typography>
              <Typography variant="caption">
                Last Opened: {Utilities.niceDate(learning.updated_at)}
              </Typography>
            </Box>
            <Typography variant="body2">{learning.motivation}</Typography>
          </Box>
        ))}
      </Paper>
    </React.Fragment>
  )
}