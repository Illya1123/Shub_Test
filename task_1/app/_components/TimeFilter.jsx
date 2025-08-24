'use client'

export default function TimeFilter({ startTime, endTime, minTime, maxTime, onChange }) {
    const handleStartChange = (e) => {
        const newStart = e.target.value
        let newEnd = endTime

        // Nếu endTime < = startTime, nâng endTime lên startTime + 1 phút
        if (endTime <= newStart) {
            const [h, m] = newStart.split(':').map(Number)
            const date = new Date()
            date.setHours(h, m + 1)
            newEnd = date.toTimeString().slice(0, 5)
        }

        onChange(newStart, newEnd)
    }

    const handleEndChange = (e) => {
        let newEnd = e.target.value
        if (newEnd <= startTime) {
            const [h, m] = startTime.split(':').map(Number)
            const date = new Date()
            date.setHours(h, m + 1)
            newEnd = date.toTimeString().slice(0, 5)
        }
        onChange(startTime, newEnd)
    }

    return (
        <div className="flex items-center gap-4">
            <div className="flex flex-col">
                <label className="font-semibold">Bắt đầu:</label>
                <input
                    type="time"
                    value={startTime}
                    min={minTime}
                    max={maxTime}
                    onChange={handleStartChange}
                    className="border rounded p-2"
                />
            </div>
            <div className="flex flex-col">
                <label className="font-semibold">Kết thúc:</label>
                <input
                    type="time"
                    value={endTime}
                    min={startTime}
                    max={maxTime}
                    onChange={handleEndChange}
                    className="border rounded p-2"
                />
            </div>
        </div>
    )
}
