import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createTaxInformation } from 'apiSdk/tax-informations';
import { Error } from 'components/error';
import { taxInformationValidationSchema } from 'validationSchema/tax-informations';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { TaxInformationInterface } from 'interfaces/tax-information';

function TaxInformationCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TaxInformationInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTaxInformation(values);
      resetForm();
      router.push('/tax-informations');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TaxInformationInterface>({
    initialValues: {
      tax_due_date: new Date(new Date().toDateString()),
      tax_amount: 0,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: taxInformationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Tax Information
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="tax_due_date" mb="4">
            <FormLabel>Tax Due Date</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.tax_due_date ? new Date(formik.values?.tax_due_date) : null}
                onChange={(value: Date) => formik.setFieldValue('tax_due_date', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
          </FormControl>
          <FormControl id="tax_amount" mb="4" isInvalid={!!formik.errors?.tax_amount}>
            <FormLabel>Tax Amount</FormLabel>
            <NumberInput
              name="tax_amount"
              value={formik.values?.tax_amount}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('tax_amount', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.tax_amount && <FormErrorMessage>{formik.errors?.tax_amount}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'tax_information',
  operation: AccessOperationEnum.CREATE,
})(TaxInformationCreatePage);
