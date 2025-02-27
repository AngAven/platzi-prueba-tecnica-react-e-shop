import {useContext, useState} from "react";
import {Link} from "react-router-dom";
import Layout from '../../Components/Layout'
import {ShoppingCartContext} from "../../Context/index.jsx";

function SignIn() {
    const {
        account,
    } = useContext(ShoppingCartContext)
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
                    className={'border border-black disabled:text-black/40 disabled:border-black/40 rounded-lg mt-6 py-3'}
                    disabled={hasUserAnAccount}
                >
                    Sign-up
                </button>
            </div>
        )
    }

    const renderCreateUser = () => {

    }

    const renderView = () => view === 'create-user' ? renderCreateUser() : renderLogIn()

  return (
    <Layout>
      <h1 className={'font-medium text-xl text-center mb-6 w-80'}>Welcome to Shopi</h1>
        {renderView()}
    </Layout>
  )
}

export default SignIn