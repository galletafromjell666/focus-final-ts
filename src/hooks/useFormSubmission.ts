import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { useAddApplication } from './useAddApplication';
import { Application, Employee, FormApp, User } from '../interfaces';
import toastStyles from '../util/toastifyStyles';

interface UseHandleModalSubmitParams {
    formData: FormApp;
    isHrEspecialist: boolean;
    employeeData: Employee[] | undefined;
    user: User | null;
}

function useHandleModalSubmit() {
    const { mutate: addApplication } = useAddApplication();
    const handleModalSubmit = async ({ formData, isHrEspecialist, employeeData, user }: UseHandleModalSubmitParams) => {
        const currentDate = format(new Date(), 'yyyy-MM-dd');
        const employeeObj = employeeData?.find((u) => u.id === (isHrEspecialist ? formData.employeeId : user?.employeeId));
        const newAppToSubmit: Application = {
            ...formData,
            employeeId: employeeObj?.id ?? '',
            employee: employeeObj,
            applicationDate: currentDate
        };
        try {
            await addApplication(newAppToSubmit);
            toast.success('Application sent successfully', toastStyles.success);
        } catch (error) {
            throw new Error('Unable to sent Application to firebase');
        }
    };

    return { handleModalSubmit };
}

export default useHandleModalSubmit;
