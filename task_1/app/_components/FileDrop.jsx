'use client'

export default function FileDrop({ fileName, onFileChange, onFileDrop }) {
    return (
        <div
            onDrop={onFileDrop}
            onDragOver={(e) => e.preventDefault()}
            className="w-96 h-40 border-2 border-dashed border-gray-400 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-50"
            onClick={() => document.getElementById('fileInput').click()}
        >
            {fileName ? (
                <p className="text-green-600 font-medium">{fileName}</p>
            ) : (
                <p className="text-gray-600">Kéo & thả file Excel vào đây hoặc nhấn để chọn</p>
            )}

            <input
                id="fileInput"
                type="file"
                accept=".xlsx,.xls"
                className="hidden"
                onChange={onFileChange}
            />
        </div>
    )
}
