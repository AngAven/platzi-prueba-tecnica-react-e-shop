import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ShoppingCartContext } from '../../Context'
import {ArrowLeftOnRectangleIcon} from "@heroicons/react/24/solid"
import {ArrowRightOnRectangleIcon} from "@heroicons/react/24/solid"
import {ShoppingCart} from '../ShopoingCart'

const Navbar = () => {
  const {
      account,
      signOut,
      setSignOut,
      setSearchByCategory,
      cartProducts,
  } = useContext(ShoppingCartContext)
  const activeStyle = 'underline underline-offset-4'
  const isUserSignOut = signOut

  const handleSignOut = () => {
    setSignOut(true)
  }

  const renderView = () => {
    if (isUserSignOut) {
      return (
          <li>
              <NavLink
                  onClick={() => handleSignOut()}
                  to='/sign-in'
                  className={({isActive}) =>
                      isActive ? activeStyle : undefined
                  }>
                  <div className={'flex items-center gap-2'}>
                      <div>Sign out</div>
                      <ArrowRightOnRectangleIcon className='h-6 w-6 text-black'/>
                  </div>
              </NavLink>
          </li>
      )
    } else {
      return (
          <>
            <li className='text-black/60'>
                {account?.email}
            </li>
            <li>
              <NavLink
                  to='/my-orders'
                  className={({isActive}) =>
                      isActive ? activeStyle : undefined
                  }>
                My Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                  to='/my-account'
                  className={({isActive}) =>
                      isActive ? activeStyle : undefined
                  }>
                My Account
              </NavLink>
            </li>
            <li>
                <ShoppingCart/>
            </li>
            <li>
              <NavLink
                  onClick={() => handleSignOut()}
                  to='/sign-in'
                  className={({isActive}) =>
                      isActive ? activeStyle : undefined
                  }>
                <div className={'flex items-center gap-2'}>
                  <div>Sign out</div>
                  <ArrowLeftOnRectangleIcon className='h-6 w-6 text-black'/>
                </div>
              </NavLink>
            </li>
          </>
      )
    }
  }

  return (
    <nav className='flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light'>
      <ul className='flex items-center gap-3'>
        <li className='font-semibold text-lg'>
          <NavLink to='/'>
            Shopi
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/'
            onClick={() => setSearchByCategory()}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/clothes'
            onClick={() => setSearchByCategory('clothes')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Clothes
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/electronics'
            onClick={() => setSearchByCategory('electronics')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/furnitures'
            onClick={() => setSearchByCategory('furnitures')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Furnitures
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/toys'
            onClick={() => setSearchByCategory('toys')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Toys
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/others'
            onClick={() => setSearchByCategory('others')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Others
          </NavLink>
        </li>
      </ul>
      <ul className='flex items-center gap-3'>
        {renderView()}
      </ul>
    </nav>
  )
}

export default Navbar