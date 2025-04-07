import { Navigate, Route, Routes as RouterRoutes } from 'react-router-dom';
import RoutesEnum from '../types/routes.enum';
import Login from '../pages/Login';
import Home from '../pages/Home';
import FullScreen from '../design/Layouts/FullScreen';
import ProtectedRoute from './ProtectRoute';

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
      </Route>

      <Route path='*' element={<Navigate to='/login' />} />
    </RouterRoutes>
  );
};

export default Routes;
