import Layout from '../../Components/Layout'
import {useContext, useRef, useState} from "react";
import {ShoppingCartContext} from "../../Context/index.jsx";

function MyAccount() {
    const {
        account,
        setAccount,
    } = useContext(ShoppingCartContext)
    const [view, setView] = useState('edit-user-info')
    const form = useRef(null);

    const editAccount = () => {
        const formData = new FormData(form.current)
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
        }

        // Update account
        setAccount(data)
    }

    const renderUserInfo = () => {

        return (
            <div className={'flex flex-col w-80'}>
                <p>
                    <span className={'font-light text-sm'}>Name: </span>
                    <span>{account.name}</span>
                </p>
                <p>
                    <span className={'font-light text-sm'}>E-mail:</span>
                    <span>{account.email}</span>
                </p>
                <button
                    className={'border border-black rounded-lg mt-6 py-3'}
                    onClick={() => setView('edit-user-info')}
                >Edit
                </button>
            </div>
        )
    }

    const renderEditUserInfo = () => {

        return (
            <form ref={form} className={'flex flex-col w-80 gap-4'}>
                <div className={'flex flex-col gap-1'}>
                    <label htmlFor="name" className={'font-light text-sm'}>Your name:</label>
                    <input
                        type="text"
                        id={'name'}
                        name={'name'}
                        defaultValue={account.name}
                        placeholder={'John Due'}
                        className={'rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60  py-2 px-4'}
                    />
                </div>
                <div className={'flex flex-col w-80 gap-1'}>
                    <label htmlFor="email" className={'font-light text-sm'}>Your e-mail:</label>
                    <input
                        type="text"
                        id={'email'}
                        name={'email'}
                        defaultValue={account.email}
                        placeholder={'hi@gmail.com'}
                        className={'rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 py-2 px-4'}
                    />
                </div>
                <div className={'flex flex-col gap-1'}>
                    <label htmlFor="password" className={'font-light text-sm'}>Your password:</label>
                    <input
                        type="text"
                        id={'password'}
                        name={'password'}
                        defaultValue={account.password}
                        placeholder={'*******'}
                        className={'rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 py-2 px-4'}
                    />
                </div>
                <button
                    onClick={() => {
                        setView('user-info')
                        editAccount()
                    }}
                    className={'bg-black text-white rounded-lg py-3'}
                >
                    Update
                </button>
            </form>
        )
    }

    const renderView = () => view === 'edit-user-info' ? renderEditUserInfo() : renderUserInfo()

    return (
        <Layout>
            MyAccount
            {renderView()}
        </Layout>
    )
}

export default MyAccount