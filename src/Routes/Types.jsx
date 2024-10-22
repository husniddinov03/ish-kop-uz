import React, { useEffect, useState } from 'react';
import { useInfoContext } from '../Context/UseInfoContext';
import { Form, Input, Button } from 'reactstrap';
import { TableComponent } from '../Components';

const Types = () => {
    const [typesPagination, setTypesPagination] = useState(1);
    const { createData, fetchData } = useInfoContext();
    const [anyTypes, setAnyTypes] = useState([]);
    const [formData, setFormData] = useState({
        nameUz: '',
        nameEn: '',
        nameRu: '',
        areasId: ''
    });

    const typesTitleTable = [
        'Name Uz',
        'Price Per Day',
        'Areas ID',
        'Created Date',
        'ID',
    ];

    const modalOjects = [
        {
            id: 1,
            name: "NameUz",
            inputType: "string"
        },
        {
            id: 2,
            name: "NameEn",
            inputType: "string"
        },
        {
            id: 3,
            name: "NameRu",
            inputType: "string"
        },
        {
            id: 4,
            name: "pricePerDay",
            inputType: "number"
        },

    ]


    const getAllTypes = async () => {
        const anyType = await fetchData(`ann-types/read?10=10&page=${typesPagination < 1 ? 1 : typesPagination}`);
        setAnyTypes(anyType?.data?.data?.content || []);
    };

    useEffect(() => {
        getAllTypes();
    }, [typesPagination]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createData(formData, 'ann-types/create');
        getAllTypes(); // Refresh data
        setFormData({ nameUz: '', nameEn: '', nameRu: '', areasId: '' }); // Reset form fields
    };

    const handleNextPage = () => {
        setTypesPagination((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        setTypesPagination((prev) => (prev > 1 ? prev - 1 : 1));
    };

    return (
        <div>
            <h1 className='text-center default-title-text'>Create Types</h1>
            <br /><br />

            <Form onSubmit={handleSubmit}>
                <label className='default-desc-text'>Name Uz</label>
                <Input name="nameUz" value={formData.nameUz} onChange={handleChange} required />
                <br />

                <label className='default-desc-text'>Name En</label>
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

            <TableComponent data={anyTypes} titleTable={typesTitleTable} />
            <div className="pagination-controls d-flex gap-3 align-items-center mt-3">
                <Button onClick={handlePrevPage} disabled={typesPagination <= 1}>Previous</Button>
                <span>Page {typesPagination}</span>
                <Button onClick={handleNextPage}>Next</Button>
            </div>
        </div>
    );
};

export default Types;
