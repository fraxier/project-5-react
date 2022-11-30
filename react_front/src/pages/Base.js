import { Box } from '@mui/material';
import React from 'react'

import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Sidebar from '../components/Sidebar';

import '../css/Base.css'

export default function Base() {

  return (
    <Box sx={{ display: 'flex', flexWrap: 'nowrap', overflowX:'hidden', flexShrink: 0, alignContent: 'stretch', height: '100%', background: '#f8f9fa', textAlign: 'center' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', ml: '300px', p: 3, pt: 5, width: 'calc(100% - 300px)' }}>
        <Routes>
          <Route path='/' element={ <Dashboard /> } />
        </Routes>
      </Box>
    </Box>
  )
}