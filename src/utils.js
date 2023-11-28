function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

export { round };

function handleChange(e, inputValue, inputState) {
  const re = /^[0-9\b]+$/;
  if (e.target.value === "" || re.test(e.target.value)) {
    inputState({
      ...inputValue,
      value: e.target.value,
      isTouched: true,
    });
  } else {
    alert("Please input only numeric value");
  }
}

export { handleChange };
