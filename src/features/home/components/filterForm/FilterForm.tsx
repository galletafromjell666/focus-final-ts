import { Controller, useForm } from 'react-hook-form';
import { filterFormValidations } from '../../../../util/rhfValidations';
import { MDBBtn, MDBContainer, MDBInput } from 'mdb-react-ui-kit';
import './FilterForm.css';
import useFiltersStore, { RangeFilter } from '../../../../hooks/useFilterStore';

const FilterForm: React.FC = () => {
    const { setGlobalFilter, setRangeFilter, removeLocalDateFilter, globalFilter, rangeFilter } = useFiltersStore();
    const { control, handleSubmit, setValue } = useForm<RangeFilter>();
    const onSubmit = (formData: RangeFilter) => {
        setRangeFilter(formData);
    };
    const handleFilterRemoval = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        removeLocalDateFilter();
        setGlobalFilter('');
        setValue('startInterval', '');
        setValue('endInterval', '');
    };
    return (
        <MDBContainer fluid className="filter-container">
            <div className="w-100 d-flex align-items-end">
                <MDBInput
                    value={globalFilter}
                    size="lg"
                    onChange={(e) => {
                        setGlobalFilter(String(e.target.value));
                    }}
                    type="text"
                    wrapperClass="w-100"
                    label="Search"
                />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="date-filter">
                    <div className="date-input-container">
                        <label htmlFor="date-from">From</label>
                        <Controller
                            name="startInterval"
                            control={control}
                            rules={filterFormValidations.startInterval}
                            render={({ field }) => (
                                <MDBInput
                                    id="startInterval"
                                    type="date"
                                    size="lg"
                                    {...field}
                                    value={field.value ?? ''}
                                    onChange={(e) => {
                                        field.onChange(e);
                                    }}
                                />
                            )}
                        />
                    </div>
                    <div className="date-input-container">
                        <label htmlFor="date-to">To</label>
                        <Controller
                            name="endInterval"
                            control={control}
                            rules={filterFormValidations.endInterval}
                            render={({ field }) => (
                                <MDBInput
                                    id="endInterval"
                                    type="date"
                                    size="lg"
                                    {...field}
                                    value={field.value ?? ''}
                                    onChange={(e) => {
                                        field.onChange(e);
                                    }}
                                />
                            )}
                        />
                    </div>
                    <div>
                        <div className="filter-button-container">
                            {rangeFilter && (
                                <MDBBtn onClick={handleFilterRemoval} color="warning">
                                    Remove filter
                                </MDBBtn>
                            )}
                            <MDBBtn size="lg" type="submit" color="secondary">
                                Filter
                            </MDBBtn>
                        </div>
                    </div>
                </div>
            </form>
        </MDBContainer>
    );
};

export default FilterForm;
