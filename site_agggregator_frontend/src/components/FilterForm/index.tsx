"use client";

import { useArticles } from "@/context/ArticlesContext";
import { useModal } from "@/hooks/useModal";
import { FaFilter } from 'react-icons/fa';
import UserFilterForm from "@/components/UserFilterForm";
import React, { useCallback, useState } from "react";
import { debounce } from 'lodash';
import Modal from "@/components/Modal";

const debouncedSetKeyword = debounce((setKeyword: (value: string) => void, value: string) => {
    setKeyword(value);
}, 300);

export default function FilterForm() {
    const { keyword, date, category, sources, source, author, authors, setAuthor, setKeyword, setDate, setCategory, setSource, categories, reloadData } = useArticles();
    const { isModalOpen, openModal, closeModal } = useModal();
    const [localKeyword, setLocalKeyword] = useState(keyword);

    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocalKeyword(value);
        debouncedSetKeyword(setKeyword, value);
    };

    const handleCloseModal = useCallback(() => {
        closeModal();
        reloadData();
    }, [closeModal, reloadData]);

    return (
        <div className="flex justify-center items-center">
            <form className="p-6 shadow-md rounded-lg w-full space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 text-center">Filter Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                        <label htmlFor="keyword" className="block text-sm font-medium text-gray-700">
                            Keyword
                        </label>
                        <input
                            type="text"
                            id="keyword"
                            value={localKeyword}
                            onChange={handleKeywordChange}
                            placeholder="Enter keyword"
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 h-[43px]"
                        >
                            <option value="">All</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="source" className="block text-sm font-medium text-gray-700">
                            Source
                        </label>
                        <select
                            id="source"
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 h-[43px]"
                        >
                            <option value="">All</option>
                            {sources.map((source) => (
                                <option key={source.id} value={source.id}>
                                    {source.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                            Author
                        </label>
                        <select
                            id="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 h-[43px]"
                        >
                            <option value="">All</option>
                            {authors.map((author) => (
                                <option key={author.id} value={author.id}>
                                    {author.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        type="button"
                        onClick={openModal}
                        className="flex items-center p-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
                    >
                        <FaFilter className="mr-2" />
                        Filter
                    </button>
                </div>
            </form>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2 className="text-xl font-semibold mb-4">Custom Filters</h2>
                <UserFilterForm onSubmit={handleCloseModal} />
            </Modal>
        </div>
    );
}
