import { useState } from "react";
import AmortizationTable from "./AmortizationTable";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { round, handleChange } from "./utils";

function PersonalLoan() {
  const [loanAmt, setLoanAmt] = useState({ value: 0, isTouched: false });
  const [interestRate, setinterestRate] = useState({
    value: 10.5,
    isTouched: false,
  });
  const [term, setTerm] = useState({ value: 0, isTouched: false });
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPrincipal, setTotalPrincipal] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  let a = loanAmt.value;
  let r = interestRate.value / 1200;
  let n = term.value;
  let totalPrincipalPaid = Number(totalPrincipal);

  function submitFormHandler(e) {
    interestCalulator();
    e.preventDefault();
  }

  function interestCalulator() {
    let c = Math.pow(1 + r, n);
    let x = c - 1;
    let d = Math.pow(1 + r, n);
    let y = d * r;
    let z = x / y;
    let p = a / z;
    let roundedOffMonthlyPayment = round(p, 2);
    let totalInterestPaid = round(roundedOffMonthlyPayment * n - a, 2);

    setMonthlyPayment(roundedOffMonthlyPayment);
    setTotalPrincipal(a);
    setTotalInterest(totalInterestPaid);
  }

  let i = 1;

  let tableItems = [];

  let p = round(monthlyPayment, 2);

  while (i > 0 && i <= n) {
    if (i == 1) {
      let tableItem = {
        month: i,
        paymentAmount: p,
        interestpaid: round(a * r, 2),
        principal: round(p - a * r, 2),
        loanbalance: round(a - (p - a * r), 2),
      };
      i++;
      tableItems.push(tableItem);
    } else {
      let j = i - 1;
      let currentInterestPaid = round(tableItems[j - 1].loanbalance * r, 2);
      let currentPrincipal = round(p - currentInterestPaid, 2);

      let tableItem2 = {
        month: i,
        paymentAmount: p,
        interestpaid: currentInterestPaid,
        principal: currentPrincipal,
        loanbalance: round(tableItems[j - 1].loanbalance - currentPrincipal, 2),
      };
      tableItems.push(tableItem2);
      i++;
    }
  }

  function resetFormHandler(e) {
    e.preventDefault();
    setLoanAmt({ value: 0, isTouched: false });
    setinterestRate({ value: 10.5, isTouched: false });
    setTerm({ value: 0, isTouched: false });
    setMonthlyPayment(0);
    setTotalPrincipal(0);
    setTotalInterest(0);
  }

  const PrimaryColorButton = styled(Button)(({ theme }) => ({
    width: "28ch",
    color: "#fff",
    backgroundColor: "#18A999",
    borderRadius: "1.5ch",
    borderColor: "#18A999",
    margin: "2ch",
    "&:hover": {
      backgroundColor: "#2B2D42",
    },
  }));
  const SecondaryColorButton = styled(Button)(({ theme }) => ({
    width: "28ch",
    color: "#18A999",
    backgroundColor: "#fff",
    borderColor: "#18A999",
    borderRadius: "1.5ch",
    margin: "2ch",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#18A999",
    },
  }));
  const handleClick = (anchor) => () => {
    const id = `${anchor}`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={6} sx={{ marginTop: 0 }}>
            <Container maxWidth="90%">
              <Typography
                variant="h4"
                gutterBottom
                align="left"
                sx={{ marginBottom: "1ch" }}
              >
                Personal Loan Calculator
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                align="left"
                sx={{ marginBottom: "1ch" }}
              >
                This calculator is meant for educational purposes only. It
                calculates estimated monthly payments solely based on the
                information you provide.{" "}
              </Typography>

              <FormControl
                fullWidth
                sx={{
                  marginTop: "2ch",
                  marginBottom: "2ch",
                  marginLeft: "0",
                  marginRight: "2ch",
                }}
              >
                <InputLabel htmlFor="loanAmt">Loan Amount*</InputLabel>
                <OutlinedInput
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]" }}
                  id="loanAmt"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Loan Amount*"
                  value={loanAmt.value}
                  onFocus={() => {
                    setLoanAmt({
                      ...loanAmt,
                      isTouched: true,
                    });
                  }}
                  onChange={(e) => handleChange(e, loanAmt, setLoanAmt)}
                  error={loanAmt.value == 0 && loanAmt.isTouched == true}
                />
                <FormHelperText id="loanAmt">
                  *Please Enter the Desired Loan Amount
                </FormHelperText>
              </FormControl>

              <FormControl
                fullWidth
                sx={{
                  marginTop: "2ch",
                  marginBottom: "2ch",
                  marginLeft: "0",
                  marginRight: "2ch",
                }}
              >
                <InputLabel htmlFor="interestRate">Interest Rate*</InputLabel>
                <OutlinedInput
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  id="interestRate"
                  endAdornment={
                    <InputAdornment position="end">%</InputAdornment>
                  }
                  label="Interest Rate*"
                  value={interestRate.value}
                  onFocus={() => {
                    setinterestRate({
                      ...interestRate,
                      isTouched: true,
                    });
                  }}
                  onChange={(e) =>
                    handleChange(e, interestRate, setinterestRate)
                  }
                  error={
                    interestRate.value == 0 && interestRate.isTouched == true
                  }
                />
                <FormHelperText id="interestRate">
                  *Please Enter the Estimated Rate of Interest
                </FormHelperText>
              </FormControl>

              <FormControl
                fullWidth
                sx={{
                  marginTop: "2ch",
                  marginBottom: "2ch",
                  marginLeft: "0",
                  marginRight: "2ch",
                }}
              >
                <InputLabel htmlFor="term">Loan Term*</InputLabel>
                <OutlinedInput
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  id="term"
                  endAdornment={
                    <InputAdornment position="end">months</InputAdornment>
                  }
                  label="Loan Term*"
                  value={term.value}
                  onFocus={() => {
                    setTerm({
                      ...term,
                      isTouched: true,
                    });
                  }}
                  onChange={(e) => handleChange(e, term, setTerm)}
                  error={term.value == 0 && term.isTouched == true}
                />
                <FormHelperText id="term">
                  *Please Enter the Desired loan term
                </FormHelperText>
              </FormControl>
            </Container>
            <Grid>
              <PrimaryColorButton
                onClick={submitFormHandler}
                size="large"
                disabled={
                  loanAmt.value == 0 ||
                  term.value == 0 ||
                  interestRate.value == 0
                }
                data-testid="submit"
              >
                Calculate
              </PrimaryColorButton>

              <SecondaryColorButton
                onClick={resetFormHandler}
                variant={"outlined"}
                size="large"
              >
                Reset
              </SecondaryColorButton>
            </Grid>
          </Grid>
          <Grid
            item
            xs={5}
            sx={{
              backgroundColor: "#dafaf6",
              borderWidth: "1ch",
              textAlign: "center",
              borderRadius: "2ch",
              boxShadow: 3,
              my: "auto",
              mx: "1ch",
            }}
          >
            <Grid item sx={{ m: "5ch" }}>
              <Typography variant="h5" sx={{ m: "2ch" }}>
                Monthy Payment
              </Typography>
              <Typography variant="h4" sx={{ m: "2ch" }}>
                ${monthlyPayment.toLocaleString("en-US")}
              </Typography>
            </Grid>
            <Grid item sx={{ m: "3ch" }}>
              <Typography variant="h5" sx={{ m: "2ch" }}>
                Total principal paid
              </Typography>
              <Typography variant="h4" sx={{ m: "1ch" }}>
                ${totalPrincipalPaid.toLocaleString("en-US")}
              </Typography>
            </Grid>
            <Grid item sx={{ m: "3ch" }}>
              <Typography variant="h5" sx={{ m: "2ch" }}>
                Total interest paid
              </Typography>
              <Typography variant="h4" sx={{ m: "1ch" }}>
                ${totalInterest.toLocaleString("en-US")}
              </Typography>
            </Grid>
            <Typography
              variant="h4"
              sx={{
                color: "#18A999",
                marginTop: 0,
                padding: "2ch",
                "&:hover": {
                  color: "#000",
                  textDecoration: "underline",
                  cursor: "pointer",
                },
              }}
              onClick={handleClick("table")}
            >
              View Amortization schedule
            </Typography>
          </Grid>
          <AmortizationTable tableItems={tableItems} />
        </Grid>
      </Container>
    </>
  );
}

export default PersonalLoan;
