import { Controller, useForm } from 'react-hook-form';
import { filterFormValidations } from '../../../../util/rhfValidations';
import { MDBBtn, MDBRow, MDBCol, MDBContainer, MDBInput } from 'mdb-react-ui-kit';
import './FilterForm.css';
import useFiltersStore, { FilterDate } from '../../../../hooks/useFiltersStore';

const FilterForm: React.FC = () => {
    const { setGlobalFilter, setLocalDateFilter, removeLocalDateFilter } = useFiltersStore();

    const { control, handleSubmit } = useForm<FilterDate>();

    const onSubmit = (formData: FilterDate) => {
        console.log('submit');
        setLocalDateFilter(formData);
    };

    const handleFilterRemoval = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        removeLocalDateFilter();
    };

    return (
        <MDBContainer fluid>
            <MDBRow center className="my-4 mx-2">
                <MDBCol lg="6" md="8" sm="10" xs="12" className="py-2">
                    <div className="input-container">
                        <MDBInput
                            size="lg"
                            onChange={(e) => {
                                setGlobalFilter(String(e.target.value));
                            }}
                            type="text"
                            wrapperClass="form-outline"
                            label="Search"
                        />
                    </div>
                </MDBCol>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <MDBCol lg="2" md="4" sm="5" xs="12" className="py-2">
                        <label className="label-date" htmlFor="date-from">
                            From
                        </label>
                        <Controller
                            name="startInterval"
                            control={control}
                            rules={filterFormValidations.startInterval}
                            render={({ field }) => (
                                <input
                                    id="startInterval"
                                    type="date"
                                    {...field}
                                    value={field.value ?? ''}
                                    onChange={(e) => {
                                        field.onChange(e);
                                    }}
                                />
                            )}
                        />
                    </MDBCol>
                    <MDBCol lg="2" md="4" sm="5" xs="12" className="py-2">
                        <label className="label-date" htmlFor="date-to">
                            To
                        </label>
                        <Controller
                            name="endInterval"
                            control={control}
                            rules={filterFormValidations.endInterval}
                            render={({ field }) => (
                                <input
                                    id="endInterval"
                                    type="date"
                                    {...field}
                                    value={field.value ?? ''}
                                    onChange={(e) => {
                                        field.onChange(e);
                                    }}
                                />
                            )}
                        />
                    </MDBCol>
                    <MDBCol lg="2" md="4" sm="2" xs="12" className="py-2">
                        <div className="input-container">
                            <MDBBtn className="button-filter" type="submit" color="secondary">
                                Filter
                            </MDBBtn>
                            <MDBBtn onClick={handleFilterRemoval} className="button-filter" color="secondary">
                                Remove filter
                            </MDBBtn>
                        </div>
                    </MDBCol>
                </form>
            </MDBRow>
        </MDBContainer>
    );
};

export default FilterForm;
