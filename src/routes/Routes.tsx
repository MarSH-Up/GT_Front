import { Navigate, Route, Routes as RouterRoutes } from 'react-router-dom';
import RoutesEnum from '../types/routes.enum';
import Login from '../pages/Login';
import Home from '../pages/Home';
import FullScreen from '../design/Layouts/FullScreen';
import ProtectedRoute from './ProtectRoute';
import { Admin } from '../pages/Admin';
import { Users } from '../pages/admin/Users';
import { Therapists } from '../pages/admin/Therapists';
import { Institutions } from '../pages/admin/Institutions';
import { Patients } from '../pages/admin/Patients';
import { Reports } from '../pages/admin/Reports';

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path='/login' element={<Login />} />
      <Route element={<FullScreen />}>
        <Route
          path={RoutesEnum.HOME}
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path={RoutesEnum.ADMIN_HOME}
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path={RoutesEnum.ADMIN_USERS}
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path={RoutesEnum.ADMIN_THERAPISTS}
          element={
            <ProtectedRoute>
              <Therapists />
            </ProtectedRoute>
          }
        />
        <Route
          path={RoutesEnum.ADMIN_INSTITUTIONS}
          element={
            <ProtectedRoute>
              <Institutions />
            </ProtectedRoute>
          }
        />
        <Route
          path={RoutesEnum.ADMIN_PATIENTS}
          element={
            <ProtectedRoute>
              <Patients />
            </ProtectedRoute>
          }
        />
        <Route
          path={RoutesEnum.ADMIN_REPORTS}
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path='*' element={<Navigate to='/login' />} />
    </RouterRoutes>
  );
};

export default Routes;
