import { styled } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  tableCellClasses,
  Paper,
} from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  paddingTop: 8,
  paddingBottom: 8,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

type Kv = {
  key: string;
  value: string;
};

export default function KvList({ kvs }: { kvs: Kv[] }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {kvs.map((kv) => (
            <StyledTableRow key={kv.key}>
              <StyledTableCell component="th" scope="row">
                <strong>{kv.key}</strong>
              </StyledTableCell>
              <StyledTableCell align="right">{kv.value}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
