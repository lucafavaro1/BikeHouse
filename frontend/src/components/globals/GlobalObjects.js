//constants for insurance providers and amounts

export const insProviders = {
  1: 40,
  2: 30,
  3: 25,
  0: 0,
};

export const insuranceOptions = [
  {
    label: "No Insurance",
    value: 0,
  },
  {
    label: "GetSafe - €40/year ",
    value: 1,
  },
  {
    label: "Feather - €30/year",
    value: 2,
  },
  {
    label: "Qover - €25/year",
    value: 3,
  },
];

export const getInsuranceNameFromValue = (value) => {
  switch (value) {
    case 0:
      return "No Insurance";
    case 1:
      return "GetSafe - €40/year";
    case 2:
      return "Feather - €30/year";
    case 3:
      return "Qover - €25/year";
    default:
      return "No Insurance";
  }
};
