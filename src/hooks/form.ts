import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { CheckboxField } from '../components/fields/CheckboxField';
import { ColormapField } from '../components/fields/ColormapField';
import { ColorPickerField } from '../components/fields/ColorPickerField';
import { MDXField } from '../components/fields/MDXField';
import { SelectField } from '../components/fields/SelectField';
import { SubscribeButton } from '../components/fields/SubscribeButton';
import { TextField } from '../components/fields/TextField';

export const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    SelectField,
    MDXField,
    ColormapField,
    ColorPickerField,
    CheckboxField,
  },
  formComponents: {
    SubscribeButton,
  },
});
