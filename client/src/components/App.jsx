import {QueryClient,QueryClientProvider} from "@tanstack/react-query";
import {createBrowserRouter,Navigate,RouterProvider} from "react-router-dom";
import BlogPage from '../pages/BlogPage.jsx';
import ErrorPage from '../pages/ErrorPage.jsx';
import LoginPage from "../pages/LoginPage.jsx";
import { useContext, useState } from 'react';
import TokenContext from '../user/TokenContext.js';

const queryClient = new QueryClient(
    {
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedBlog />,
        errorElement: <ErrorPage />
    },
    {
        path: "login",
        element: <ProtectedLogin />,
        errorElement: <ErrorPage />        
    }
]);

function ProtectedBlog(){
    const [token]=useContext(TokenContext);
    return (token)?<BlogPage />:<Navigate to="login" />
}

function ProtectedLogin(){
    const [token]=useContext(TokenContext);
    return (token)?<Navigate to="/" />:<LoginPage />
}


export default function App(){
    const [token, setToken]=useState(null);

    return(
        <>
            <TokenContext.Provider value={[token, setToken]}>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </TokenContext.Provider>
        </>
    )
}


//optimization techniques in react->
//optimistic updates=>render changes immediately and update db in background slowly.
//useDebounce() and lodash debounce difference. See bookmarks
//useCallback()
//useContext()
//useRef()
//lazy import
//lazy loading??


//use react router for querying instead of react-query?
//use react query in login page instead of raw axios request?