'use client'

import { useState } from 'react'
import * as XLSX from 'xlsx'
import { DataTable } from '@/app/_components/DataTable'
import { columns } from './columns'
import FormatCurrency from '@/app/_utils/FormatCurrency'
import FileDrop from './FileDrop'
import TimeFilter from './TimeFilter'

export default function UploadExcel() {
    const [fileName, setFileName] = useState(null)
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [totalMoney, setTotalMoney] = useState(0)
    const [minTime, setMinTime] = useState('')
    const [maxTime, setMaxTime] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')

    const handleFile = (file) => {
        setFileName(file.name)
        const reader = new FileReader()
        reader.onload = (e) => {
            const workbook = XLSX.read(e.target.result, { type: 'array' })
            const sheet = workbook.Sheets[workbook.SheetNames[0]]
            const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, range: 8 })

            const json = rows.map((row) => ({
                stt: row[0] ?? '',
                ngay: row[1] ?? '',
                gio: row[2] ?? '',
                tram: row[3] ?? '',
                truBom: row[4] ?? '',
                matHang: row[5] ?? '',
                soLuong: row[6] ?? '',
                donGia: row[7] ?? '',
                thanhTien: row[8] ?? '',
                thanhToan: row[9] ?? '',
                maKH: row[10] ?? '',
                tenKH: row[11] ?? '',
                loaiKH: row[12] ?? '',
                col13: row[13] ?? '',
                col14: row[14] ?? '',
                bienSoXe: row[15] ?? '',
                kySo: row[16] ?? '',
            }))

            setData(json)

            const times = json.map((row) => row.gio).filter(Boolean)
            if (times.length > 0) {
                const min = times.reduce((a, b) => (a < b ? a : b)).slice(0, 5)
                const max = times.reduce((a, b) => (a > b ? a : b)).slice(0, 5)

                setMinTime(min)
                setMaxTime(max)
                setStartTime(min)
                setEndTime(max)

                handleFilter(min, max, json)
            }
        }
        reader.readAsArrayBuffer(file)
    }

    const handleFilter = (start, end, dataSource = data) => {
        const result = dataSource.filter((row) => {
            const gio = row.gio?.slice(0, 5)
            return gio >= start && gio <= end
        })
        setFilteredData(result)

        const total = result.reduce((sum, row) => sum + (Number(row.thanhTien) || 0), 0)
        setTotalMoney(total)
    }

    const handleTimeChange = (newStart, newEnd) => {
        setStartTime(newStart)
        setEndTime(newEnd)
        handleFilter(newStart, newEnd)
    }

    return (
        <div className="flex flex-col items-center gap-6 p-6 w-full">
            <div className="flex flex-wrap justify-center gap-6 w-full">
                <div className="flex-1 min-w-[300px] max-w-[480px] bg-white shadow-lg rounded-2xl p-6 border">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Tải lên file Excel</h2>

                    <FileDrop
                        fileName={fileName}
                        onFileChange={(e) => {
                            const file = e.target.files[0]
                            if (file) handleFile(file)
                        }}
                        onFileDrop={(e) => {
                            e.preventDefault()
                            const file = e.dataTransfer.files[0]
                            if (file) handleFile(file)
                        }}
                    />
                </div>

                <div className="flex-1 min-w-[300px] max-w-[480px] flex flex-col justify-between bg-white shadow-lg rounded-2xl p-6 border">
                    {minTime && maxTime && (
                        <div className="mb-6">
                            <TimeFilter
                                startTime={startTime}
                                endTime={endTime}
                                minTime={minTime}
                                maxTime={maxTime}
                                onChange={handleTimeChange}
                            />
                        </div>
                    )}

                    <p className="text-lg">
                        Tổng tiền:{' '}
                        <strong className="text-green-600 text-xl">
                            {FormatCurrency(totalMoney)}
                        </strong>
                    </p>
                </div>
            </div>

            {data.length > 0 && (
                <div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl p-6 border">
                    <h3 className="font-bold text-lg mb-4 text-gray-700">Dữ liệu trong Excel</h3>
                    <DataTable columns={columns} data={filteredData.length ? filteredData : data} />
                </div>
            )}
        </div>
    )
}
