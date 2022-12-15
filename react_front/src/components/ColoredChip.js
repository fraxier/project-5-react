import { Chip, styled, withStyles } from "@mui/material";
import React from "react";

export default function ColoredChip({ bgColor, color, label, size }) {

  const StyleChip = styled(Chip)({
    color: color,
    backgroundColor: bgColor
  })

  const LargeChip = styled(StyleChip)({
    fontSize: 'larger'
  })

  return (
    <React.Fragment>
      {(size === 'large') && (
        <LargeChip label={label} />
      ) || (
        <StyleChip label={label} />
      )}
    </React.Fragment>
  )
}