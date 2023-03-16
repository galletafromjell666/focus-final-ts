import { FieldValues } from "react-hook-form";

const startDateLessThanEndDate = (startDate: Date, endDate: Date) => {
  return startDate < endDate || "Start date must be before end date";
};

const endDateGreaterThanStartDate = (endDate: Date, startDate: Date) => {
  return endDate > startDate || "End Date must be after than Start Date";
};

const newApplicationValidations = {
  sickLeaveStartDate: {
    required: "Sick Leave Start Date is required",
    validate: {
      startDateLessThanEndDate: (
        startDate: Date | string,
        values: FieldValues
      ) => {
        const endDate = values["sickLeaveEndDate"];
        return startDateLessThanEndDate(new Date(startDate), new Date(endDate));
      },
    },
  },
  sickLeaveEndDate: {
    required: "Sick Leave End Date is required",
    validate: {
      endDateGreaterThanStartDate: (
        endDate: Date | string,
        values: FieldValues
      ) => {
        const startDate = values["sickLeaveStartDate"];
        return endDateGreaterThanStartDate(
          new Date(endDate),
          new Date(startDate)
        );
      },
    },
  },
};

export { newApplicationValidations };
