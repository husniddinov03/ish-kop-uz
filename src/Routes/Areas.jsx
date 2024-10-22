import React, { useEffect, useState } from 'react';
import { useInfoContext } from '../Context/UseInfoContext'; // Assuming this provides your createData and fetchData functions
import { Form, Input, Button } from 'reactstrap';
import { TableComponent } from '../Components';

const Areas = () => {
    const [areas, setAreas] = useState([]);
    const [areasPagination, setAreasPagination] = useState(1);
    const { createData, fetchData } = useInfoContext();

    const areasTitleTable = ['Name Uz', 'Name Eng', 'Name Ru', 'Region ID', 'ID'];

    // Fetch all areas
    const getAllAreas = async () => {
        const fetchedAreas = await fetchData(`areas/read?10=10&page=${areasPagination}`);
        setAreas(fetchedAreas?.data?.data?.content || []);  // Handle null case
    };

 


    // Call fetch areas on component mount and when pagination changes
    useEffect(() => {
        getAllAreas();
    }, [areasPagination]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const dataObject = Object.fromEntries(formData.entries());
        console.log(formData);
        console.log(dataObject);
        
        

        // Call createData and then refresh the areas list
        await createData(dataObject, 'areas/create');
        getAllAreas();  // Fetch latest data immediately after creating a new area
    };

    const handleNextPage = () => {
        setAreasPagination((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        setAreasPagination((prev) => (prev > 1 ? prev - 1 : 1));
    };

    return (
        <div>
            <h1 className='text-center default-title-text'>Create Areas</h1>
            <br /><br />

            {/* Form to create new area */}
            <Form onSubmit={handleSubmit}>
                <label className='default-desc-text'>Name Uz</label>
                <Input name="nameUz" required />
                <br />

                <label className='default-desc-text'>Name Eng</label>
                <Input name="nameEn" required />
                <br />

                <label className='default-desc-text'>Name Ru</label>
                <Input name="nameRu" required />
                <br />

                <label className='default-desc-text'>Region ID</label>
                <Input name="regionsId" type="number" required />
                <br />

                {/* Submit button */}
                <Button type="submit" color="primary">
                    Submit
                </Button>
            </Form>
            <br /><br />

            {/* Render the table with fetched data */}
            <TableComponent data={areas} titleTable={areasTitleTable} />

            {/* Pagination Controls */}
            <div className="pagination-controls d-flex gap-3 alignt-items-center mt-3">
                <Button onClick={handlePrevPage} disabled={areasPagination <= 1}>Previous</Button>
                <span>Page {areasPagination}</span>
                <Button onClick={handleNextPage}>Next</Button>
            </div>
        </div>
    );
};

export default Areas;
