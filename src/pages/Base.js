import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../components/Logo';
import { Navigate, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SideDrawer from '../components/SideDrawer';
import { Link } from '@mui/material';
import LearningPage from './LearningPage';
import LearningsPage from './LearningsPage';
import NewNote from './NewNotePage';
import Note from './NotePage';
import HeadingPage from './HeadingPage';
import TagsPage from './TagsPage';
import AccountPage from './AccountPage';
import Utilities from '../Utilities';

export default function Base() {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const handleLogout = () => {
    fetch(Utilities.railsUrls.logout(), {
      method: 'POST',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(body => {
      if (body.logged_out) {
        window.location.reload(true)
      } else {
        console.log(body)
      }
    })
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{
        bgcolor: 'white',
        color: 'black'
      }}>
        <Box sx={{
          ml: 3, 
          display: 'flex',
          alignItems: 'center',
          width: '95%' //`calc(100% - 60px)`
        }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{ marginRight: 5 }}>
            <MenuIcon />
          </IconButton>
          <Logo />
          <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'end', gap: 3 }}>
            <Link href='account'><AccountCircleOutlinedIcon /></Link>
            <Link underline='hover' sx={{ cursor: 'pointer' }} onClick={handleLogout}>Logout</Link>
          </Box>
        </Box>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader />
        <SideDrawer open={open} />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p:3, width: `calc(100% - ${drawerWidth}px)` }}>
        <DrawerHeader />
        <Routes>
          <Route path='/dash' element={ <Dashboard /> } />
          <Route path='/login' element={ <Navigate to='/' /> } />
          <Route path='/account' element={ <AccountPage /> } />
          <Route path='/tags' element={ <TagsPage /> } />
          <Route path='/learnings' element={ <LearningsPage />} />
          <Route path='/learnings/:id' element={ <LearningPage /> } />
          <Route path='/headings/:id' element={ <HeadingPage /> } />
          <Route path='/headings/:id/note/new' element={ <NewNote /> } />
          <Route path='/notes/:id' element={ <Note /> } />
          <Route path='/' element={ <Navigate to='/dash' /> } />
        </Routes>
      </Box>
    </Box>
  );
}

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);