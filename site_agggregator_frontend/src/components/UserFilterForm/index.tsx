"use client";

import React from 'react';
import MessageComponent from '@/components/MessageComponent';
import { useUserFilter } from '@/hooks/useUserFilter';

export default function UserFilterForm() {
    const {
        categories,
        authors,
        sources,
        selectedCategories,
        setSelectedCategories,
        selectedAuthors,
        setSelectedAuthors,
        selectedSources,
        setSelectedSources,
        handleSave,
    } = useUserFilter();

    return (
        <div className="p-6 shadow-md rounded-lg w-full space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 text-center">User Filters</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label htmlFor="categories" className="block text-sm font-medium text-gray-700">
                        Categories
                    </label>
                    <select
                        id="categories"
                        multiple
                        value={selectedCategories}
                        onChange={(e) => setSelectedCategories(Array.from(e.target.selectedOptions, option => option.value))}
                        className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 h-[100px]"
                    >
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="authors" className="block text-sm font-medium text-gray-700">
                        Authors
                    </label>
                    <select
                        id="authors"
                        multiple
                        value={selectedAuthors}
                        onChange={(e) => setSelectedAuthors(Array.from(e.target.selectedOptions, option => option.value))}
                        className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 h-[100px]"
                    >
                        {authors.map((author) => (
                            <option key={author.id} value={author.id}>
                                {author.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="sources" className="block text-sm font-medium text-gray-700">
                        Sources
                    </label>
                    <select
                        id="sources"
                        multiple
                        value={selectedSources}
                        onChange={(e) => setSelectedSources(Array.from(e.target.selectedOptions, option => option.value))}
                        className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 h-[100px]"
                    >
                        {sources.map((source) => (
                            <option key={source.id} value={source.id}>
                                {source.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <button
                    type="button"
                    onClick={handleSave}
                    className="p-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
                >
                    Save
                </button>
            </div>
            <MessageComponent />
        </div>
    );
}
