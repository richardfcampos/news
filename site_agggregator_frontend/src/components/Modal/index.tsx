"use client";

import React, { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-4 sm:w-1/2 md:w-3/4 z-60">
                {children}
                <button
                    onClick={onClose}
                    className="mt-4 p-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
