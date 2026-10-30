import React from 'react';
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/**
 * Reusable inline error/success alert with close button.
 * Works in both light and dark themes via MUI's theme tokens.
 *
 * Props:
 *   message  – string to display
 *   severity – 'error' | 'success' | 'warning' | 'info'  (default: 'error')
 *   onClose  – () => void
 */
const ErrorAlert = ({ message, severity = 'error', onClose }) => {
  if (!message) return null;

  return (
    <Collapse in={Boolean(message)}>
      <Alert
        severity={severity}
        variant="outlined"
        action={
          onClose ? (
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={onClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          ) : null
        }
        sx={{
          borderRadius: 2,
          fontSize: '0.85rem',
          alignItems: 'center',
          // ensure readable in dark mode
          bgcolor: severity === 'error'   ? 'var(--color-error-bg)'   : undefined,
          color:   severity === 'error'   ? 'var(--color-error-text)' : undefined,
        }}
      >
        {message}
      </Alert>
    </Collapse>
  );
};

export default ErrorAlert;
