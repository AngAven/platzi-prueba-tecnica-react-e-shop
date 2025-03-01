import {useContext, useEffect, useState} from "react";
import {useRoutes, BrowserRouter, Navigate} from 'react-router-dom'
import {ShoppingCartContext, ShoppingCartProvider} from '../../Context'
import Home from '../Home'
import MyAccount from '../MyAccount'
import MyOrder from '../MyOrder'
import MyOrders from '../MyOrders'
import NotFound from '../NotFound'
import SignIn from '../SignIn'
import Navbar from '../../Components/Navbar'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'
import './App.css'

const AppRoutes = () => {
  const {
    account,
    signOut,
  } = useContext(ShoppingCartContext)

  const hasUserAnAccount = Object.keys(account).length > 0
  const isUserSignIn = !signOut

  const baseRouting = [
    { path: '/my-account', element: <MyAccount /> },
    { path: '/my-order', element: <MyOrder /> },
    { path: '/my-orders', element: <MyOrders /> },
    { path: '/my-orders/last', element: <MyOrder /> },
    { path: '/my-orders/:id', element: <MyOrder /> },
    { path: '/sign-in', element: <SignIn /> },
    { path: '/*', element: <NotFound /> },
  ]

  const routesWithAccount = [
    { path: '/', element: <Home /> },
    { path: '/clothes', element: <Home /> },
    { path: '/electronics', element: <Home /> },
    { path: '/furnitures', element: <Home /> },
    { path: '/toys', element: <Home /> },
    { path: '/others', element: <Home /> },
  ]

  const routesWithoutAccount = [
    { path: '/', element: <Home /> },
    { path: '/clothes', element: <Navigate replace to={'/sign-in'} />},
    { path: '/electronics', element: <Navigate replace to={'/sign-in'} />},
    { path: '/furnitures', element: <Navigate replace to={'/sign-in'} />},
    { path: '/toys', element: <Navigate replace to={'/sign-in'} />},
    { path: '/others', element: <Navigate replace to={'/sign-in'} />},
    { path: '/my-account', element: <Navigate replace to={'sign-in'} />},
    { path: '/my-order', element: <Navigate replace to={'sign-in'} />},
    { path: '/my-orders', element: <Navigate replace to={'sign-in'} />},
    { path: '/my-orders/last', element: <Navigate replace to={'sign-in'} />},
    { path: '/my-orders/:id', element: <Navigate replace to={'sign-in'} />},
    { path: '/sign-in', element: <Navigate replace to={'sign-in'} />},
  ]

  const [routerConfig, setRouterConfig] = useState(baseRouting)

  useEffect(() => {
    if (hasUserAnAccount && isUserSignIn) {
      setRouterConfig([...baseRouting, ...routesWithAccount])
    }else {
     setRouterConfig([...baseRouting, ...routesWithoutAccount])
    }
  }, [hasUserAnAccount, isUserSignIn])

  return useRoutes(routerConfig)
}

const App = () => {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes />
        <Navbar />
        <CheckoutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>
  )
}

export default App
