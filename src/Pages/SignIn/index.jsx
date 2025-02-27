import {useContext, useRef, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import Layout from '../../Components/Layout'
import {ShoppingCartContext} from "../../Context/index.jsx";

function SignIn() {
    const {
        account,
        setAccount,
        setSignOut,
    } = useContext(ShoppingCartContext)
    const form = useRef(null);
    const [view, setView] = useState('create-user')
    const hasUserAnAccount = Object.keys(account).length !== 0

    const renderLogIn = () => {
        return (
            <div className={'flex flex-col w-80'}>
                <p>
                    <span className={'font-light text-sm'}>Email: </span>
                    <span>{account?.email}</span>
                </p>
                <p>
                    <span className={'font-light text-sm'}>Password:</span>
                    <span>{account?.password}</span>
                </p>
                <Link to='/'>
                    <button
                        onClick={() => handleSignIn()}
                        className={'bg-black disabled:bg-black/40 text-white w-full  rounded-lg py-3 mt-4 mb-2'}
                        disabled={!hasUserAnAccount}
                    >
                        Log in
                    </button>
                </Link>
                <div className={'text-center'}>
                    <a href="/" className={'font-light text-xs underline underline-offset-4 '}>Forgot my password</a>
                </div>
                <button
                    onClick={() => setView('create-user-info')}
                    className={'border border-black disabled:text-black/40 disabled:border-black/40 rounded-lg mt-6 py-3'}
                    disabled={hasUserAnAccount}
                >
                    Sign-up
                </button>
            </div>
        )
    }

    const createAccount = () => {
        const formData = new FormData(form.current)
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
        }
        setAccount(data)
        handleSignIn()
    }

    const handleSignIn = () => {
        setSignOut(false)

        return <Navigate replace to={'/'}/>
    }

    const renderCreateUser = () => {
        return(
            <form ref={form} className={'flex flex-col gap-4 w-80'}>
                <div className={'flex flex-col gap-1'}>
                    <label htmlFor="name" className={'font-light text-sm'}>Your name:</label>
                    <input
                        type="text"
                        id={'name'}
                        name={'name'}
                        defaultValue={account?.name}
                        placeholder={'Angel Avendaño'}
                        className={'rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60  focus:outline-none py-2 px-4'}
                    />
                </div>
                <div className={'flex flex-col gap-1'}>
                    <label htmlFor="email" className={'font-light text-sm'}>Your email:</label>
                    <input
                        type="text"
                        id={'email'}
                        name={'email'}
                        defaultValue={account?.email}
                        placeholder={'hi@gmail.com'}
                        className={'rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'}
                    />
                </div>
                <div className={'flex flex-col gap-1'}>
                    <label htmlFor="password" className={'font-light text-sm'}>Your password:</label>
                    <input
                        type="password"
                        placeholder={'*****'}
                        id={'password'}
                        name={'password'}
                        defaultValue={account?.password}
                        className={'rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/0 focus:outline-none py-2 px-4'}
                    />
                </div>
                <Link to={'/'}>
                    <button
                        className={'bg-black text-white rounded-lg py-3 w-full'}
                        onClick={() => createAccount()}
                    >
                        Create
                    </button>

                </Link>
            </form>
        )
    }

    const renderView = () => view === 'create-user-info' ? renderCreateUser() : renderLogIn()

  return (
    <Layout>
      <h1 className={'font-medium text-xl text-center mb-6 w-80'}>Welcome to Shopi</h1>
        {renderView()}
    </Layout>
  )
}

export default SignIn