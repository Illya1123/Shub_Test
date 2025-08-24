'use client'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import TimeField from '@/app/_components/TimeField.jsx'
import PumpField from '@/app/_components/PumpField'
import Swal from 'sweetalert2'
import CustomField from './CustomField'

const TransactionSchema = Yup.object().shape({
    time: Yup.date().required('Vui lòng chọn thời gian'),
    quantity: Yup.number().min(0.01, 'Số lượng phải > 0').required('Bắt buộc nhập'),
    pump: Yup.string().required('Vui lòng chọn trụ'),
    revenue: Yup.number().min(1, 'Doanh thu không hợp lệ').required('Bắt buộc nhập'),
    price: Yup.number().min(1, 'Đơn giá không hợp lệ').required('Bắt buộc nhập'),
})

export default function TransactionForm({ initialTime }) {
    return (
        <Formik
            initialValues={{
                time: initialTime,
                quantity: null,
                pump: '',
                revenue: null,
                price: null,
            }}
            validationSchema={TransactionSchema}
            onSubmit={(values, { setSubmitting }) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công!',
                    text: 'Giao dịch đã được lưu.',
                    timer: 2000,
                    showConfirmButton: false,
                })
                setSubmitting(false)
            }}
        >
            {({ setFieldValue, validateForm, handleSubmit, setTouched }) => (
                <Form
                    id="transactionForm"
                    className="space-y-4"
                    onSubmit={async (e) => {
                        e.preventDefault()
                        const errors = await validateForm()

                        if (Object.keys(errors).length > 0) {
                            setTouched({
                                time: true,
                                quantity: true,
                                pump: true,
                                revenue: true,
                                price: true,
                            })
                            Swal.fire({
                                icon: 'error',
                                title: 'Lỗi!',
                                text: 'Vui lòng kiểm tra lại các trường nhập.',
                            })
                        } else {
                            handleSubmit(e)
                        }
                    }}
                >
                    <TimeField name="time" />
                    <CustomField validate='quantity' label='Số lượng'/>
                    <PumpField setFieldValue={setFieldValue} />
                    <CustomField validate='revenue' label='Doanh thu'/>
                    <CustomField validate='price' label='Đơn giá'/>
                </Form>
            )}
        </Formik>
    )
}
