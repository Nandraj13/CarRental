
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Registration } from "./components/Register";
import { AdminHome } from "./components/AdminHome";
import { AddVehicles } from "./components/AddVehicles";
import { UserHome } from "./components/UserHome";
import { YourVehicles } from "./components/YourVehicles";
import { ViewVehicle } from "./components/ViewVehicle";
import { Logout } from "./components/Logout";
import { AdminViewVehicle } from "./components/AdminViewVehicle";
import { Approvedvehicles } from "./components/Approvedvehicles";
import { Viewapprovedvehicle } from "./components/Viewapprovedvehicle";
import { ViewAvailableVehicle } from "./components/ViewAvailableVehicle";
import { GetVehicleOnRentScreen } from "./components/GetVehicleOnRentScreen";
import { UserProfile } from "./components/UserProfile";
import { ViewVehicleOwner } from "./components/ViewVehicleOwner";

const AppRoutes = [
  {
    index: true,
    element: <Home />
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
    },
    {
        path: '/Logout',
        element: <Logout/>
    },
    {
        path: '/AdminViewVehicle',
        element: <AdminViewVehicle/>
    },
    {
        path: '/Approvedvehicles',
        element: <Approvedvehicles/>
    },
    {
        path: '/Viewapprovedvehicle',
        element: <Viewapprovedvehicle/>
    },
    {
        path: '/ViewAvailableVehicle',
        element: <ViewAvailableVehicle/>
    },
    {
        path: '/GetVehicleOnRentScreen',
        element: <GetVehicleOnRentScreen/>
    },
    {
        path: '/UserProfile',
        element: <UserProfile/>
    },
    {
        path: '/ViewVehicleOwner',
        element: <ViewVehicleOwner/>
    }
];

export default AppRoutes;
