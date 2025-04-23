import * as routes from "./lib/routes"
import { TrpcProvider } from "./lib/trpc"
import { Layout } from "./components/Layout"
import { Allidea } from "./pages/AllideasPage"
import { Viewidea } from "./pages/ViewideaPage"
import { BrowserRouter, Routes, Route } from "react-router"
import "./styles/global.scss"
import "./styles/_mixins.scss"
import { NewIdeaPage } from "./pages/NewIdeaPage"
import { SignUpPage } from "./pages/SignUpPage"
import { SignInPage } from "./pages/SignInPage"
import { LogOutPage } from "./pages/LogOutPage"
import { EditIdeaPage } from "./pages/EditIdeaPage"
import { AppContextProvider } from "./lib/ctx"
import { NotFoundPage } from "./pages/NotFoundPage"
export const App = () => {
  return (
    <TrpcProvider>
      <AppContextProvider>
      <BrowserRouter>
        <Routes>
        <Route path={routes.getLogOutRoute()} element={<LogOutPage/>} />
          <Route element={<Layout />}>
            <Route path={routes.getAllIdeaRoute()} element={<Allidea />} />
            <Route path={routes.getNewIdeaRoute()} element={<NewIdeaPage />} />
            <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
            <Route path={routes.getSignInRoute()} element={<SignInPage/>}/>
            <Route path={routes.getViewIdeaRoute(routes.viewParams)} element={<Viewidea />}/>
            <Route path={routes.editIdeaRoute(routes.editIdeaParams)} element={<EditIdeaPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  )
}
