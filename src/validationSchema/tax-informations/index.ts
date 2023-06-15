import * as yup from 'yup';

export const taxInformationValidationSchema = yup.object().shape({
  tax_due_date: yup.date().required(),
  tax_amount: yup.number().integer().required(),
  user_id: yup.string().nullable().required(),
});
