import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import axios from "axios";

// Define a default query function that will receive the query key
const defaultQueryFn = async ({ queryKey }) => {
    const { data } = await axios.get(
        `${window.location.origin}/api/${queryKey[0]}`
    );
    return data;
};

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            queryFn: defaultQueryFn,
            refetchIntervalInBackground: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            retry: 0,
        },
    },
});

function ReactQueryProvider({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

export default ReactQueryProvider;