
import { Box, Link, List, ListItem, Typography } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import React from "react";
import Logo from "./Logo";

export default function Sidebar() {

  return (
    <Box boxShadow={3} sx={{ p: 2, pt: 2, background: 'white', width: '300px', height: '100%', flexShrink: 0, position: 'fixed' }}>
      <Logo />
      <List sx={{ mx: 'auto' }}>
        <ListItem>
          <DashboardIcon sx={{ mr:2 }}/>
            <Typography variant="h6">
              <Link href='/' underline="none" >
                Dashboard
              </Link>
            </Typography>
        </ListItem>
      </List>
    </Box>
  )
}