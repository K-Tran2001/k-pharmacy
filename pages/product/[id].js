import { getData } from '@/utils/fetchData'
import React, { useState, useEffect, useContext } from 'react'
import Head from 'next/head'

import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'

const DetailProduct = (props) => {
    const [product, setProduct] = useState()
    const [tab, setTab] = useState(0)

    useEffect(() => {
        setProduct(props.product);
    }, [product])

    //const img = product?.images[0]?.url
    const img = product?.images[0]
    console.log(img)

    const [state, dispatch] = useContext(DataContext)
    const { cart } = state
    //console.log({ state: state })


    const isActive = (index) => {
        if (tab === index) return " active";
        return ""
    }


    return (

        <div className="row detail_page">
            <Head>
                <title>Detail Product</title>
            </Head>

            <div className="col-md-6">
                <img src={product?.images[tab].url} alt={product?.images[tab].url}
                    className="d-block img-thumbnail rounded mt-4 w-100"
                    style={{ height: '350px' }} />

                <div className="row mx-0" style={{ cursor: 'pointer' }} >

                    {product?.images?.map((img, index) => (
                        <img key={index} src={img.url} alt={img.url}
                            className={`img-thumbnail rounded ${isActive(index)}`}
                            style={{ height: '80px', width: '20%' }}
                            onClick={() => setTab(index)} />
                    ))}

                </div>
            </div>

            <div className="col-md-6 mt-3">
                <h2 className="text-uppercase">{product?.title}</h2>
                <h5 className="text-danger">${product?.price}</h5>

                <div className="row mx-0 d-flex justify-content-between">
                    {
                        product?.inStock > 0
                            ? <h6 className="text-danger">In Stock: {product?.inStock}</h6>
                            : <h6 className="text-danger">Out Stock</h6>
                    }

                    <h6 className="text-danger">Sold: {product?.sold}</h6>
                </div>

                <div className="my-2">{product?.description}</div>
                <div className="my-2">
                    {product?.content}
                </div>

                <button type="button" className="btn btn-dark d-block my-3 px-5"
                    onClick={() => dispatch(addToCart(product, cart))}
                    disabled={product?.inStock === 0 ? true : false}
                >
                    Buy
                </button>
                <button type="button" className="btn btn-info d-block my-3 px-5"
                    onClick={() => dispatch(addToCart(product, cart))}
                    disabled={product?.inStock === 0 ? true : false}
                >
                    Share
                </button>

            </div>

            <div>
                <h1>San pham lien quan</h1>
                <h1>Binh luan</h1>
                <ul>
                    <li>***</li>
                    <li>Dong goi sli tuyet voi..</li>
                    <li>17:00 PM</li>
                </ul>
            </div>
        </div>

    )
}

export async function getServerSideProps({ params: { id } }) {
    const res = await getData(`product/${id}`)
    console.log(res)

    // server side rendering
    return {
        props: {
            product: res.product
        }
    }
}
export default DetailProduct