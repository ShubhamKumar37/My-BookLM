"use client";

import React, { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const QueryProvider = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

export default QueryProvider;