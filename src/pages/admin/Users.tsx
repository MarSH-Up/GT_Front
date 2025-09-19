import { useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Colors } from '../../design/theme';
import { UserTable } from '../../components/UserTable';
import { UserModal } from '../../components/UserModal';
import { User } from '../../types/user.types';

export const Users = () => {
  const { userInfo } = useAppSelector((state) => state.gt);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsUserModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsUserModalOpen(false);
    setSelectedUser(null);
  };

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
        Gestión de Usuarios
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h5" sx={{ color: Colors.primary.main }}>
            Lista de Usuarios
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleCreateUser}
            sx={{
              backgroundColor: Colors.primary.main,
              '&:hover': {
                backgroundColor: Colors.primary.dark,
              },
            }}
          >
            Crear Usuario
          </Button>
        </Box>
        <UserTable onEditUser={handleEditUser} />
      </Paper>

      <UserModal
        open={isUserModalOpen}
        onClose={handleCloseModal}
        user={selectedUser}
      />
    </Box>
  );
};