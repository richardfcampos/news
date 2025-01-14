"use client";

import React from 'react';
import MessageComponent from '@/components/MessageComponent';
import { useUserFilter } from '@/hooks/useUserFilter';
import CustomSelect from '@/components/CustomSelect';

interface UserFilterFormProps {
    onSubmit: () => void;
}

const UserFilterForm = ({ onSubmit }: UserFilterFormProps) => {
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

    const categoryOptions = categories.map(cat => ({ value: cat.id.toString(), label: cat.name }));
    const authorOptions = authors.map(author => ({ value: author.id.toString(), label: author.name }));
    const sourceOptions = sources.map(source => ({ value: source.id.toString(), label: source.name }));

    return (
        <div className="p-6 shadow-md rounded-lg w-full space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 text-center">User Filters</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CustomSelect
                    id="categories"
                    label="Categories"
                    isMulti
                    value={categoryOptions.filter(option => selectedCategories.includes(String(Number(option.value))))}
                    onChange={(newValue) => setSelectedCategories((newValue as { value: string }[]).map(option => option.value))}
                    options={categoryOptions}
                />
                <CustomSelect
                    id="authors"
                    label="Authors"
                    isMulti
                    value={authorOptions.filter(option => selectedAuthors.includes(String(Number(option.value))))}
                    onChange={(newValue) => setSelectedAuthors((newValue as { value: string }[]).map(option => option.value))}
                    options={authorOptions}
                />
                <CustomSelect
                    id="sources"
                    label="Sources"
                    isMulti
                    value={sourceOptions.filter(option => selectedSources.includes(String(Number(option.value))))}
                    onChange={(newValue) => setSelectedSources((newValue as { value: string }[]).map(option => option.value))}
                    options={sourceOptions}
                />
            </div>
            <div className="flex justify-center mt-4">
                <button
                    type="button"
                    onClick={() => handleSave(onSubmit)}
                    className="p-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
                >
                    Save
                </button>
            </div>
            <MessageComponent />
        </div>
    );
}

export default UserFilterForm;
