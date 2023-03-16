
// import { useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { differenceInDays, addDays, format } from "date-fns";

// function App() {
//   const [daysOfCoverage, setDaysOfCoverage] = useState(0);

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },setValue
//   } = useForm();

//   const onSubmit = (data) => {
//     console.log(data);
//   };

//   const handleStartDateChange = (startDate, endDate) => {
//     const days = differenceInDays(new Date(endDate), new Date(startDate));
//     setDaysOfCoverage(days);
//   };

//   const handleEndDateChange = (startDate, endDate) => {
//     const days = differenceInDays(new Date(endDate), new Date(startDate));
//     setDaysOfCoverage(days);
//   };

//   const handleDaysOfCoverageChange = (days) => {
//     const endDate = format(addDays(new Date(data.startDate), days), "yyyy-MM-dd");
//     setValue("endDate", endDate);
//     setDaysOfCoverage(days);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div>
//         <label htmlFor="startDate">Start Date:</label>
//         <Controller
//           name="startDate"
//           control={control}
//           rules={{ required: "Start Date is required" }}
//           render={({ field }) => (
//             <input
//               type="date"
//               {...field}
//               onChange={(e) => handleStartDateChange(e.target.value, data.endDate)}
//             />
//           )}
//         />
//         {errors.startDate && <span>{errors.startDate.message}</span>}
//       </div>
//       <div>
//         <label htmlFor="endDate">End Date:</label>
//         <Controller
//           name="endDate"
//           control={control}
//           rules={{ required: "End Date is required" }}
//           render={({ field }) => (
//             <input
//               type="date"
//               {...field}
//               onChange={(e) => handleEndDateChange(data.startDate, e.target.value)}
//             />
//           )}
//         />
//         {errors.endDate && <span>{errors.endDate.message}</span>}
//       </div>
//       <div>
//         <label htmlFor="daysOfCoverage">Days of Coverage:</label>
//         <input
//           type="number"
//           value={daysOfCoverage}
//           onChange={(e) => handleDaysOfCoverageChange(e.target.value)}
//         />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }


 export {}