import React, { useState } from 'react';
import { Button, Modal, Box, Typography, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

class ModalCompo extends React.Component {
    state = {
        open: this.props.open,
        title: "",
        description: ""
    };

  handleOpen = () => {
    // setOpen(true);
  };

  handleClose = () => {
    // setOpen(false);
  };

  handleEdit = () => {
    // Handle edit functionality
  };

  handleDelete = () => {
    // Handle delete functionality
  };

    render() {
        const { open } = this.state
        return (
            <>
            <Modal
                open={open}
                onClose={this.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <Typography variant="h6" component="h2">
                    Create Event
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton onClick={this.handleDelete} color="error">
                    <DeleteIcon />
                    </IconButton>
                    
                    <IconButton onClick={this.props.closeModal} color="inherit">
                    <CloseIcon />
                    </IconButton>
                </Box>
                <TextField
                    label="Title"
                    value={this.title}
                    // onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Description"
                    value={this.description}
                    // onChange={(e) => setDescription(e.target.value)}
                    multiline
                    rows={4}
                    fullWidth
                    margin="normal"
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                    <Button variant="contained">Save</Button>
                </Box>
                </Box>
            </Modal>
            </>
        );
    }
};

export default ModalCompo;
