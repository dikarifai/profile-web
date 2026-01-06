"use client"

import Image from "next/image";
import React, { useRef, useState, useCallback } from "react";

type PreviewFile = {
    id: string;
    file: File;
    preview?: string;
};

type Props = {
    accept?: string;
    maxSizeMB?: number;
    onFileChange?: (file: File | null) => void;
    className?: string;
    imageUrl?: string
};

export default function DragDropFileInput({
    accept = "image/*",
    maxSizeMB = 10,
    onFileChange,
    className = "",
    imageUrl
}: Props) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<PreviewFile | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    const isShowImage = !imageUrl || !file

    const emitChange = (f: PreviewFile | null) => {
        setFile(f);
        onFileChange?.(f?.file || null);
    };

    const handleFiles = (incoming: FileList | null) => {
        if (!incoming || incoming.length === 0) return;
        const f = incoming[0];
        if (f.size > maxSizeBytes) return;

        const pf: PreviewFile = { id: `${Date.now()}-${f.name}`, file: f };

        if (f.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = () => {
                pf.preview = String(reader.result || "");
                emitChange(pf);
            };
            reader.readAsDataURL(f);
        } else {
            emitChange(pf);
        }
    };

    const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        handleFiles(e.target.files);
        if (inputRef.current) inputRef.current.value = "";
    };

    const removeFile = () => {
        emitChange(null);
    };

    const openFilePicker = () => inputRef.current?.click();

    const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    };

    const onDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave: React.DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    return (
        <div className={`w-full ${className}`}>
            {(!file && !imageUrl) ? (
                <div
                    role="button"
                    tabIndex={0}
                    onClick={openFilePicker}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openFilePicker()}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onDragEnter={onDragOver}
                    onDragLeave={onDragLeave}
                    className={`w-full rounded-lg border-2 p-6 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer text-center
            ${isDragging ? 'border-dashed border-emerald-500 bg-emerald-50' : 'border-gray-200 bg-white'}`}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept={accept}
                        onChange={onInputChange}
                        className="hidden"
                    />

                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16v4h10v-4M7 8l5-5 5 5M12 3v13" />
                    </svg>

                    <div className="text-sm text-gray-700">
                        <strong>Tarik & lepas file di sini</strong>
                        <div className="text-xs text-gray-500">atau klik untuk memilih. Maks {maxSizeMB} MB.</div>
                    </div>
                </div>
            ) : (
                <div className="relative w-full">
                    {file?.preview || imageUrl ? (
                        <div className="w-full h-64 relative rounded-xl overflow-hidden mb-8">
                            <Image fill src={imageUrl || file?.preview || ""} alt={imageUrl || file?.file.name || ""} className="w-full rounded-lg object-cover" />
                        </div>
                    ) : (
                        <div className="w-full h-40 flex items-center justify-center bg-gray-100 rounded-lg text-gray-600">
                            {file?.file.name}
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={removeFile}
                        className="absolute top-3 right-3 px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700"
                    >
                        Hapus
                    </button>
                </div>
            )}
        </div>
    );
}