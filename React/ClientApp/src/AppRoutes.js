import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Registration } from "./components/Register";
import { AdminHome } from "./components/AdminHome";
import { AddVehicles } from "./components/AddVehicles";
import { UserHome } from "./components/UserHome";
import { YourVehicles } from "./components/YourVehicles";
import { ViewVehicle } from "./components/ViewVehicle";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
    }
    ,
    {
       path: '/Login',
       element: <Login/>
    },
    {
        path: '/Registration',
        element: <Registration/>
    },
    {
        path: '/AdminHome',
        element:<AdminHome/>
    },
    {
        path: '/AddVehicles',
        element: <AddVehicles/>
    },
    {
        path: '/UserHome',
        element: <UserHome/>
    },
    {
        path: '/YourVehicles',
        element: <YourVehicles/>
    },
    {
        path: '/ViewVehicle',
        element: <ViewVehicle/>
    }
];

export default AppRoutes;
