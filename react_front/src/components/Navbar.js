import { Box } from "@mui/material";
import React from "react";
import Logo from "./Logo";
import SearchBox from "./SearchBox";

export default function Navbar() {

  return (
    <Box sx={{ backgroundColor: 'white', p: 3, px: 5, height: '80px', display: 'flex', alignItems: 'center' }}>
      
      <Logo />
      <SearchBox />
    </Box>
  )
}