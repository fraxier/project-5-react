import { Box } from "@mui/material";
import { blue, orange, red, yellow } from "@mui/material/colors";
import { bgcolor } from "@mui/system";
import React from "react";

export default function Underline({ width, color }) {

  const colors = {
    'red': red[500],
    'blue': blue[500],
    'yellow': yellow[500],
    'orange': orange[500]
  }

  return (
    <Box sx={{
      width: width,
      bgcolor: colors[color],
      height: '3px',
      mb: 2
    }}/>
  )
}