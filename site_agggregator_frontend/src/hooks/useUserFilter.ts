import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useArticles } from '@/context/ArticlesContext';
import ApiService from '@/api/ApiService';
import { getMessageService } from '@/services/MessageServiceFactory';

export function useUserFilter() {
    const { categories, authors, sources } = useArticles();
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
    const [selectedSources, setSelectedSources] = useState<string[]>([]);
    const apiService = useMemo(() => new ApiService(), []);
    const messageService = useMemo(() => getMessageService(), []);
    const router = useRouter();

    const handleSave = async () => {
        try {
            const data = {
                categories: selectedCategories,
                authors: selectedAuthors,
                sources: selectedSources,
            };
            apiService.setToken();
            await apiService.postData(`${process.env.NEXT_PUBLIC_API_HOST}/custom-feed`, data);
            messageService.success('User feed updated');
            router.refresh();
        } catch (error) {
            console.error('Failed to save filters', error);
            messageService.error('Failed to save filters');
        }
    };

    return {
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
    };
}
