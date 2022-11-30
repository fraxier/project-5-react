import { Avatar } from "@mui/material";
import { blue, orange, purple, red } from "@mui/material/colors";
import React from "react";

export default function LegendIcon({ type }) {

  const backgroundColors = {
    'S': red[500],
    'T': blue[500],
    'N': orange[500],
    'R': purple[500]
  } 

  return (
    <Avatar sx={{ bgcolor: backgroundColors[type] }} aria-label="recipe">
      {type}
    </Avatar>
  )
}