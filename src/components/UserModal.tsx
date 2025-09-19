import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Box,
  SelectChangeEvent,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/useAppSelector';
import { createUser, updateUser } from '../redux/gt/gt.action';
import { clearUserManagementError } from '../redux/gt/gt.slice';
import { User, UserAccessLevel, CreateUserDto, UpdateUser } from '../types/user.types';

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  user?: User | null;
}

interface ExtendedFormData extends CreateUserDto {
  phone?: string;
  city?: string;
  state?: string;
  country?: string;
  gender?: string;
}

const initialFormData: ExtendedFormData = {
  email: '',
  password: '',
  name: '',
  therapistId: '',
  age: 0,
  institutionId: '',
  createdBy: '',
  userAccessLevel: UserAccessLevel.USER,
  phone: '',
  city: '',
  state: '',
  country: '',
  gender: '',
};

export const UserModal: React.FC<UserModalProps> = ({ open, onClose, user }) => {
  const dispatch = useAppDispatch();
  const { usersLoading, userManagementError, userInfo } = useAppSelector((state) => state.gt);
  const [formData, setFormData] = useState<ExtendedFormData>(initialFormData);
  const isEditing = !!user;

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        password: '',
        name: user.name,
        therapistId: user.therapistId || '',
        age: user.age || 0,
        institutionId: user.institutionId || '',
        createdBy: userInfo?.id || '',
        userAccessLevel: user.userAccessLevel,
        phone: user.phone || '',
        city: user.city || '',
        state: user.state || '',
        country: user.country || '',
        gender: user.gender || '',
      });
    } else {
      setFormData({
        ...initialFormData,
        createdBy: userInfo?.id || '',
      });
    }
  }, [user, userInfo]);

  useEffect(() => {
    if (open) {
      dispatch(clearUserManagementError());
    }
  }, [open, dispatch]);

  const handleInputChange = (field: keyof ExtendedFormData) => (
    event: React.ChangeEvent<HTMLInputElement | { value: unknown }> | SelectChangeEvent
  ) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (isEditing && user) {
      const updateData: UpdateUser = {
        email: formData.email,
        name: formData.name,
        age: formData.age,
        phone: formData.phone,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        gender: formData.gender,
      };
      
      if (formData.password) {
        updateData.password = formData.password;
      }
      
      dispatch(updateUser(updateData)).then((action: any) => {
        if (action.type.endsWith('/fulfilled')) {
          onClose();
        }
      });
    } else {
      dispatch(createUser(formData)).then((action: any) => {
        if (action.type.endsWith('/fulfilled')) {
          onClose();
        }
      });
    }
  };

  const handleClose = () => {
    onClose();
    setFormData({
      ...initialFormData,
      createdBy: userInfo?.id || '',
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {isEditing ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {userManagementError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {userManagementError}
            </Alert>
          )}
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre"
                value={formData.name}
                onChange={handleInputChange('name')}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={isEditing ? 'Nueva Contraseña (opcional)' : 'Contraseña'}
                type="password"
                value={formData.password}
                onChange={handleInputChange('password')}
                required={!isEditing}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Rol de Usuario</InputLabel>
                <Select
                  value={formData.userAccessLevel}
                  onChange={handleInputChange('userAccessLevel')}
                  label="Rol de Usuario"
                >
                  <MenuItem value={UserAccessLevel.USER}>Usuario</MenuItem>
                  <MenuItem value={UserAccessLevel.THERAPIST}>Terapeuta</MenuItem>
                  <MenuItem value={UserAccessLevel.DOCTOR}>Doctor</MenuItem>
                  <MenuItem value={UserAccessLevel.ADMIN}>Administrador</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Edad"
                type="number"
                value={formData.age}
                onChange={handleInputChange('age')}
                inputProps={{ min: 1, max: 120 }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ID de Terapeuta"
                value={formData.therapistId}
                onChange={handleInputChange('therapistId')}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="ID de Institución"
                value={formData.institutionId}
                onChange={handleInputChange('institutionId')}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Teléfono"
                value={formData.phone}
                onChange={handleInputChange('phone')}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Género"
                value={formData.gender}
                onChange={handleInputChange('gender')}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ciudad"
                value={formData.city}
                onChange={handleInputChange('city')}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Estado/Provincia"
                value={formData.state}
                onChange={handleInputChange('state')}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="País"
                value={formData.country}
                onChange={handleInputChange('country')}
              />
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose} disabled={usersLoading}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={usersLoading}
          >
            {isEditing ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};