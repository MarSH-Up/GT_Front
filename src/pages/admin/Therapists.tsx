import { Box, Typography, Paper } from '@mui/material';
import { Colors } from '../../design/theme';

export const Therapists = () => {
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
        Gestión de Terapeutas
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ color: Colors.primary.main, mb: 2 }}>
          Lista de Terapeutas
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Funcionalidad de terapeutas próximamente...
        </Typography>
      </Paper>
    </Box>
  );
};