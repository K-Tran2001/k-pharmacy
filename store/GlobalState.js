import { createContext, useReducer, useEffect } from 'react'
import reducers from './Reducers'
import { getData } from '../utils/fetchData'


export const DataContext = createContext()


export const DataProvider = ({ children }) => {
    const initialState = {
        notify: {}, auth: {}, cart: [], modal: [], orders: [], categories: []
    }

    const [state, dispatch] = useReducer(reducers, initialState)
    const { cart, auth } = state

    useEffect(() => {
        const firstLogin = localStorage.getItem("firstLogin");
        if (firstLogin) {
            getData('auth/accessToken').then(res => {
                if (res.err) return localStorage.removeItem("firstLogin")
                dispatch({
                    type: "AUTH",
                    payload: {
                        token: res.access_token,
                        user: res.user
                    }
                })
            })
        }

        getData('categories').then(res => {
            if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

            dispatch({
                type: "ADD_CATEGORIES",
                payload: res.categories
            })
        })

    }, [])

    useEffect(() => {
        const shop__cart = JSON.parse(localStorage.getItem('shop__cart'))

        if (shop__cart) dispatch({ type: 'ADD_CART', payload: shop__cart })
    }, [])

    useEffect(() => {
        localStorage.setItem('shop__cart', JSON.stringify(cart))
    }, [cart])

    useEffect(() => {
        if (auth.token) {
            getData('order', auth.token)
                .then(res => {
                    if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

                    dispatch({ type: 'ADD_ORDERS', payload: res.orders })
                })

            if (auth.user.role === 'admin') {
                getData('user', auth.token)
                    .then(res => {
                        if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

                        dispatch({ type: 'ADD_USERS', payload: res.users })
                    })
            }
        } else {
            dispatch({ type: 'ADD_ORDERS', payload: [] })
            dispatch({ type: 'ADD_USERS', payload: [] })
        }
    }, [auth.token])
    console.log({ global_state: state })
    return (
        <DataContext.Provider value={[state, dispatch]}>
            {children}
        </DataContext.Provider>
    )
}