import axios from "axios";
import { useState, createContext, useContext } from "react";
import { toast } from 'react-toastify';

const baseUrl = "http://api.osonishtop.uz/api/v1/";

export const InfoContext = createContext();
export const useInfoContext = () => useContext(InfoContext);

export const InfoProvider = ({ children }) => {
    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [thId, setThId] = useState(null);
    const [open, setOpen] = useState(false);

    // Updated createData function to accept dynamic endpoints
    const createData = async (newData, endpoint) => {
        setLoading(true);
        try {
            const response = await axios.post(`${baseUrl}${endpoint}`, newData, {
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*',
                },
            });
            setData((prevData) => [...prevData, response.data]);  // Update local state with new data
            toast.success("Data created successfully!");  // Show success toast
        } catch (err) {
            setError(err);
            console.error("Error:", err);  // Log the error for debugging
            toast.error("Error creating data!");  // Show error toast
        } finally {
            setLoading(false);
        }
    };

    const fetchData = async (endpoint) => {
        try {
            const response = await axios.get(`${baseUrl}${endpoint}`);
            console.log(response);

            if (response) {
                return response // Return the fetched data
            } else {
                toast.error("Failed to fetch data!");  // Handle failure case
                return null;
            }
        } catch (err) {
            setError(err);
            toast.error("Error fetching data!");  // Show error toast
            return null;  // Return null if there's an error
        }
    };

    const value = {
        createData,
        fetchData,
        data,
        loading,
        error,
        thId,
        setThId,
        open, 
        setOpen
    };

    return (
        <InfoContext.Provider value={value}>
            {children}
        </InfoContext.Provider>
    );
};
