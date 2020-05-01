import React from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,

    },

});

function createData(num, value, type, row, ) {
    return { num, value, type, row, };
}



export default function SimpleTable({ data }) {
    const classes = useStyles();
    const rows = data.map((v, i) => createData(`#${i + 1}`, v.value, getType[v.group], v.row));
    //   const rows = [
    //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //     createData('Eclair', 262, 16.0, 24, 6.0),
    //     createData('Cupcake', 305, 3.7, 67, 4.3),
    //     createData('Gingerbread', 356, 16.0, 49, 3.9),
    //   ];
    return (
        <TableContainer component={Paper} style={{ maxHeight: '400px' }} >
            <Table className={classes.table} size="small" stickyHeader>
                <TableHead >
                    <TableRow >
                        <StyledTableCell align="center" >Num</StyledTableCell>
                        <StyledTableCell align="center" >Value</StyledTableCell>
                        <StyledTableCell align="center">Type</StyledTableCell>
                        <StyledTableCell align="center">Pos</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.num}>
                            <TableCell align="center">
                                {row.num}
                            </TableCell>

                            <TableCell align="center">{row.value}</TableCell>
                            <TableCell align="center">{row.type}</TableCell>
                            <TableCell align="center">{row.row}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}



let getType = ['', '', 'Variable', 'String', 'Number', 'Operator', 'Statement_Separator', 'Lparen', 'Rparen', 'Start_Statement', 'Close_Statement', 'Keyword', 'Keyword', 'Keyword', 'Keyword', 'Keyword', 'Keyword', 'Keyword'];











const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);
  