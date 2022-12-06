import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import { Link } from 'react-router-dom';


export default function SideDrawer({ open }) {
  
  const links = [
    {text: 'Dashboard', icon: <DashboardRoundedIcon />, link: '/'},
    {text: 'Learnings', icon: <MenuBookRoundedIcon />, link: '/learnings'},
    {text: 'Tags', icon: <LocalOfferRoundedIcon />, link: '/tags'}
  ]
  
  return (
    <List sx={{ pt: 3 }}>
      {links.map(({text, icon, link}) => (
        <ListItem className='drawer-link' key={text} disablePadding sx={{ display: 'block' }}>
          <ListItemButton LinkComponent={Link} href={link}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}>
              {icon}
            </ListItemIcon>
            <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}