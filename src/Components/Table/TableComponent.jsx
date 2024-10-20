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
import { useInfoContext } from '../../Context/UseInfoContext';
import ModalComponent from '../Modal/ModalComponent';

// Styled components
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

export default function TableComponent({ data, titleTable }) {
    // const [thId, setThId] = React.useState(null)
    const { setThId } = useInfoContext()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle rows per page change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Handle row click to log the ID
    const handleRowClick = (id) => {
        setOpen(!open)
        setThId(id)
    };

    // Calculate the current rows to display based on the API data structure
    const currentRows = data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) || [];

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {titleTable.map((title, index) => (
                            <StyledTableCell key={index}>{title}</StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentRows.map((row) => (
                        <StyledTableRow
                            key={row.id}
                            onClick={() => handleRowClick(row.id)} // Capture the row ID on click
                            style={{ cursor: 'pointer' }} // Add pointer cursor for clickable rows
                        >
                            <StyledTableCell align="left">{row.name}</StyledTableCell>
                            <StyledTableCell align="left">{row.pricePerDay === undefined ? null : row.pricePerDay}</StyledTableCell>
                            <StyledTableCell align="left">{row.createdDate}</StyledTableCell>
                            <StyledTableCell align="left">{row.id}</StyledTableCell>
                        </StyledTableRow>
                    ))

                    }
                </TableBody>
            </Table>

            {/* Pagination component */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data?.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <ModalComponent />

        </TableContainer>
    );
}
