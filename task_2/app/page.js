'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { IoMdArrowBack } from 'react-icons/io'
import TransactionForm from '@/app/_components/TransactionForm'

export default function Home() {
    const [mounted, setMounted] = useState(false)
    const [initialTime, setInitialTime] = useState(null)

    useEffect(() => {
        setMounted(true)
        setInitialTime(new Date())
    }, [])

    if (!mounted) return null

    return (
        <div className="max-w-xl mx-auto bg-white shadow rounded-2xl p-2 space-y-6">
            <div className="flex items-center justify-between pb-4">
                <div>
                    <button
                        type="button"
                        className="flex items-center gap-2 text-gray-500 hover:underline"
                    >
                        {<IoMdArrowBack />} Đóng
                    </button>
                    <h2 className="text-2xl font-bold">Nhập giao dịch</h2>
                </div>
                <Button
                    className="bg-blue-500 hover:bg-blue-500/80"
                    type="submit"
                    form="transactionForm"
                >
                    Cập nhật
                </Button>
            </div>

            <div className="bg-gray-50 p-2 rounded-sm">
                <TransactionForm initialTime={initialTime} />
            </div>
        </div>
    )
}
