import type { TrpcRouter } from "@app/backend/src/router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createTRPCReact, httpBatchLink } from "@trpc/react-query"
import superjson from 'superjson'
import Cookies from "js-cookie"

export const trpc = createTRPCReact<TrpcRouter>()
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

const trpcClient = trpc.createClient({
 
  links: [
    httpBatchLink({ 
      transformer: superjson,
      url: "http://localhost:5433/trpc",
      headers: ()=>{
        const token = Cookies.get('token')

        return {
          ...(token && {authorization: `Bearer ${token}`})
        }
      }
    }),
  ],
})

export const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
