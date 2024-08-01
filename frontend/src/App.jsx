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

          <Route 
            loader={async () => {
              // const user = await fake.getUser();
              // if (!user) {
              //   throw redirect("/login");
              // }
          
              // otherwise continue
              // const stats = await fake.getDashboardStats();
              // return { user, stats };
              return {};
            }}
          >

            <Route path="/dashboard"  element={<Pages.Dashboard />} />
            <Route path="/uploads"  element={<Pages.Uploads />} />
            <Route path="/files/:id"  element={<Pages.Files />} />
            <Route path="/api/:id"  element={<Pages.Final />} />
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
