import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderActions'


const OrderListScreen = (history) => {
    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            history.push('/login')
        }

    }, [dispatch, history, userInfo])


    return (
        <>
            <h1>Commande</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>UTILISATEUR</th>
                                <th>DATE</th>
                                <th>DÉLIVRÉ</th>
                                <th>TOTAL</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.user && order.user.name} {order.user && order.user.email}</td>
                                    <td>{order.createdAt?.toString().substring(0, 10)}</td>
                                    <td>{order.isDelivered ? 'Oui' : 'Non'}</td>


                                    <td>
                                        {Math.round(order.someOfProducts)} DT
                                    </td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button variant='light' className='btn-sm'>
                                                Details
                                            </Button>
                                        </LinkContainer>

                                    </td>
                                </tr>


                            ))}
                        </tbody>
                    </Table>

                )}

        </>
    )
}

export default OrderListScreen
