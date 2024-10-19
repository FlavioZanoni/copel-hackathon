"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export const QueryContext = ({ children }: React.PropsWithChildren) => {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: { queries: { staleTime: 1000 * 60 * 15 }, },
    })
  )

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
