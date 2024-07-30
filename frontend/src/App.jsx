import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"

import * as Pages   from "./pages";
import * as Layouts from "./layouts";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<Layouts.RootLayout/>}>

          <Route element={<Layouts.GeneralLayout />}>
            <Route path="/"         element={<Pages.Home      />} />
            <Route path="/about"    element={<Pages.About     />} />
            <Route path="/contact"  element={<Pages.Contact   />} />
          </Route>

          <Route path="/login"    element={<Pages.Login     />} />
          <Route path="/signup"   element={<Pages.Signup    />} />

        </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
