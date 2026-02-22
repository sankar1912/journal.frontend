import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getJournalState } from '@/redux/slices/journalSlice'
import {
  Paper,
  Typography,
  Chip,
  Stack,
  Skeleton,
  Box,
  Avatar,
  Divider,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { motion } from 'framer-motion'
import VerifiedIcon from '@mui/icons-material/Verified'

function JournalArticlesList() {
  const { selectedJournal, loading } = useSelector(getJournalState)
  const manuscripts = selectedJournal?.manuscripts || []
  const [expandedIdx, setExpandedIdx] = useState(null)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const getAbstractPreview = (abstract) => {
    if (!abstract) return ''
    const words = abstract.split(/\s+/)
    return words.length > 150 ? words.slice(0, 50).join(' ') + '...' : abstract
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
        color="primary"
        textAlign="center"
      >
        Manuscripts
      </Typography>

      {loading ? (
        Array.from({ length: 2 }).map((_, idx) => (
          <Skeleton
            key={idx}
            variant="rectangular"
            height={200}
            sx={{ borderRadius: 4, mb: 3 }}
          />
        ))
      ) : manuscripts.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
          <Typography color="text.secondary">
            No manuscripts found.
          </Typography>
        </Paper>
      ) : (
        manuscripts.map((manuscript, idx) => {
          const isExpanded = expandedIdx === idx

          return (
            <motion.div
              key={manuscript._id || idx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              style={{ marginBottom: 24 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: { xs: 2.5, sm: 4 },
                  borderRadius: 4,
                }}
              >
                <Stack spacing={2}>

                  {/* Title & Date */}
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={1}
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="primary"
                      sx={{ wordBreak: 'break-word' }}
                    >
                      {manuscript.manuscriptTitle}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      Submitted:{' '}
                      {new Date(manuscript.createdAt).toLocaleDateString()}
                    </Typography>
                  </Stack>

                  {/* Authors & Action */}
                  <Stack spacing={1.5}>
                    <Stack
                      direction="row"
                      spacing={1}
                      flexWrap="wrap"
                    >
                      {(manuscript.authors?.firstAuthors || []).map((author, i) => (
                        <Tooltip key={author._id || i} title={author.email || ''}>
                          <Chip
                            avatar={<Avatar src={author.profileImage} />}
                            label={author.name}
                            size={isMobile ? 'small' : 'medium'}
                            variant="outlined"
                            color="primary"
                            sx={{ fontWeight: 600 }}
                          />
                        </Tooltip>
                      ))}
                      {(manuscript.authors?.correspondingAuthors || []).map((author, i) => (
                        <Tooltip key={author._id || i} title={author.email || ''}>
                          <Chip
                            avatar={<Avatar src={author.profileImage} />}
                            label={author.name}
                            size={isMobile ? 'small' : 'medium'}
                            variant="filled"
                            color="primary"
                            sx={{ fontWeight: 600 }}
                          />
                        </Tooltip>
                      ))}
                    </Stack>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      style={{
                        alignSelf: isMobile ? 'stretch' : 'flex-start',
                        padding: '8px 18px',
                        background: '#1976d2',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 6,
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      View Manuscript
                    </motion.button>
                  </Stack>

                  <Divider />

                  {/* Abstract */}
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: 'justify',
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      lineHeight: 1.6,
                    }}
                  >
                    <strong>Abstract:</strong>{' '}
                    {isExpanded
                      ? manuscript.abstract
                      : getAbstractPreview(manuscript.abstract)}

                    {manuscript.abstract &&
                      manuscript.abstract.split(/\s+/).length > 150 && (
                        <motion.button
                          onClick={() =>
                            setExpandedIdx(isExpanded ? null : idx)
                          }
                          whileHover={{ scale: 1.05 }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#1976d2',
                            cursor: 'pointer',
                            marginLeft: 8,
                            fontWeight: 500,
                          }}
                        >
                          {isExpanded ? 'Show less' : 'Show more'}
                        </motion.button>
                      )}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    <strong>Keywords:</strong> {manuscript.keywords}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    <strong>Ethical Approval:</strong> {manuscript.ethicalApproval}
                    {' | '}
                    <strong>Funding:</strong> {manuscript.fund}
                  </Typography>

                  <Divider />

                  {/* Research Areas */}
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {manuscript.researchAreas?.map((area, i) => (
                      <Chip
                        key={i}
                        label={area}
                        size="small"
                        color="info"
                        variant="outlined"
                      />
                    ))}
                  </Stack>

                  <Divider />

                  {/* Status Chips */}
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Chip
                      label={manuscript.typeOfManuscript}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      label={manuscript.type}
                      size="small"
                      color="primary"
                    />
                    {manuscript.status && (
                      <Chip
                        label={manuscript.status}
                        size="small"
                        color={
                          manuscript.status === 'Approved'
                            ? 'success'
                            : manuscript.status === 'Rejected'
                              ? 'error'
                              : 'warning'
                        }
                      />
                    )}
                    {manuscript.isVerified && (
                      <Chip
                        icon={<VerifiedIcon />}
                        label="Verified"
                        size="small"
                        color="success"
                      />
                    )}
                  </Stack>

                </Stack>
              </Paper>
            </motion.div>
          )
        })
      )}
    </Box>
  )
}

export default JournalArticlesList
