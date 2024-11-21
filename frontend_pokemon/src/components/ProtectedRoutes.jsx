import { Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/auth_context';

export default function ProtectedRoutes(){
    const { cookies } = useAuth(); //Pulls cookies out of Auth Context

    return cookies.token ? <Outlet /> : <h2>Must be signed in to view this page.</h2>
}