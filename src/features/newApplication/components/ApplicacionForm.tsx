import React from "react";
import { useForm, Controller } from "react-hook-form";
import { newApplicationValidations } from "../../../util/newApplicationValidations";
interface FormValues {
  employee: string;
  medicalUnit: string;
  doctor: string;
  sickLeaveStartDate: string;
  sickLeaveEndDate: string;
  daysOfCoverage: number;
  medicalDiagnostic: string;
}

const ApplicationForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      employee: "",
      medicalUnit: "",
      doctor: "",
      sickLeaveStartDate: "",
      sickLeaveEndDate: "",
      medicalDiagnostic: "",
      daysOfCoverage: 0,
    },
  });

  const handleValidInputChange = () => {
    trigger(["sickLeaveEndDate", "sickLeaveStartDate"]);
    console.log(errors);
    if (
      Object.keys(errors).length !== 0 &&
      Object.keys(errors.sickLeaveEndDate as object).length !== 0 &&
      Object.keys(errors.sickLeaveStartDate as object).length !== 0
    ) {
      console.log("todo bn");
    }
  };

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="employee">Employee:</label>
        <Controller
          name="employee"
          control={control}
          rules={{ required: "Employee is required" }}
          render={({ field }) => <input {...field} type="text" />}
        />
        {errors.employee && <span>{errors.employee.message}</span>}
      </div>

      <div>
        <label htmlFor="medicalUnit">Medical Unit:</label>
        <Controller
          name="medicalUnit"
          control={control}
          rules={{ required: "Medical Unit is required" }}
          render={({ field }) => (
            <select {...field}>
              <option value="">-- Select Medical Unit --</option>
              <option value="ISSS">ISSS</option>
              <option value="MINSAL">MINSAL</option>
            </select>
          )}
        />
        {errors.medicalUnit && <span>{errors.medicalUnit.message}</span>}
      </div>

      <div>
        <label htmlFor="doctor">Doctor:</label>
        <Controller
          name="doctor"
          control={control}
          rules={{
            required: "Doctor is required",
            maxLength: {
              value: 50,
              message: "Doctor must be less than 50 characters",
            },
          }}
          render={({ field }) => <input {...field} type="text" />}
        />
        {errors.doctor && <span>{errors.doctor.message}</span>}
      </div>
      <div>
        <label htmlFor="sickLeaveStartDate">Sick Leave Start Date:</label>
        <Controller
          name="sickLeaveStartDate"
          control={control}
          rules={newApplicationValidations.sickLeaveStartDate}
          render={({ field }) => (
            <input
              id="sickLeaveStartDate"
              type="date"
              {...field}
              value={field.value ?? ""}
              onChange={(e) => {
                field.onChange(e);
                handleValidInputChange();
              }}
            />
          )}
        />
        {errors.sickLeaveStartDate && (
          <span>{errors.sickLeaveStartDate.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="sickLeaveEndDate">Sick Leave End Date:</label>
        <Controller
          name="sickLeaveEndDate"
          control={control}
          rules={newApplicationValidations.sickLeaveEndDate}
          render={({ field }) => (
            <input
              id="sickLeaveEndDate"
              type="date"
              {...field}
              value={field.value ?? ""}
              onChange={(e) => {
                field.onChange(e);
                handleValidInputChange();
              }}
            />
          )}
        />
        {errors.sickLeaveEndDate && (
          <span>{errors.sickLeaveEndDate.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="medicalDiagnostic">Medical Diagnostic:</label>
        <Controller
          name="medicalDiagnostic"
          control={control}
          rules={{
            required: "Medical Diagnostic is required",
            maxLength: {
              value: 300,
              message: "Medical Diagnostic must be less than 300 characters",
            },
          }}
          render={({ field }) => <input {...field} type="text" />}
        />
        {errors.medicalDiagnostic && (
          <span>{errors.medicalDiagnostic.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="daysOfCoverage">Days of Coverage:</label>
        <Controller
          name="daysOfCoverage"
          control={control}
          rules={{
            required: "Days of Coverage is required",
            min: { value: 1, message: "Days of Coverage must be at least 1" },
          }}
          render={({ field }) => <input {...field} type="number" />}
        />
        {errors.daysOfCoverage && <span>{errors.daysOfCoverage.message}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ApplicationForm;

/**
 *
 *
 */
