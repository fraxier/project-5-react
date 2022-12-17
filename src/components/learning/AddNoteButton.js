import { Button } from "@mui/material";
import React from "react";

export default function AddNoteButton({ href }) {

  return (
    <React.Fragment>
      <Button href={href} variant="contained">
        Add Note
      </Button>
    </React.Fragment>
  )
}