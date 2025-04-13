import { TrpcProvider } from "./lib/trpc"
import { Allidea } from "./pages/AllideasPage"
import Viewidea from "./pages/ViewideaPage"
import { BrowserRouter, Routes, Route } from "react-router"
export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
      <Routes>
           <Route path="/" element={<Allidea />}/>        
     <Route path="/ideas/:app" element={<Viewidea/>}/>  
      </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
