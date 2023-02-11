import Head from 'next/head'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../../store/GlobalState'
import { useRouter } from 'next/router'
import Link from 'next/link'
import OrderDetail from '../../components/OrderDetail'


const DetailOrder = () => {

    const [state, dispatch] = useContext(DataContext)
    const { orders, auth } = state


    const router = useRouter()
    const { id } = router.query
    const [orderDetail, setOrderDetail] = useState([])

    useEffect(() => {
        const newArr = orders.filter(order => order._id === router.query.id)
        setOrderDetail(newArr)
    }, [orders])

    if (!auth.user) return null;
    return (
        <div className="my-3">
            <Head>
                <title>Detail Orders</title>
            </Head>

            <div>
                <button className="btn btn-dark" onClick={() => router.back()}>
                    <i className="fas fa-long-arrow-alt-left" aria-hidden="true"></i> Go Back
                </button>

                <button className="ml-2 btn btn-success" onClick={() => router.back()}>
                    Export Excel<i className="ml-1 fas fa-file-excel" aria-hidden="true"></i>
                </button>
            </div>



            <OrderDetail orderDetail={orderDetail} state={state} dispatch={dispatch} />




        </div>
    )
}

export default DetailOrder