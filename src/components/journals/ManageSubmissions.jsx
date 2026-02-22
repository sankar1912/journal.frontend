  'use client';

  import React, { useEffect, useState } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { fetchNotVerifiedManuscripts, makeApprove, makeReject } from '@/redux/actions/manuscriptsAction';
  import { getManuscriptsState } from '@/redux/slices/manuscriptsSlice';
  import {
    Box,
    Paper,
    Typography,
    Chip,
    Avatar,
    Grid,
    Button,
    Stack,
    Divider,
    useTheme,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Tooltip,
  } from '@mui/material';
  import { motion } from 'framer-motion';
  import CheckCircleIcon from '@mui/icons-material/CheckCircle';
  import CancelIcon from '@mui/icons-material/Cancel';
  import VisibilityIcon from '@mui/icons-material/Visibility';
  import Link from 'next/link';

  const MotionPaper = motion(Paper);

  const ManageSubmissions = ({ id }) => {
    const dispatch = useDispatch();
    const { manuscripts, loading } = useSelector(getManuscriptsState);
    const { search } = manuscripts;

    const theme = useTheme();

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedAction, setSelectedAction] = useState(null); // 'approve' or 'reject'
    const [selectedManuscript, setSelectedManuscript] = useState(null);

    useEffect(() => {
      dispatch(fetchNotVerifiedManuscripts(id));
    }, [id]);

    const handleActionClick = (action, manuscript) => {
      setSelectedAction(action);
      setSelectedManuscript(manuscript._id);
      setOpenDialog(true);
      console.log(manuscript._id)
    };

    const handleDialogClose = () => {
      setOpenDialog(false);
      setSelectedAction(null);
      setSelectedManuscript(null);
    };

    const handleProceed = () => {
      if (selectedAction === 'approve') {
        console.log('Approved:', selectedManuscript._id);
        dispatch(makeApprove(selectedManuscript))
        // dispatch(approveManuscript(selectedManuscript._id));
      } else {
        console.log('Rejected:', selectedManuscript._id);
        dispatch(makeReject(selectedManuscript))
        // dispatch(rejectManuscript(selectedManuscript._id));
      }
      handleDialogClose();
    };

    const renderAuthors = (authors) => {
      const all = [...(authors.firstAuthors || []), ...(authors.correspondingAuthors || [])];
      const unique = Array.from(new Map(all.map((a) => [a._id, a])).values());
      return (
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" mt={1}>
          {unique.map((a) => (
            <Tooltip key={a._id} title={`View ${a.name}'s profile`} arrow>
              <Link href={`/author/${a._id}`} style={{ textDecoration: 'none' }}>
                <Chip
                  clickable
                  avatar={<Avatar src={a.profileImage} />}
                  label={a.name}
                  variant="outlined"
                  sx={{
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                />
              </Link>
            </Tooltip>
          ))}
        </Stack>
      );
    };

    const renderUploads = (uploads = {}) => {
      const items = [
        { label: 'Manuscript', key: 'manuscript' },
        { label: 'Cover Letter', key: 'coverLetter' },
        { label: 'Supplementary Material', key: 'supplementaryMaterial' },
      ];
      return (
        <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
          {items.map(({ label, key }) => {
            const url = uploads[key];
            if (!url) return null;
            return (
              <Button
                key={key}
                variant="outlined"
                size="small"
                startIcon={<VisibilityIcon />}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ borderRadius: 3 }}
              >
                {label}
              </Button>
            );
          })}
        </Stack>
      );
    };

    if (loading) return <>Loading submissions...</>;
    if (!search || search.length === 0) return <>No submissions found.</>;

    return (
      <Box sx={{ px: 4, py: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Pending Manuscripts
        </Typography>

        <Grid container spacing={4}>
          {search.map((manuscript, index) => (
            <Grid item size={{xs:12, sm:6}} key={manuscript._id}>
              <MotionPaper
                elevation={4}
                whileHover={{ scale: 1.015 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                sx={{
                  borderRadius: 4,
                  p: 3,
                  background: theme.palette.background.paper,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {manuscript.manuscriptTitle}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: 'justify', mb: 2 }}
                >
                  {manuscript.abstract.slice(0, 200)}...
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" fontWeight="bold" color="primary">
                  Research Areas:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" mt={1} mb={2}>
                  {manuscript.researchAreas.map((area, i) => (
                    <Chip
                      key={i}
                      label={area}
                      size="small"
                      color="secondary"
                      variant="outlined"
                      sx={{ fontWeight: 500 }}
                    />
                  ))}
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" fontWeight="bold" color="primary">
                  Authors:
                </Typography>
                {renderAuthors(manuscript.authors)}

                {renderUploads(manuscript.uploads)}

                <Stack direction="row" spacing={2} mt={3} justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<CancelIcon />}
                    onClick={() => handleActionClick('reject', manuscript)}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="contained"
                    color="info"
                    startIcon={<CheckCircleIcon />}
                    onClick={() => handleActionClick('approve', manuscript)}
                  >
                    Approve
                  </Button>
                </Stack>
              </MotionPaper>
            </Grid>
          ))}
        </Grid>

        {/* Confirmation Modal */}
        <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="xs" fullWidth>
          <DialogTitle>
            {selectedAction === 'approve' ? 'Approve Manuscript?' : 'Reject Manuscript?'}
          </DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to{' '}
              <strong>{selectedAction === 'approve' ? 'approve' : 'reject'}</strong> the manuscript{' '}
              <strong>{selectedManuscript?.manuscriptTitle}</strong>?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button
              onClick={handleProceed}
              variant="contained"
              color={selectedAction === 'approve' ? 'primary' : 'error'}
            >
              Continue
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  };

  export default ManageSubmissions;
