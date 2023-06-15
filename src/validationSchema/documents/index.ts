import * as yup from 'yup';

export const documentValidationSchema = yup.object().shape({
  document_type: yup.string().required(),
  file_path: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
