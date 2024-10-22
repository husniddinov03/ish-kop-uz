import React, { useEffect, useState } from 'react';
import { useInfoContext } from '../Context/UseInfoContext';
import { Form, Input, Button } from 'reactstrap';
import { TableComponent } from '../Components';

const JobCategory = () => {
  const [pagination, setPagination] = useState(1); // Pagination state
  const [jobCategories, setJobCategories] = useState([]); // Job categories data
  const [parentCategories, setParentCategories] = useState([]); // Parent categories data
  const { createData, fetchData } = useInfoContext(); // Context functions for API calls

  // State for form data
  const [formData, setFormData] = useState({
    nameUz: '',
    nameEn: '',
    nameRu: '',
    parentId: ''
  });

  // Table headers for job categories
  const jobCategoriesTableHeaders = ['Name Uz', 'Name En', 'Name Ru', 'Parent ID', 'ID'];

  // Table headers for parent categories
  const parentCategoriesTableHeaders = ['Name Uz', 'Name En', 'Name Ru', 'ID'];

  // Fetch job categories
  const getJobCategories = async () => {
    const response = await fetchData(`ann-job-categories/read?parentId=1&page=${pagination}&size=10`);
    setJobCategories(response?.data?.data?.content || []);
  };

  // Fetch parent job categories
  const getParentCategories = async () => {
    const response = await fetchData(`ann-job-categories/read-parents?page=${pagination}&size=10`);
    setParentCategories(response?.data?.data?.content || []);
  };

  // Run fetch on component load and when pagination changes
  useEffect(() => {
    getJobCategories();
    getParentCategories();
  }, [pagination]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission for job category
  const handleSubmitJobCategory = async (e) => {
    e.preventDefault();
    console.log("Submitting Job Category formData: ", formData); // Log form data for debugging
    await createData(formData, 'ann-job-categories/create');
    getJobCategories(); // Refresh job categories after submission
    setFormData({ nameUz: '', nameEn: '', nameRu: '', parentId: '' }); // Reset form
  };

  // Handle form submission for parent category
  const handleSubmitParentCategory = async (e) => {
    e.preventDefault();
    console.log("Submitting Parent Category formData: ", formData); // Log form data for debugging
    await createData(formData, 'ann-job-categories/create-parent');
    getParentCategories(); // Refresh parent categories after submission
    // setFormData({ nameUz: '', nameEn: '', nameRu: '' }); 
  };

  return (
    <div>
      <h1 className="text-center">Job Categories</h1>

      {/* Form for creating job categories */}
      <Form onSubmit={handleSubmitJobCategory}>
        <label>Name Uz</label>
        <Input name="nameUz" value={formData.nameUz} onChange={handleChange} required />
        <label>Name En</label>
        <Input name="nameEn" value={formData.nameEn} onChange={handleChange} required />
        <label>Name Ru</label>
        <Input name="nameRu" value={formData.nameRu} onChange={handleChange} required />
        <label>Parent ID</label>
        <Input name="parentId" type="number" value={formData.parentId} onChange={handleChange} required />
        <br />
        <Button type="submit" color="primary">Submit Job Category</Button>
      </Form>

      {/* Table for job categories */}
      <br /><br />
      <TableComponent data={jobCategories} titleTable={jobCategoriesTableHeaders} />

      <br /><br /><br />
      {/* Form for creating parent categories */}
      <h2>Create Parent Category</h2>
      <Form onSubmit={handleSubmitParentCategory}>
        <label>Name Uz</label>
        <Input name="nameUz" value={formData.nameUz} onChange={handleChange} required />
        <label>Name En</label>
        <Input name="nameEn" value={formData.nameEn} onChange={handleChange} required />
        <label>Name Ru</label>
        <Input name="nameRu" value={formData.nameRu} onChange={handleChange} required />
        <br />
        <Button type="submit" color="primary">Submit Parent Category</Button>
      </Form>

      {/* Table for parent categories */}
      <br /><br />
      <TableComponent data={parentCategories} titleTable={parentCategoriesTableHeaders} />

      {/* Pagination Controls */}
      <div className="pagination-controls d-flex gap-3 align-items-center mt-3">
        <Button onClick={() => setPagination((prev) => Math.max(prev - 1, 1))} disabled={pagination <= 1}>
          Previous
        </Button>
        <span>Page {pagination}</span>
        <Button onClick={() => setPagination((prev) => prev + 1)}>Next</Button>
      </div>
    </div>
  );
};

export default JobCategory;
