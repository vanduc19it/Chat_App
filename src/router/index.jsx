import { Outlet, createBrowserRouter } from "react-router-dom";
import LoginScreen from "../components/LoginScreen/LoginScreen";
import ChatScreen from "../components/ChatScreen/ChatScreen";
import AuthProvider from "../context/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../ErrorPage/ErrorPage";


const AuthLayout = () => {
    return <AuthProvider>
                <Outlet/>
            </AuthProvider>
}
export default createBrowserRouter([
    { 
        element: <AuthLayout/> ,
        errorElement: <ErrorPage />,
        children: [
            {
                element: <LoginScreen/>,
                path: '/login',
            },
            {
                element: <ProtectedRoute/>,
                children: [{
                    element: <ChatScreen/>,
                    path: '/',
                } 
                ]
            }
        ]
    }
])