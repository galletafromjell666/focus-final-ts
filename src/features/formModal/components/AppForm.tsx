import { useForm, Controller } from 'react-hook-form';
import { newApplicationValidations } from '../../../util/rhfValidations';
import { MDBRow, MDBCol, MDBContainer, MDBTypography } from 'mdb-react-ui-kit';
import { FormApp } from '../../../interfaces/FormApplication';
import { getDeltaFromDates } from '../../../util/handleDateChange';
import { submitAppToFirebase } from '../submitToFirebase';
import ErrorMessage from './ErrorMessage';
import { useFetchEmployees } from '../../../hooks/useFetchCollection';
import { Application } from '../../../interfaces/Application';
import { format } from 'date-fns';
import { useAddApplication } from '../../../hooks/useAddApplication';

const ApplicationForm: React.FC = () => {
    const {
        control,
        handleSubmit,
        trigger,
        formState: { errors },
        setValue,
        watch
    } = useForm<FormApp>({
        mode: 'onBlur',
        defaultValues: {
            medicalUnit: '',
            doctor: '',
            sickLeaveStartDate: '',
            sickLeaveEndDate: '',
            medicalDiagnostic: ''
        }
    });

    const { data: employeeData } = useFetchEmployees();
    const { mutate } = useAddApplication();
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

    const onSubmit = (data: FormApp) => {
        const currentDate = format(new Date(), 'yyyy-MM-dd');
        const application: Application = {
            ...data,
            employee: employeeData?.find((u) => u.id === data.employeeForm),
            applicationDate: currentDate
        };
        //submitAppToFirebase(application);
        mutate(application);
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
                        <Controller
                            name="employeeForm"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <select {...field}>
                                    <option value="">Select an option</option>
                                    {employeeData?.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.fullName}
                                        </option>
                                    ))}
                                </select>
                            )}
                        />
                        <ErrorMessage error={errors.employeeForm} />
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
                                    }}
                                />
                            )}
                        />
                        <ErrorMessage error={errors.sickLeaveEndDate} />
                    </MDBCol>
                    <MDBCol>
                        <label htmlFor="daysOfCoverage">Days of Coverage:</label>
                        <Controller name="daysOfCoverage" control={control} rules={newApplicationValidations.daysOfCoverage} render={({ field }) => <input disabled {...field} type="number" />} />
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
