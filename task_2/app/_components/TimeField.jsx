'use client'

import * as React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { Label } from '@/components/ui/label'
import { ErrorMessage, useField } from 'formik'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'

dayjs.locale('vi')

export default function DateTimePickerViews({ name }) {
    const [field, meta, helpers] = useField(name)

    return (
        <div className="space-y-2">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
                <DateTimePicker
                    views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                    format="DD/MM/YYYY HH:mm:ss"
                    label="Thời gian"
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(newValue) => {
                        if (newValue) {
                            helpers.setValue(newValue.toDate())
                        } else {
                            helpers.setValue(null)
                        }
                    }}
                    slotProps={{
                        textField: {
                            fullWidth: true,
                            size: 'small',
                            error: meta.touched && Boolean(meta.error),
                            className: 'rounded-md border border-input px-3 py-2 text-sm shadow-sm',
                        },
                    }}
                />
            </LocalizationProvider>
            <ErrorMessage name={name} component="p" className="text-red-500 text-sm" />
        </div>
    )
}
