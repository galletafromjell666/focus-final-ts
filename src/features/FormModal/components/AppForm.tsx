import { useEffect } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import ErrorMessage from './ErrorMessage';
import { useFetchEmployees } from '../../../hooks/useFetchCollection';
import useUserStore from '../../../hooks/useUserStore';
import { newApplicationValidations } from '../../../util/rhfValidations';
import { getDeltaFromDates } from '../../../util/handleDateChange';
import { FormApp } from '../../../interfaces';
import 'react-toastify/dist/ReactToastify.min.css';
import useHandleModalSubmit from '../../../hooks/useModalSubmission';

interface AppForm {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultValues: FieldValues = {
    mode: 'onBlur',
    defaultValues: {
        employeeId: '',
        medicalUnit: '',
        doctor: '',
        medicalDiagnostic: '',
        sickLeaveEndDate: '',
        sickLeaveStartDate: '',
        daysOfCoverage: 0
    }
};

const ApplicationForm: React.FC<AppForm> = ({ setShow }) => {
    const {
        control,
        handleSubmit,
        trigger,
        formState: { errors },
        setValue,
        watch,
        reset,
        formState
    } = useForm<FormApp>(defaultValues);

    const { data: employeeData } = useFetchEmployees();
    const { user } = useUserStore();
    const isHrEspecialist = user?.role === 'hr_specialist';
    const { handleModalSubmit } = useHandleModalSubmit();

    const onSubmit = (formData: FormApp) => {
        console.log(formData);
        handleModalSubmit({ formData, isHrEspecialist, employeeData, user });
    };
    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            setShow(false);
            reset(defaultValues);
        }
    }, [formState, reset, setShow]);

    const handleDateChange = async () => {
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

    return (
        <MDBContainer fluid>
            <form onSubmit={handleSubmit(onSubmit)}>
                <MDBRow className="mb-4">
                    {isHrEspecialist ? (
                        <MDBCol>
                            <MDBTypography htmlFor="doctor" variant="h5">
                                Employee
                            </MDBTypography>
                            <Controller
                                name="employeeId"
                                control={control}
                                rules={isHrEspecialist ? { required: 'Employee is required' } : {}}
                                render={({ field }) => (
                                    <select className="w-75 p-2" {...field}>
                                        <option value="">Select an option</option>
                                        {employeeData?.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.fullName}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                            <ErrorMessage error={errors.employeeId} />
                        </MDBCol>
                    ) : null}
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
                                        handleDateChange();
                                    }}
                                />
                            )}
                        />
                        <ErrorMessage error={errors.sickLeaveStartDate} />
                    </MDBCol>
                </MDBRow>
                <MDBRow className="mb-4">
                    <MDBCol>
                        <MDBTypography variant="h5">Sick leave End date:</MDBTypography>
                        <Controller
                            name="sickLeaveEndDate"
                            control={control}
                            rules={newApplicationValidations.sickLeaveEndDate}
                            render={({ field }) => (
                                <input
                                    className="w-75 p-2"
                                    id="sickLeaveEndDate"
                                    type="date"
                                    {...field}
                                    value={field.value ?? ''}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleDateChange();
                                    }}
                                />
                            )}
                        />
                        <ErrorMessage error={errors.sickLeaveEndDate} />
                    </MDBCol>
                    <MDBCol>
                        <MDBTypography variant="h5">Sick leave End date:</MDBTypography>
                        <Controller
                            name="daysOfCoverage"
                            control={control}
                            rules={newApplicationValidations.daysOfCoverage}
                            render={({ field }) => <input className="w-75 p-2" disabled {...field} type="number" />}
                        />
                        <ErrorMessage error={errors.daysOfCoverage} />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <MDBTypography variant="h5">Medical Diagnostic:</MDBTypography>
                        <Controller
                            name="medicalDiagnostic"
                            control={control}
                            rules={newApplicationValidations.medicalDiagnostic}
                            render={({ field }) => <input className="w-100 p-2 my-" {...field} type="text" />}
                        />
                        <ErrorMessage error={errors.medicalDiagnostic} />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <button type="submit">Submit</button>
                </MDBRow>
            </form>
        </MDBContainer>
    );
};

export default ApplicationForm;
