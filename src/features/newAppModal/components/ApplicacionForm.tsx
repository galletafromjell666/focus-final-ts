import { useForm, Controller } from 'react-hook-form';
import { newApplicationValidations } from '../../../util/rhfValidations';
import { MDBRow, MDBCol, MDBInput, MDBContainer, MDBTypography } from 'mdb-react-ui-kit';
import { FormValues } from '../../../interfaces/newApplicationFormInterfaces';
import { addDaysToDate, getDeltaFromDates } from '../../../util/handleDateChange';
import ErrorMessage from './components/ErrorMessage';

const ApplicationForm: React.FC = () => {
    const {
        control,
        handleSubmit,
        trigger,
        formState: { errors },
        setValue,
        watch,
        getValues
    } = useForm<FormValues>({
        mode: 'onBlur',
        defaultValues: {
            employee: '',
            medicalUnit: '',
            doctor: '',
            sickLeaveStartDate: '',
            sickLeaveEndDate: '',
            medicalDiagnostic: '',
            daysOfCoverage: 0
        }
    });

    const handleValidInputChange = async () => {
        //validates if both date fields triggering their validations
        const areDatesValid = await trigger(['sickLeaveEndDate', 'sickLeaveStartDate']);
        if (areDatesValid) {
            const endDateWatch = watch('sickLeaveEndDate');
            const startDateWatch = watch('sickLeaveStartDate');

            setValue('daysOfCoverage', getDeltaFromDates(endDateWatch, startDateWatch));
        } else {
            setValue('daysOfCoverage', 0);
        }
    };

    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    return (
        <MDBContainer fluid>
            <form onSubmit={handleSubmit(onSubmit)}>
                <MDBRow className="mb-4">
                    <MDBCol>
                        <MDBTypography htmlFor="doctor" variant="h5">
                            Employee
                        </MDBTypography>
                        <Controller name="employee" control={control} rules={newApplicationValidations.employee} render={({ field }) => <input className=" w-75 p-2" {...field} type="text" />} />
                        <ErrorMessage error={errors.employee} />
                    </MDBCol>
                    <MDBCol>
                        <MDBTypography htmlFor="doctor" variant="h5">
                            Medical Unit
                        </MDBTypography>
                        <Controller
                            name="medicalUnit"
                            control={control}
                            rules={newApplicationValidations.medicalUnit}
                            render={({ field }) => (
                                <select className="w-75 p-2" {...field}>
                                    <option value="">-- Select Medical Unit --</option>
                                    <option value="ISSS">ISSS</option>
                                    <option value="MINSAL">MINSAL</option>
                                </select>
                            )}
                        />
                        <ErrorMessage error={errors.medicalUnit} />
                    </MDBCol>
                </MDBRow>
                <MDBRow className="mb-4">
                    <MDBCol>
                        <MDBTypography htmlFor="doctor" variant="h5">
                            Doctor
                        </MDBTypography>
                        <Controller
                            name="doctor"
                            control={control}
                            rules={newApplicationValidations.doctor}
                            render={({ field }) => <input className="w-75 p-2" placeholder="Doctor's Name" {...field} type="text" />}
                        />
                        <ErrorMessage error={errors.doctor} />
                    </MDBCol>
                    <MDBCol>
                        <MDBTypography variant="h5">Sick leave start date:</MDBTypography>
                        <Controller
                            name="sickLeaveStartDate"
                            control={control}
                            rules={newApplicationValidations.sickLeaveStartDate}
                            render={({ field }) => (
                                <input
                                    className="w-75 p-2"
                                    id="sickLeaveStartDate"
                                    type="date"
                                    {...field}
                                    value={field.value ?? ''}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleValidInputChange();
                                    }}
                                />
                            )}
                        />
                        <ErrorMessage error={errors.sickLeaveStartDate} />
                    </MDBCol>
                </MDBRow>
                <MDBRow className="mb-4">
                    <MDBCol>
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
                                    value={field.value ?? ''}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleValidInputChange();
                                        addDaysToDate;
                                    }}
                                />
                            )}
                        />
                        <ErrorMessage error={errors.sickLeaveEndDate} />
                    </MDBCol>
                    <MDBCol>
                        <label htmlFor="daysOfCoverage">Days of Coverage:</label>
                        <Controller
                            name="daysOfCoverage"
                            control={control}
                            rules={newApplicationValidations.daysOfCoverage}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="number"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        const otherInputValue = getValues('sickLeaveStartDate');
                                        if (otherInputValue) {
                                            const newEndDate = addDaysToDate(otherInputValue, Number(e.target.value) || 0);
                                            setValue('sickLeaveEndDate', newEndDate);
                                            trigger(['sickLeaveEndDate', 'sickLeaveStartDate']);
                                        }
                                    }}
                                />
                            )}
                        />
                        <ErrorMessage error={errors.daysOfCoverage} />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <label htmlFor="medicalDiagnostic">Medical Diagnostic:</label>
                        <Controller name="medicalDiagnostic" control={control} rules={newApplicationValidations.medicalDiagnostic} render={({ field }) => <input {...field} type="text" />} />
                        <ErrorMessage error={errors.medicalDiagnostic} />
                        <button type="submit">Submit</button>
                    </MDBCol>
                </MDBRow>
            </form>
        </MDBContainer>
    );
};

export default ApplicationForm;
