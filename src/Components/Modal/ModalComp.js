import React, { useState } from 'react';
import { Button, Modal, Box, Typography, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

const ModalComp = ({ open, closeModal, handleDelete, onsubmit, data }) => {
  const [title, setTitle] = useState(data.title);
  const [date, setDate] = useState(data.date);
  const [startTime, setStartTime] = useState(data.startTime);
  const [endTime, setEndTime] = useState(data.endTime);
  const [description, setDescription] = useState(data.description);
  const [modalTitle, setModalTitle] = useState(data.modalTitle);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'title') setTitle(value);
    else if (name === 'date') setDate(value);
    else if (name === 'startTime') setStartTime(value);
    else if (name === 'endTime') setEndTime(value);
    else if (name === 'description') setDescription(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onsubmit({ title, date, startTime, endTime, description });
    setTitle('');
    setDate(null);
    setStartTime(null);
    setEndTime(null);
    setDescription(null);
    closeModal();
  };

  const handleDeleteClick = () => {
    handleDelete();
    closeModal();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" sx={{ display: 'flex', justifyContent: 'space-between;' }} >
            {modalTitle}
            <Box>
            <IconButton onClick={handleDeleteClick} color="error">
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={closeModal} color="inherit">
              <CloseIcon />
            </IconButton>
          </Box>
          </Typography>
          

          <TextField
            label="Event title"
            name="title"
            value={title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Box sx={{ display: 'flex', gap: '16px' }}>
            <TextField
              label="Start Time"
              name="startTime"
              value={startTime}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="End Time"
              name="endTime"
              value={endTime}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Box>

          <TextField
            label="Date"
            name="date"
            value={date}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Description"
            name="description"
            value={description}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
            <Button variant="contained" onClick={handleSubmit}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ModalComp;
