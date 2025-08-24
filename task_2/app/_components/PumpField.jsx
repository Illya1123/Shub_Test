import { useEffect, useState } from 'react'
import { Field } from 'formik'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

export default function PumpField() {
    const [options, setOptions] = useState([])

    useEffect(() => {
        fetch('/pumpData.json')
            .then((res) => res.json())
            .then((data) => setOptions(data))
            .catch((err) => console.error('Error loading options:', err))
    }, [])

    return (
        <Field name="pump">
            {({ field, meta, form }) => (
                <TextField
                    {...field}
                    select
                    label="Trụ"
                    fullWidth
                    size="small"
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error ? meta.error : ''}
                    onChange={(e) => form.setFieldValue('pump', e.target.value)}
                >
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            )}
        </Field>
    )
}
