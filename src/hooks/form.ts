import { createFormHookContexts, createFormHook } from '@tanstack/react-form';
import { TextField } from '../components/fields/TextField';
import { SelectField } from '../components/fields/SelectField';
import { MDXField } from '../components/fields/MDXField';
import { SubscribeButton } from '../components/fields/SubscribeButton';

export const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    SelectField,
    MDXField,
  },
  formComponents: {
    SubscribeButton,
  },
});
