'use client'

import { Field, ErrorMessage } from 'formik'
import TextField from '@mui/material/TextField'

export default function CustomField({validate, label}) {
    return (
        <div className="space-y-2">
            <Field name={validate}>
                {({ field, meta }) => (
                    <TextField
                        {...field}
                        type="number"
                        label={label}
                        size="small"
                        fullWidth
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error ? meta.error : ''}
                    />
                )}
            </Field>
        </div>
    )
}
