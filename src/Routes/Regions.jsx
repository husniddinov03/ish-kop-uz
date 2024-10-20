import React, { useEffect, useState } from 'react';
import { useInfoContext } from '../Context/UseInfoContext';
import { Form, Input, Button } from 'reactstrap';
import { TableComponent } from '../Components';

const Regions = () => {
    const [regionsPagination, setRegionsPagination] = useState(1);
    const { createData, fetchData } = useInfoContext();
    const [regions, setRegions] = useState([]);
    const [formData, setFormData] = useState({
        nameUz: '',
        nameEn: '',
        nameRu: '',
        areasId: ''
    });

    const regionsTitleTable = [
        'Name Uz',
        'Name Eng',
        'Name Ru',
        'Areas ID',
        'ID',
    ];

    const getAllRegions = async () => {
        const fetchedRegions = await fetchData(`region/read?10=10&page=${regionsPagination}`);
        setRegions(fetchedRegions?.data?.data?.content || []);
    };

    useEffect(() => {
        getAllRegions();
    }, [regionsPagination]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createData(formData, 'region/create');
        getAllRegions(); // Refresh data
        setFormData({ nameUz: '', nameEn: '', nameRu: '', areasId: '' }); // Reset form fields
    };

    const handleNextPage = () => {
        setRegionsPagination((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        setRegionsPagination((prev) => (prev > 1 ? prev - 1 : 1));
    };

    return (
        <div>
            <h1 className='text-center default-title-text'>Create Regions</h1>
            <br /><br />

            <Form onSubmit={handleSubmit}>
                <label className='default-desc-text'>Name Uz</label>
                <Input name="nameUz" value={formData.nameUz} onChange={handleChange} required />
                <br />

                <label className='default-desc-text'>Name Eng</label>
                <Input name="nameEn" value={formData.nameEn} onChange={handleChange} required />
                <br />

                <label className='default-desc-text'>Name Ru</label>
                <Input name="nameRu" value={formData.nameRu} onChange={handleChange} required />
                <br />

                <label className='default-desc-text'>Areas ID</label>
                <Input name="areasId" type="number" value={formData.areasId} onChange={handleChange} required />
                <br />

                <Button type="submit" color="primary">Submit</Button>
            </Form>
            <br /><br />

            <TableComponent data={regions} titleTable={regionsTitleTable} />
            <div className="pagination-controls d-flex gap-3 align-items-center mt-3">
                <Button onClick={handlePrevPage} disabled={regionsPagination <= 1}>Previous</Button>
                <span>Page {regionsPagination}</span>
                <Button onClick={handleNextPage}>Next</Button>
            </div>
        </div>
    );
};

export default Regions;
