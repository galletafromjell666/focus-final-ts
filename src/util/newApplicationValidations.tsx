import { FieldValues } from "react-hook-form";

const startDateLessThanEndDate = (startDate: Date, endDate: Date) => {
  return startDate < endDate || "Start date must be before end date";
};

const endDateGreaterThanStartDate = (endDate: Date, startDate: Date) => {
  return endDate > startDate || "End Date must be after than Start Date";
};

const newApplicationValidations = {
  employee: {
    required: "Employee is required",
    maxLength: {
      value: 25,
      message: "Employee's Name must be less than 25 characters",
    },
  },
  medicalUnit: { required: "Medical Unit is required" },
  doctor: {
    required: "Doctor is required",
    maxLength: {
      value: 50,
      message: "Doctor must be less than 50 characters",
    },
  },
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
  daysOfCoverage: {
    required: "Days of Coverage is required",
    min: {
      value: 1,
      message: "Days of Coverage must be at least 1",
    },
  },
  medicalDiagnostic: {
    required: "Medical Diagnostic is required",
    maxLength: {
      value: 300,
      message: "Medical Diagnostic must be less than 300 characters",
    },
  },
};

export { newApplicationValidations };
