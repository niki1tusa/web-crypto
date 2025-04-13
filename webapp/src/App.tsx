import { getAllIdeaRoute, getViewIdeaRoute, viewParams } from "./lib/routes"
import { TrpcProvider } from "./lib/trpc"
import { Allidea } from "./pages/AllideasPage"
import Viewidea from "./pages/ViewideaPage"
import { BrowserRouter, Routes, Route } from "react-router"
export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
      <Routes>
           <Route path={getAllIdeaRoute()} element={<Allidea />}/>        
     <Route path={getViewIdeaRoute(viewParams)} element={<Viewidea/>}/>  
      </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
