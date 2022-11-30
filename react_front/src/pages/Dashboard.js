import { Box } from "@mui/material";
import React from "react";
import ButtonHolder from "../components/ButtonHolder";
import Holder from "../components/Holder";
import TypeScale from "../components/TypeScale";
import Underline from "../components/Underline";

export default function Dashboard() {

  return (
    <div>
      <h2 style={{textAlign: 'left', width: 'fit-content'}}>
        Subjects
        <Underline color={'red'} width='100%' />
      </h2>
      <Box sx={{ display: 'flex', alignItems: 'center', overflowX: 'scroll', mb: 5 }}>
        <ButtonHolder />
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
