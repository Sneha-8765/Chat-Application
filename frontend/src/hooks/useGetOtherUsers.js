import { React,useEffect } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setOtherUsers } from '../redux/userSlice';

const useGetOtherUsers = () => {
     const dispatch = useDispatch();

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try { 
                axios.defaults.withCredentials=true;
                const res = await axios.get(
                    "https://chat-application-1n71.onrender.com/api/v1/user/"
                    
                );
                console.log(res);
                //store
                dispatch(setOtherUsers(res.data));
                
            } catch (error) {
                console.log(error.response?.data || error.message);
            }
        }

        fetchOtherUsers();
    }, [dispatch]);

    
} ;

export default useGetOtherUsers;
