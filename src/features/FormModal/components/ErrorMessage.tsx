
import { MDBTypography } from 'mdb-react-ui-kit';
import { FieldError } from 'react-hook-form';

interface Props {
  error?: FieldError | undefined;
}

function ErrorMessage({ error }: Props): JSX.Element | null {
  return error ? (
    <MDBTypography variant="h6" className="form-text mt-2 text-danger">
      {error.message}
    </MDBTypography>
  ) : null;
}

export default ErrorMessage;
