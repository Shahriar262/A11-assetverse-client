// import { useEffect } from 'react'
// import { useNavigate } from 'react-router'
// import axios from 'axios'
// import useAuth from './useAuth'

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true,
// })

// const useAxiosSecure = () => {
//   const { user, logOut, loading } = useAuth()
//   const navigate = useNavigate()

//   useEffect(() => {
//     if (!loading && user?.accessToken) {
//       // Add request interceptor
//       const requestInterceptor = axiosInstance.interceptors.request.use(
//         config => {
//           config.headers.Authorization = `Bearer ${user.accessToken}`
//           return config
//         }
//       )

//       // Add response interceptor
//       const responseInterceptor = axiosInstance.interceptors.response.use(
//         res => res,
//         err => {
//           if (err?.response?.status === 401 || err?.response?.status === 403) {
//             logOut()
//               .then(() => {
//                 console.log('Logged out successfully.')
//               })
//               .catch(console.error)
//             navigate('/login')
//           }
//           return Promise.reject(err)
//         }
//       )

//       // Cleanup to prevent multiple interceptors on re-renders
//       return () => {
//         axiosInstance.interceptors.request.eject(requestInterceptor)
//         axiosInstance.interceptors.response.eject(responseInterceptor)
//       }
//     }
//   }, [user, loading, logOut, navigate])

//   return axiosInstance
// }
// export default useAxiosSecure

import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    // REQUEST interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        const token = await user.getIdToken(true); // ✅ FORCE REFRESH
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    // RESPONSE interceptor
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (res) => res,
      async (error) => {
        const status = error?.response?.status;

        if (status === 401 || status === 403) {
          await logOut();
          navigate("/login", { replace: true });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosInstance;
};

export default useAxiosSecure;
