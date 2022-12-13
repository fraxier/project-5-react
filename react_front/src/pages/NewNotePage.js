import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingWheel from '../components/LoadingWheel';
import Utilities from '../Utilities';

export default function NewNotePage() {
	const [heading, setHeading] = useState();
	const { id } = useParams();
	const [content, setContent] = useState();
	const [formErrors, setFormErrors] = useState({message: ''});
  const navigate = useNavigate();

	useEffect(() => {
		fetch(Utilities.railsUrls.getHeading(id), { credentials: 'include' })
			.then((res) => res.json())
			.then((body) => {
				if ('error' in body) {
				} else {
					setHeading(body);
				}
			});
	}, []);

	const handleChange = (event) => {
		setContent(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const body = {
			note: {
				content: data.get('content'),
				heading_id: id,
			},
		};
    setFormErrors({message: ''})
		fetch(Utilities.railsUrls.createNote(id), {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})
			.then((res) => res.json())
			.then((body) => {
				if ('errors' in body) {
					setFormErrors({ message: body.errors });
				} else {
          navigate(`/headings/${id}`)
        }
			});
	};

	if (heading === undefined) return <LoadingWheel />;

	return (
		<Box>
			<Typography variant='h4'>{heading.name}</Typography>
			<Typography variant='h5'>Add Note</Typography>
			<Box component='form' noValidate onSubmit={handleSubmit}>
				<TextField 
          id='content' 
          name='content' 
          multiline 
          fullWidth 
          minRows={10} 
          value={content} 
          onChange={handleChange} 
          sx={{ mb: 2 }}
        />
				
        {!!formErrors.message && (
          <Alert severity='error' sx={{ mb: 2 }}>
            <Typography variant='code'>{` ${formErrors.message.join(' & ')} `}</Typography>
          </Alert>
        )}
        
        <Button type='submit' fullWidth variant='contained'>
					Submit
				</Button>
			</Box>
		</Box>
	);
}
