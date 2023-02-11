import Head from 'next/head'
import Link from 'next/link'
import { useState, useContext, useEffect, useReducer } from 'react'
import { DataContext } from '../store/GlobalState'
import { postData } from '../utils/fetchData'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import valid from '@/utils/valid'

const Register = () => {
    const initialState = { name: '', email: '', password: '', cf_password: '' }
    const [userData, setUserData] = useState(initialState)
    const { name, email, password, cf_password } = userData;

    const [state, dispatch] = useContext(DataContext)
    const { auth } = state

    const router = useRouter()

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
        //dispatch({ type: 'NOTIFY', payload: {} })
        //console.log(userData);
    }

    const handleSubmit = async e => {
        //console.log(state)
        e.preventDefault()
        //console.log({ user: userData });
        const errMsg = valid(name, email, password, cf_password)
        if (errMsg) return dispatch({ type: 'NOTIFY', payload: { error: errMsg } })

        //dispatch({ type: 'NOTIFY', payload: { loading: true } })
        const res = await postData('auth/register', userData)


        //console.log(res)

        if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

        dispatch({ type: 'NOTIFY', payload: { success: res.msg } })

        // dispatch({
        //     type: 'AUTH', payload: {
        //         token: res.access_token,
        //         user: res.user
        //     }
        // })

        // Cookie.set('refreshtoken', res.refresh_token, {
        //     path: 'api/auth/accessToken',
        //     expires: 7
        // })

        // localStorage.setItem('firstLogin', true)

    }

    // useEffect(() => {
    //     if (Object.keys(auth).length !== 0)
    //         router.push("/login")
    // }, [auth])

    return (
        <div>
            <Head>
                <title>Register Page</title>
            </Head>

            <form className="mx-auto my-4" style={{ maxWidth: '500px' }} onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input type="text" className="form-control" id="exampleInputname1" aria-describedby="nameHelp"
                        name="name" value={name} onChange={handleChangeInput} />
                    <small id="nameHelp" className="form-text text-muted"></small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        name="email" value={email} onChange={handleChangeInput} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"
                        name="password" value={password} onChange={handleChangeInput} />
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Comfirm Password</label>
                    <input type="password" className="form-control" id="exampleInputcf_Password1"
                        name="cf_password" value={cf_password} onChange={handleChangeInput} />
                </div>

                <button type="submit" className="btn btn-dark w-100">Register</button>

                <p className="my-2">
                    Already have an account?<Link legacyBehavior href="/signin"><a style={{ color: 'crimson' }}>Login Now</a></Link>
                </p>
            </form>
        </div>
    )
}

export default Register