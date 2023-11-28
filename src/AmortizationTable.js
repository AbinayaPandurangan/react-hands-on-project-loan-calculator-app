import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function AmortizationTable(props) {
  return (
    <TableContainer
      component={Paper}
      sx={{ marginTop: 5, marginBottom: 5 }}
      id="table"
    >
      <Table sx={{ width: "auto" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Month No.</TableCell>
            <TableCell sx={{ paddingLeft: "20ch" }} align="right">
              Monthly Payment
            </TableCell>
            <TableCell sx={{ paddingLeft: "20ch" }} align="right">
              Interest Paid
            </TableCell>
            <TableCell sx={{ paddingLeft: "20ch" }} align="right">
              Principal Paid
            </TableCell>
            <TableCell sx={{ paddingLeft: "20ch" }} align="right">
              Loan Balance
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tableItems.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.month}
              </TableCell>
              <TableCell align="right">{row.paymentAmount}</TableCell>
              <TableCell align="right">{row.interestpaid}</TableCell>
              <TableCell align="right">{row.principal}</TableCell>
              <TableCell align="right">{row.loanbalance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AmortizationTable;
