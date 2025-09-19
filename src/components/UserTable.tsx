import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
  Chip,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../hooks/useAppSelector';
import { getAllUsers, deleteUser } from '../redux/gt/gt.action';
import { User, UserAccessLevel } from '../types/user.types';
import { Colors } from '../design/theme';

interface UserTableProps {
  onEditUser: (user: User) => void;
}

const getUserAccessLevelColor = (level: UserAccessLevel) => {
  switch (level) {
    case UserAccessLevel.ADMIN:
      return 'error';
    case UserAccessLevel.THERAPIST:
      return 'primary';
    case UserAccessLevel.DOCTOR:
      return 'secondary';
    case UserAccessLevel.USER:
      return 'default';
    default:
      return 'default';
  }
};

export const UserTable: React.FC<UserTableProps> = ({ onEditUser }) => {
  const dispatch = useAppDispatch();
  const { users, usersLoading, userManagementError } = useAppSelector((state) => state.gt);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('¿Está seguro de que desea eliminar este usuario?')) {
      dispatch(deleteUser(userId));
    }
  };

  if (usersLoading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (userManagementError) {
    return (
      <Box p={2}>
        <Typography color="error">{userManagementError}</Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: Colors.primary.light }}>
            <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Rol</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Edad</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Teléfono</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Ciudad</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} hover>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Chip
                  label={user.userAccessLevel}
                  color={getUserAccessLevelColor(user.userAccessLevel) as any}
                  size="small"
                />
              </TableCell>
              <TableCell>{user.age || '-'}</TableCell>
              <TableCell>{user.phone || '-'}</TableCell>
              <TableCell>{user.city || '-'}</TableCell>
              <TableCell>
                <IconButton
                  size="small"
                  onClick={() => onEditUser(user)}
                  sx={{ color: Colors.primary.main }}
                >
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteUser(user.id)}
                  sx={{ color: 'error.main' }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {users.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <Typography variant="body2" color="textSecondary">
                  No hay usuarios registrados
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};