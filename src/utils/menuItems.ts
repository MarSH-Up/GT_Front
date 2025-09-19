import { UserAccessLevel } from '../redux/gt/gt.slice';

export interface MenuItem {
  name: string;
  route: string;
  disable: boolean;
  isLogo?: boolean;
  isLogout?: boolean;
  icon?: string;
  allowedRoles?: UserAccessLevel[];
}

// Common menu items for all users
const commonMenuItems: MenuItem[] = [
  {
    name: 'Gesture Therapy',
    route: '/',
    disable: false,
    isLogo: true,
  },
  {
    name: 'Perfil',
    route: '/profile',
    disable: false,
    icon: 'person',
  },
  {
    name: 'Cerrar Sesión',
    route: '/logout',
    disable: false,
    isLogout: true,
    icon: 'logout',
  },
];

// Menu items for regular users and students
const userMenuItems: MenuItem[] = [
  {
    name: 'Juego Libre',
    route: '/free-play',
    disable: false,
    icon: 'games',
    allowedRoles: [UserAccessLevel.USER, UserAccessLevel.STUDENT],
  },
  {
    name: 'Jugar Terapia',
    route: '/therapy-game',
    disable: false,
    icon: 'healing',
    allowedRoles: [UserAccessLevel.USER, UserAccessLevel.STUDENT],
  },
];

// Menu items for therapists and doctors
const therapistMenuItems: MenuItem[] = [
  {
    name: 'Mis Pacientes',
    route: '/patients',
    disable: false,
    icon: 'group',
    allowedRoles: [UserAccessLevel.THERAPIST, UserAccessLevel.DOCTOR],
  },
  {
    name: 'Sesiones',
    route: '/sessions',
    disable: false,
    icon: 'event',
    allowedRoles: [UserAccessLevel.THERAPIST, UserAccessLevel.DOCTOR],
  },
  {
    name: 'Crear Terapia',
    route: '/create-therapy',
    disable: false,
    icon: 'add_circle',
    allowedRoles: [UserAccessLevel.THERAPIST, UserAccessLevel.DOCTOR],
  },
];

// Menu items only for admins
const adminMenuItems: MenuItem[] = [
  {
    name: 'Panel de Administración',
    route: '/admin',
    disable: false,
    icon: 'dashboard',
    allowedRoles: [UserAccessLevel.ADMIN],
  },
  {
    name: 'Usuarios',
    route: '/admin/users',
    disable: false,
    icon: 'people',
    allowedRoles: [UserAccessLevel.ADMIN],
  },
  {
    name: 'Terapeutas',
    route: '/admin/therapists',
    disable: false,
    icon: 'medical_services',
    allowedRoles: [UserAccessLevel.ADMIN],
  },
  {
    name: 'Instituciones',
    route: '/admin/institutions',
    disable: false,
    icon: 'business',
    allowedRoles: [UserAccessLevel.ADMIN],
  },
  {
    name: 'Pacientes',
    route: '/admin/patients',
    disable: false,
    icon: 'local_hospital',
    allowedRoles: [UserAccessLevel.ADMIN],
  },
  {
    name: 'Reportes',
    route: '/admin/reports',
    disable: false,
    icon: 'analytics',
    allowedRoles: [UserAccessLevel.ADMIN],
  },
];

// Function to get menu items based on user role
export const getMenuItemsForRole = (userRole: UserAccessLevel): MenuItem[] => {
  let menuItems: MenuItem[] = [...commonMenuItems];

  switch (userRole) {
    case UserAccessLevel.ADMIN:
      // Admins get all menu items
      menuItems = [
        commonMenuItems[0], // Logo
        ...adminMenuItems,
      ];
      break;

    case UserAccessLevel.DOCTOR:
    case UserAccessLevel.THERAPIST:
      // Therapists and doctors get their specific items plus user items
      menuItems = [
        commonMenuItems[0], // Logo
        ...therapistMenuItems,
        ...userMenuItems,
        ...commonMenuItems.slice(1), // Profile and Logout
      ];
      break;

    case UserAccessLevel.STUDENT:
    case UserAccessLevel.USER:
    default:
      // Regular users and students get basic items
      menuItems = [
        commonMenuItems[0], // Logo
        ...userMenuItems,
        ...commonMenuItems.slice(1), // Profile and Logout
      ];
      break;
  }

  return menuItems;
};

// Legacy export for backward compatibility
export const menuItems = getMenuItemsForRole(UserAccessLevel.USER);
