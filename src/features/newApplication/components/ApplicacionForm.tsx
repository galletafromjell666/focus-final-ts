import React from "react";
import { useForm, Controller } from "react-hook-form";
import { newApplicationValidations } from "../../../util/newApplicationValidations";
import { FormValues } from "../../../interfaces/newApplicationFormInterfaces";
//
import { differenceInDays, addDays, format } from "date-fns";
const ApplicationForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
    setValue,
    watch,
    getValues,
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

  const setDaysOfCoverage = (startDate: string, endDate: string) => {
    return differenceInDays(new Date(startDate), new Date(endDate));
  };
  const handleChangeDaysOfCoverage = (startDate: string, days: number) => {
    return format(addDays(new Date(startDate), days), "yyyy-MM-dd");
    //setValue("sickLeaveEndDate", endDate);
  };

  const handleValidInputChange = async () => {

    const result = await trigger(["sickLeaveEndDate", "sickLeaveStartDate"]);

    if (result) {
      const endDateWatch = watch("sickLeaveEndDate");
      const startDateWatch = watch("sickLeaveStartDate");
      
      setValue(
        "daysOfCoverage",
        setDaysOfCoverage(endDateWatch, startDateWatch)
      );
   
    } else {
      setValue("daysOfCoverage", 0);
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
                handleChangeDaysOfCoverage;
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
          render={({ field }) => (
            <input
              {...field}
              type="number"
              onChange={(e) => {
              
                field.onChange(e);

                const otherInputValue = getValues("sickLeaveStartDate");
               
                if (otherInputValue) {
                  const newEndDate = handleChangeDaysOfCoverage(
                    otherInputValue,
                    Number(e.target.value) || 0
                  );
                  setValue("sickLeaveEndDate", newEndDate);
                  trigger(["sickLeaveEndDate", "sickLeaveStartDate"]);
                }
              }}
            />
          )}
        />
        {errors.daysOfCoverage && <span>{errors.daysOfCoverage.message}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ApplicationForm;
