import WithAuth from "@/hoc/WithAuth";
import React from "react";
import ArticlesList from "@/components/ArticlesList";
import { ArticlesProvider } from "@/context/ArticlesContext";
import FilterForm from "@/components/FilterForm";

const Articles = () => {
    return (
        <WithAuth>
            <ArticlesProvider>
                <FilterForm />
                <ArticlesList />
            </ArticlesProvider>
        </WithAuth>
    );
};


export default Articles
