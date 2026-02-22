"use client";

import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  Chip,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthState } from '@/redux/slices/authSlice';
import { getAuthorDetailsByEmail } from '@/redux/actions/authActions';
import { getJournalState } from '@/redux/slices/journalSlice';
import { setMessage } from '@/redux/slices/notificationSlice';
import { motion } from 'framer-motion';
import { modifyJournal } from '@/redux/actions/journalActions';
import { Info } from '@mui/icons-material';

function ManageEditors() {
  const dispatch = useDispatch();
  const { searchedAuthor, loading, auth } = useSelector(getAuthState);
  const { selectedJournal } = useSelector(getJournalState);

  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [roleToRemove, setRoleToRemove] = useState('');
  const [openRemoveConfirm, setOpenRemoveConfirm] = useState(false);

  const handleVerify = () => {
    if (email.trim()) {
      dispatch(getAuthorDetailsByEmail(email.trim()));
      setSelectedRole('');
    }
  };

  const isInEditorialBoard = () => {
    if (!searchedAuthor || !selectedJournal?.editorialBoard) return [];

    const { editorInChief, associateEditors, reviewers } = selectedJournal.editorialBoard;
    const positions = [];

    if (editorInChief?.some(member => member._id === searchedAuthor._id)) positions.push('Editor-in-Chief');
    if (associateEditors?.some(member => member._id === searchedAuthor._id)) positions.push('Associate Editor');
    if (reviewers?.some(member => member._id === searchedAuthor._id)) positions.push('Reviewer');

    return positions;
  };

  const handleAssign = () => {
    if (!selectedRole) {
      dispatch(setMessage('Please select a role to assign.'));
      return;
    }

    if (searchedAuthor._id === auth._id) {
      dispatch(setMessage("You can't change your own editorial position."));
      return;
    }

    setOpenConfirmModal(true);
  };

  const handleConfirm = async () => {
    try {
      const updatedData = {
        ...selectedJournal,
        editorialBoard: { ...selectedJournal.editorialBoard },
      };

      const field =
        selectedRole === 'Editor-in-Chief'
          ? 'editorInChief'
          : selectedRole === 'Associate Editor'
          ? 'associateEditors'
          : 'reviewers';

      // Extract only IDs from existing members
      const currentList = new Set(
        updatedData.editorialBoard[field].map(member => member._id || member)
      );
      currentList.add(searchedAuthor._id);
      updatedData.editorialBoard[field] = Array.from(currentList);

      await dispatch(modifyJournal(selectedJournal._id, updatedData));

      dispatch(setMessage(`${searchedAuthor.name} assigned as ${selectedRole}`));
      setOpenConfirmModal(false);
    } catch (err) {
      dispatch(setMessage('Failed to assign role.'));
    }
  };

  const handleRemoveClick = (role) => {
    if (searchedAuthor._id === auth._id) {
      dispatch(setMessage("You can't remove your own editorial position."));
      return;
    }
    setRoleToRemove(role);
    setOpenRemoveConfirm(true);
  };

  const handleConfirmRemove = async () => {
    try {
      const updatedData = {
        ...selectedJournal,
        editorialBoard: { ...selectedJournal.editorialBoard },
      };

      const field =
        roleToRemove === 'Editor-in-Chief'
          ? 'editorInChief'
          : roleToRemove === 'Associate Editor'
          ? 'associateEditors'
          : 'reviewers';

      updatedData.editorialBoard[field] = updatedData.editorialBoard[field]
        .map(member => member._id || member)
        .filter(id => id !== searchedAuthor._id);

      await dispatch(modifyJournal(selectedJournal._id, updatedData));

      dispatch(setMessage(`${searchedAuthor.name} removed from ${roleToRemove}`));
      setOpenRemoveConfirm(false);
    } catch (err) {
      dispatch(setMessage('Failed to remove role.'));
    }
  };

  const existingRoles = isInEditorialBoard();

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, mx: 'auto', width: '90%' }}>
      <Typography sx={{textAlign:'center'}} variant='h4' color='primary'>Search Authors &nbsp;
        <Tooltip title="Assign positions to authors for reviewing manuscripts">
        <Info/>
      </Tooltip>
      </Typography>
      
      <Paper elevation={3} sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          label="Author Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          onClick={handleVerify}
        >
          Search
        </Button>
      </Paper>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : searchedAuthor ? (
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card elevation={6} sx={{ borderRadius: 4, p: 3, boxShadow: '0 8px 16px rgba(0,0,0,0.1)', mb: 4 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item size={{xs:12, md:4}}>
                <CardMedia
                  component="img"
                  image={searchedAuthor?.profileImage || '/default-author.jpg'}
                  alt={searchedAuthor?.name}
                  sx={{ width: '100%', borderRadius: 4, height: 'auto' }}
                />
              </Grid>

              <Grid item size={{xs:12, md:8}}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    <PersonIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Name: {searchedAuthor.name}
                  </Typography>

                  <Typography variant="body1" gutterBottom>
                    <EmailIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Email: {searchedAuthor.email}
                  </Typography>

                  <Typography variant="body1" gutterBottom>
                    <BadgeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    ORC ID: {searchedAuthor.orcid || 'Not Provided'}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {searchedAuthor.bio || 'No biography available.'}
                  </Typography>

                  {existingRoles.length > 0 && (
                    <Box mt={2}>
                      <Typography variant="body1" fontWeight="bold" gutterBottom>
                        Current Editorial Positions:
                      </Typography>
                      <Box display="flex" gap={1} flexWrap="wrap">
                        {existingRoles.map((role, index) => (
                          <Chip
                            key={index}
                            label={role}
                            color="success"
                            onDelete={() => handleRemoveClick(role)}
                            sx={{ cursor: 'pointer' }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}

                  {existingRoles.length < 3 && (
                    <Box mt={4}>
                      <FormControl component="fieldset">
                        <Typography variant="body1" fontWeight="bold" gutterBottom>
                          Assign Editorial Position:
                        </Typography>
                        <RadioGroup
                          row
                          value={selectedRole}
                          onChange={(e) => setSelectedRole(e.target.value)}
                        >
                          {!existingRoles.includes('Editor-in-Chief') && (
                            <FormControlLabel value="Editor-in-Chief" control={<Radio />} label="Editor-in-Chief" />
                          )}
                          {!existingRoles.includes('Associate Editor') && (
                            <FormControlLabel value="Associate Editor" control={<Radio />} label="Associate Editor" />
                          )}
                          {!existingRoles.includes('Reviewer') && (
                            <FormControlLabel value="Reviewer" control={<Radio />} label="Reviewer" />
                          )}
                        </RadioGroup>
                      </FormControl>
                      <br />
                      <Button variant="contained" sx={{ mt: 2, borderRadius: 3 }} onClick={handleAssign}>
                        Assign Role
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Grid>
            </Grid>
          </Card>

          {/* Assign Modal */}
          <Dialog open={openConfirmModal} onClose={() => setOpenConfirmModal(false)}>
            <DialogTitle>Confirm Role Assignment</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to assign <strong>{searchedAuthor.name}</strong> as{' '}
                <strong>{selectedRole}</strong>?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenConfirmModal(false)} color="secondary" variant="outlined">
                Cancel
              </Button>
              <Button onClick={handleConfirm} color="primary" variant="contained">
                Continue
              </Button>
            </DialogActions>
          </Dialog>

          {/* Remove Modal */}
          <Dialog open={openRemoveConfirm} onClose={() => setOpenRemoveConfirm(false)}>
            <DialogTitle>Confirm Role Removal</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to remove <strong>{searchedAuthor.name}</strong> from{' '}
                <strong>{roleToRemove}</strong>?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenRemoveConfirm(false)} color="secondary" variant="outlined">
                Cancel
              </Button>
              <Button onClick={handleConfirmRemove} color="error" variant="contained">
                Remove
              </Button>
            </DialogActions>
          </Dialog>
        </motion.div>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mt={4}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Search for an author to see details.
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default ManageEditors;
