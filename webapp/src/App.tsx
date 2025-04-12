import { TrpcProvider } from "./lib/trpc"
import { Data } from "./pages/AllideasPage"

export const App = () => {
  return (
    <TrpcProvider>
      <Data />
    </TrpcProvider>
  )
}
