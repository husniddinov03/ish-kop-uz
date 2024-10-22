import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { Button } from '@mui/material';
import ModalComponent from '../Modal/ModalComponent';  // Import the Edit modal

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));




export default function TableComponent({ data, titleTable, modalData }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [modalData, setModalData] = React.useState(null);  // Data for editing
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);  // Control modal visibility
// const {handleSave}=useInfoContext()


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const currentRows = data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) || [];

    const handleEdit = (id) => {
        const selectedData = currentRows.find(row => row.id === id);
        setModalData(selectedData);  // Set the selected row data
        setIsEditModalOpen(true);  // Open the edit modal
    };

    const handleDelete = (id) => {
        // Implement delete functionality here
        console.log(`Delete row with id: ${id}`);
    };

    const handleSave = (updatedData) => {
        console.log('Updated Data:', updatedData);
        setIsEditModalOpen(false);  // Close modal after saving
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {titleTable.map((title, index) => (
                            <StyledTableCell key={index}>{title}</StyledTableCell>
                        ))}
                        <StyledTableCell align="center">Actions</StyledTableCell> {/* Actions column header */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentRows.map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell align="left">{row.name}</StyledTableCell>
                            <StyledTableCell align="left">{row.pricePerDay === undefined ? null : row.pricePerDay}</StyledTableCell>
                            <StyledTableCell align="left">{row.createdDate}</StyledTableCell>
                            <StyledTableCell align="left">{row.id}</StyledTableCell>

                            {/* Action Buttons Column */}
                            <StyledTableCell style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleEdit(row.id)}  // Open modal on edit click
                                    style={{ marginRight: '8px' }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDelete(row.id)}  // Delete handler
                                >
                                    Delete
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data?.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            {/* Edit Modal */}
            <ModalComponent
                isOpen={isEditModalOpen}
                toggle={() => setIsEditModalOpen(!isEditModalOpen)}  // Toggle modal
                data={modalData}  // Pass the selected data
                handleSave={handleSave}  // Pass save handler
                modalData={modalData}
            />
        </TableContainer>
    );
}
