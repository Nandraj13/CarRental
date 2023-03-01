import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Registration } from "./components/Register";

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
    }
];

export default AppRoutes;
