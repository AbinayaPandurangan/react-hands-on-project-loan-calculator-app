import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("renders static element", () => {
  render(<App />);
  const h4Element = screen.getByText("Personal Loan Calculator");
  expect(h4Element).toBeInTheDocument();
});

describe("Loan Calculator", () => {
  test("should be able to submit form with all details", async () => {
    const loanAmt = "30000";
    const interestRate = "5";
    const term = "60";
    render(<App />);

    const loanInput = screen.getByLabelText(/Loan Amount*/);
    const interestRateInput = screen.getByLabelText(/Interest Rate*/);
    const termInput = screen.getByLabelText(/Loan Term*/);

    fireEvent.change(loanInput, { target: { value: loanAmt } });
    fireEvent.blur(loanInput);

    fireEvent.change(interestRateInput, { target: { value: interestRate } });
    fireEvent.blur(interestRateInput);

    fireEvent.change(termInput, { target: { value: term } });
    fireEvent.blur(termInput);

    const submitButton = await screen.findByRole("button", {
      name: "Calculate",
    });

    expect(submitButton).not.toBeDisabled();
  });
  test("submit button to be disabled without all required details", async () => {
    const loanAmt = "30000";
    render(<App />);

    const loanInput = screen.getByLabelText(/Loan Amount*/);

    fireEvent.change(loanInput, { target: { value: loanAmt } });
    fireEvent.blur(loanInput);

    const submitButton = await screen.findByRole("button", {
      name: "Calculate",
    });

    expect(submitButton).toBeDisabled();
  });
});
