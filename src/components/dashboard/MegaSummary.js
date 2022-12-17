import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Chip } from '@mui/material';
import Utilities from '../../Utilities';
import ColoredChip from '../ColoredChip';

export default function MegaSummary({ data }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ width: '35%', position: 'absolute', right: 30, top: 50, zIndex: 99 }}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} elevation={3}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header">
          <Typography variant='h4' component='h5' sx={{ width: '50%', flexShrink: 0 }}>
            Mega Summary
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Started Learning: <br/>{Utilities.niceDate(data.started_learning, 'dddd, mmmm dS, yyyy')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total Learnings:</Typography>
            <Typography>{data.total_learnings} learnings</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Most used tags:</Typography>
            <Box>
              {data.most_common_tags && data.most_common_tags.map((tag) => (
                <ColoredChip key={tag.id}
                  bgColor={tag.bg_color}
                  color={tag.font_color}
                  icon={<Typography fontSize={1}>{tag.count}</Typography>} 
                  label={tag.name} 
                  size='small'
                />
              ))}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Number of tags:</Typography>
            <Typography>{data.total_tags} tags</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Completed Learnings:</Typography>
            <Typography>{data.total_completed} learnings</Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}