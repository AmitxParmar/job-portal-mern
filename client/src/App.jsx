import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import Loader from "./components/Dashboard/common/Loader/Loader";
import Navbar from "./components/Dashboard/common/Navbar";

const AppliedJobs = lazy(() =>
  import("./components/Dashboard/Settings/AppliedJobs")
);
const Bookmarks = lazy(() =>
  import("./components/Dashboard/Settings/Bookmarks")
);
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Home = lazy(() => import("./pages/Home"));
const Layout = lazy(() =>
  import("./components/Dashboard/common/Layouts/Layout")
);
const Login = lazy(() => import("./pages/Login"));
const LoginRegisterLayout = lazy(() =>
  import("./components/Dashboard/common/Layouts/LoginRegisterLayout")
);
const Profile = lazy(() => import("./components/Dashboard/Settings/Profile"));
const Register = lazy(() => import("./pages/Register"));
const Settings = lazy(() => import("./components/Dashboard/Settings"));

function App() {
  const role = "jobSeeker"; // jobSeeker or employer
  const isAuth = true;
  return (
    <Router>
      <div className="">
        <Navbar role={role} isAuth={isAuth} />

        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Layout role={role}>
                  <Suspense fallback={<div>Loading...</div>}>
                    <Dashboard role={role} />
                  </Suspense>
                </Layout>
              </Suspense>
            }
          />
          <Route
            path="/settings"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Layout role={role}>
                  <Suspense fallback={<div>Loading...</div>}>
                    <Settings />
                  </Suspense>
                </Layout>
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Profile />
                </Suspense>
              }
            />
            <Route
              path="applied-jobs"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <AppliedJobs />
                </Suspense>
              }
            />
            <Route
              path="bookmarks"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Bookmarks />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/login"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LoginRegisterLayout>
                  <Suspense fallback={<div>Loading...</div>}>
                    <Login />
                  </Suspense>
                </LoginRegisterLayout>
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LoginRegisterLayout>
                  <Suspense fallback={<div>Loading...</div>}>
                    <Register />
                  </Suspense>
                </LoginRegisterLayout>
              </Suspense>
            }
          />

          <Route
            path="*"
            element={
              <div className="h-screen w-screen bg-black">
                <p className="m-auto border-b-4 border-border">
                  Error: No Route Found!
                </p>{" "}
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
