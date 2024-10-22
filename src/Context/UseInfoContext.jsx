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
    const [open, setOpen]=useState(false)

    // Function for creating data via POST request
    const createData = async (newData, endpoint) => {
        setLoading(true);
        try {
            const response = await axios.post(`${baseUrl}${endpoint}`, newData, {
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*',
                },
            });
            
            setData((prevData) => [...prevData, response.data]);  // Update state with new data
            toast.success("Data created successfully!");  // Show success toast
        } catch (err) {
            setError(err);
            console.error("Error:", err);  // Log error for debugging
            toast.error("Error creating data!");  // Show error toast
        } finally {
            setLoading(false);
        }
    };

    // Function for fetching data via GET request

    const handleSave = async (updatedData) => {
        try {
            const response = await axios.put(`${baseUrl}/your-endpoint/${updatedData.id}`, updatedData);
            console.log('Updated Data:', response.data);
            // Update local state to reflect changes in the table
            setData((prevData) =>
                prevData.map((item) => (item.id === updatedData.id ? response.data : item))
            );
            setIsEditModalOpen(false);  // Close modal after saving
            toast.success("Data updated successfully!");  // Show success message
        } catch (error) {
            console.error("Error updating data:", error);
            toast.error("Error updating data!");  // Show error message
        }
    };


    const fetchData = async (endpoint) => {
        try {
            const response = await axios.get(`${baseUrl}${endpoint}`);
            console.log('API response:', response); // Log API response for debugging
            return response; // Return fetched data
        } catch (err) {
            setError(err);
            toast.error("Error fetching data!");  // Show error toast
            return null;  // Return null in case of error
        }
    };

    return (
        <InfoContext.Provider value={{ createData, fetchData, data, loading, error, setOpen, open, handleSave }}>
            {children}
        </InfoContext.Provider>
    );
};
