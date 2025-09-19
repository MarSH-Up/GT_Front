import { Box, Typography, Paper, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { People, MedicalServices, Business, LocalHospital, Analytics } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useHasMenuAccess } from '../hooks/useMenuItems';
import { Colors } from '../design/theme';
import RoutesEnum from '../types/routes.enum';

export const Admin = () => {
  const navigate = useNavigate();
  const hasReportsAccess = useHasMenuAccess('Reportes');
  const hasUserManagementAccess = useHasMenuAccess('Usuarios');
  const hasTherapistAccess = useHasMenuAccess('Terapeutas');
  const hasInstitutionAccess = useHasMenuAccess('Instituciones');
  const hasPatientsAccess = useHasMenuAccess('Pacientes');

  const adminSections = [
    { 
      name: 'Usuarios', 
      hasAccess: hasUserManagementAccess, 
      icon: <People sx={{ fontSize: 40 }} />, 
      route: RoutesEnum.ADMIN_USERS,
      description: 'Gestionar usuarios del sistema'
    },
    { 
      name: 'Terapeutas', 
      hasAccess: hasTherapistAccess, 
      icon: <MedicalServices sx={{ fontSize: 40 }} />, 
      route: RoutesEnum.ADMIN_THERAPISTS,
      description: 'Administrar terapeutas'
    },
    { 
      name: 'Instituciones', 
      hasAccess: hasInstitutionAccess, 
      icon: <Business sx={{ fontSize: 40 }} />, 
      route: RoutesEnum.ADMIN_INSTITUTIONS,
      description: 'Gestionar instituciones'
    },
    { 
      name: 'Pacientes', 
      hasAccess: hasPatientsAccess, 
      icon: <LocalHospital sx={{ fontSize: 40 }} />, 
      route: RoutesEnum.ADMIN_PATIENTS,
      description: 'Administrar pacientes'
    },
    { 
      name: 'Reportes', 
      hasAccess: hasReportsAccess, 
      icon: <Analytics sx={{ fontSize: 40 }} />, 
      route: RoutesEnum.ADMIN_REPORTS,
      description: 'Ver reportes y analytics'
    },
  ].filter(section => section.hasAccess);

  const handleSectionClick = (route: string) => {
    navigate(route);
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
        Panel de Administración
      </Typography>

      <Typography
        variant='h6'
        sx={{
          mb: 4,
          color: 'text.secondary',
        }}
      >
        Selecciona una sección para gestionar
      </Typography>

      <Grid container spacing={3}>
        {adminSections.map((section) => (
          <Grid item xs={12} sm={6} md={4} key={section.name}>
            <Card
              sx={{
                height: '100%',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
                cursor: 'pointer',
              }}
            >
              <CardActionArea
                onClick={() => handleSectionClick(section.route)}
                sx={{ height: '100%', p: 2 }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    minHeight: 150,
                  }}
                >
                  <Box
                    sx={{
                      color: Colors.primary.main,
                      mb: 2,
                    }}
                  >
                    {section.icon}
                  </Box>
                  
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      color: Colors.primary.main,
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    {section.name}
                  </Typography>
                  
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.5 }}
                  >
                    {section.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {adminSections.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No tienes acceso a ninguna sección administrativa
          </Typography>
        </Paper>
      )}
    </Box>
  );
};
