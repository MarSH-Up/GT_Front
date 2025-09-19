import { Box, Typography, Paper } from '@mui/material';
import { Colors } from '../../design/theme';

export const Reports = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant='h4'
        sx={{
          mb: 3,
          color: Colors.primary.main,
          fontWeight: 700,
        }}
      >
        Reportes y Analytics
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ color: Colors.primary.main, mb: 2 }}>
          Panel de Reportes
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Funcionalidad de reportes próximamente...
        </Typography>
      </Paper>
    </Box>
  );
};