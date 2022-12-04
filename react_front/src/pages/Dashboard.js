import React, { useEffect, useState } from "react";
import { Accordion, AccordionSummary, Box, Stack, Typography } from "@mui/material";
import Holder from "../components/Holder";
import TypeScale from "../components/TypeScale";
import Underline from "../components/Underline";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Dashboard() {

  const [pageData, setPageData] = useState({})

  useEffect(() => {
    // recent learnings 5
    fetch('http://localhost:3000/recent_learnings', {credentials: 'include'})
    .then(res => res.json())
    .then(body => {
      console.log(body)
    })

  })

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <h5>Motivation Summary<Underline /></h5>
        <Stack>
          <Box sx={{ display: 'flex'}}>
            
          </Box>
        </Stack>
      </Box>

      <h2 style={{textAlign: 'left', width: 'fit-content'}}>
        Subjects
        <Underline color={'red'} width='100%' />
      </h2>
      <Box sx={{ display: 'flex', alignItems: 'center', overflowX: 'scroll', mb: 5 }}>
        <Holder type='S' />
        <Holder type='S' />
        <Holder type='S' />
        <Holder type='S' />
        <Holder type='S' />
        <Holder type='S' />
      </Box>

      <h2 style={{textAlign: 'left', width: 'fit-content'}}>
        Topics
        <Underline color={'blue'} width='100%' />
      </h2>
      <Box sx={{ display: 'flex', alignItems: 'center', overflowX: 'scroll', mb: 5 }}>
        <Holder type='T' />
        <Holder type='T' />
        <Holder type='T' />
        <Holder type='T' />
        <Holder type='T' />
      </Box>

      <h2 style={{textAlign: 'left', width: 'fit-content'}}>
        Notes
        <Underline color={'orange'} width='100%' />
      </h2>
      <Box sx={{ display: 'flex', alignItems: 'center', overflowX: 'scroll', mb: 5 }}>
        <Holder type='N' />
        <Holder type='N' />
        <Holder type='N' />
        <Holder type='N' />
        <Holder type='N' />
      </Box>

      <TypeScale></TypeScale>
    </div>
  )
}
