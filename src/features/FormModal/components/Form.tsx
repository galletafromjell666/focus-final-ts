import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { MDBBtn, MDBContainer, MDBTypography } from 'mdb-react-ui-kit';
import ErrorMessage from './ErrorMessage';
import { useFetchEmployees } from '../../../hooks/useFetchCollection';
import useUserStore from '../../../hooks/useUserStore';
import { newApplicationValidations, defaultValues } from '../../../util/rhfValidations';
import { getDeltaFromDates } from '../../../util/dateUtilities';
import { FormApp } from '../../../interfaces';
import useFormSubmit from '../../../hooks/useFormSubmit';
import './Form.css';
interface AppFormProps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppForm: React.FC<AppFormProps> = ({ setShow }) => {
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
    const { handleAppFormSubmit } = useFormSubmit();

    const onSubmit = (formData: FormApp) => {
        handleAppFormSubmit({ formData, isHrEspecialist, employeeData, user });
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
                <div className={`form-class-container ${isHrEspecialist ? 'especialist' : 'employee'}`}>
                    {isHrEspecialist ? (
                        <div id="employee">
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
                        </div>
                    ) : null}
                    <div id="start-date">
                        <MDBTypography variant="h5">Sick leave Start date:</MDBTypography>
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
                    </div>
                    <div id="medical-unit">
                        <MDBTypography htmlFor="medicalUnit" variant="h5">
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
                    </div>
                    <div id="end-date">
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
                    </div>
                    <div id="doctor">
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
                    </div>

                    <div id="coverage-days">
                        <MDBTypography variant="h5">Coverage Days:</MDBTypography>
                        <Controller
                            name="daysOfCoverage"
                            control={control}
                            rules={newApplicationValidations.daysOfCoverage}
                            render={({ field }) => <input className="w-75 p-2" disabled {...field} type="number" />}
                        />
                        <ErrorMessage error={errors.daysOfCoverage} />
                    </div>
                </div>
                <div>
                    <div className="end-container w-75 mx-auto">
                        <MDBTypography variant="h5">Medical Diagnostic:</MDBTypography>
                        <Controller
                            name="medicalDiagnostic"
                            control={control}
                            rules={newApplicationValidations.medicalDiagnostic}
                            render={({ field }) => <input className="w-100 p-2 my-" {...field} type="text" />}
                        />
                        <ErrorMessage error={errors.medicalDiagnostic} />
                    </div>
                    <div className="d-grid mx-auto w-25 mt-4">
                        <MDBBtn type="submit">Submit</MDBBtn>
                    </div>
                </div>
            </form>
        </MDBContainer>
    );
};

export default AppForm;
