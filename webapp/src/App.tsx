import * as routes from "./lib/routes"
import { TrpcProvider } from "./lib/trpc"
import { Layout } from "./components/Layout"
import { AllideasPage } from "./pages/ideas/AllideasPage"
import { Viewidea } from "./pages/ideas/ViewideaPage"
import { BrowserRouter, Routes, Route } from "react-router"
import "./styles/global.scss"
import "./styles/_mixins.scss"
import { NewIdeaPage } from "./pages/ideas/NewIdeaPage"
import { SignUpPage } from "./pages/auth/SignUpPage"
import { SignInPage } from "./pages/auth/SignInPage"
import { LogOutPage } from "./pages/auth/LogOutPage"
import { EditIdeaPage } from "./pages/ideas/EditIdeaPage"
import { AppContextProvider } from "./lib/ctx"
import { NotFoundPage } from "./pages/other/NotFoundPage"
import { EditProfilePage } from "./pages/auth/EditProfilePage"
export const App = () => {
  return (
    <TrpcProvider>
      <AppContextProvider>
      <BrowserRouter>
        <Routes>
        <Route path={routes.getLogOutRoute()} element={<LogOutPage/>} />
          <Route element={<Layout />}>
            <Route path={routes.getAllIdeasRoute()} element={<AllideasPage />} />
            <Route path={routes.getNewIdeaRoute()} element={<NewIdeaPage />} />
            <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
            <Route path={routes.getSignInRoute()} element={<SignInPage/>}/>
            <Route path={routes.editProfileRoute()} element={<EditProfilePage/>}/>
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
