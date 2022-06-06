import format from "date-fns/format"
import parseISO from "date-fns/parseISO";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles, Typography } from '@material-ui/core';
import { Avatar } from '@mui/material';
import { CopyToClipBoardText } from "../../../components/CopyToClipBoardText";
import { NATIONALITIES_HUMAN_NAME } from "../../../constants/nationality";


const useStyles = makeStyles({
    table: {},
});


export const ContactsTable = ({ data }) => {
    const classes = useStyles();
    return (
        <TableContainer component={Paper} data-testid="contacts-table-container">
            <Table className={classes.table} aria-label="contacts table">
                <TableHead>
                    <TableRow>
                        <TableCell>Avatar</TableCell>
                        <TableCell>Full name</TableCell>
                        <TableCell>Birthday</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Nationality</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((contact) => (
                        <TableRow key={contact.login.uuid} data-testid="contacts-table-row">
                            <TableCell>
                                <Avatar src={contact.picture.thumbnail} alt="" />
                            </TableCell>
                            <TableCell data-testid="contacts-table-cell-fullname">{contact.name.title} {contact.name.first} {contact.name.last}</TableCell>
                            <TableCell>
                                <Typography>{format(parseISO(contact.dob.date), 'MM/dd/yyyy')}</Typography>
                                <Typography>{contact.dob.age} years</Typography>
                            </TableCell>
                            <TableCell>
                                <CopyToClipBoardText text={contact.email} />
                            </TableCell>
                            <TableCell>
                                <CopyToClipBoardText text={contact.phone} />
                            </TableCell>
                            <TableCell>
                                <Typography>{contact.location.country}</Typography>
                                <Typography>{contact.location.city}, {contact.location.street.name} {contact.location.street.number}</Typography>
                            </TableCell>
                            <TableCell>{NATIONALITIES_HUMAN_NAME[contact.nat]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};