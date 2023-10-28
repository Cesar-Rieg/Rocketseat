import { BrowserRouter } from 'react-router-dom';

import { useAuth } from "../hooks/auth";
import { USER_ROLE } from '../utils/RoleConstants.js';

import { AuthRoutes } from './auth.routes';
import { AdminRoutes } from './admin.routes';
import { CustomerRoutes } from './customer.routes';
import { SaleRoutes } from './sale.routes';

export function Routes() {
  const { user } = useAuth();

  function AccessRoute() {
    switch(user.role) {
      case USER_ROLE.ADMIN: return <AdminRoutes />; 
      case USER_ROLE.CUSTOMER: return <CustomerRoutes />; 
      case USER_ROLE.SALE: return <SaleRoutes />; 
      default: <CustomerRoutes />; 
    }
  }

  return (
    <BrowserRouter>
      {user ? <AccessRoute /> : <AuthRoutes />}
    </BrowserRouter>
  );
}