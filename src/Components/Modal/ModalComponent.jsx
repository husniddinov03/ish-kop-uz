import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from 'reactstrap';

const ModalComponent = ({ isOpen, toggle, data, handleSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    pricePerDay: '',
    createdDate: ''
  });

  

  // Pre-fill the modal input fields when data changes
  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || '',
        pricePerDay: data.pricePerDay || '',
        createdDate: data.createdDate || ''
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveChanges = () => {
    handleSave(formData);  // Call the save function with the updated data
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Data</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="pricePerDay">Price Per Day</Label>
          <Input
            type="number"
            id="pricePerDay"
            name="pricePerDay"
            value={formData.pricePerDay}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="createdDate">Created Date</Label>
          <Input
            type="date"
            id="createdDate"
            name="createdDate"
            value={formData.createdDate}
            onChange={handleInputChange}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={saveChanges}>Save</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalComponent;
