import React, { useEffect } from 'react'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import { createOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import Loader from '../components/Loader'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'
import { useParams } from "react-router-dom";

const OrderScreen = () => {
    const params = useParams()
    const orderId = params.id
    const dispatch = useDispatch()


    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const orderDetails = useSelector((state) => state.orderDetail)
    const { order, loading, error } = orderDetails
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch(createOrderDetails(orderId))
    }, [dispatch, orderId, successDeliver])

    const livrer = () => {
        dispatch(deliverOrder(orderId))
    }

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <>
        <h1>Commande{order._id}</h1>

        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Expédition</h2>
                        <p><strong>Nom : </strong> {order.user.name}</p>
                        <p>
                            <strong>Email : </strong>{''}
                            <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        <p>
                            <strong>Adresse:</strong>
                            {order.shippingAddress.address},
                            {order.shippingAddress.city}{''}
                            {order.shippingAddress.codepostal},{''}
                            {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? (
                            <Message variant='success'>Délivré le {order.deliveredAt}</Message>
                        ) : (
                            <Message variant='danger'>Non livrés </Message>
                        )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Mode de paiement</h2>
                        <p>
                            <strong>Méthode:</strong>
                            {order.paymentMethod}
                        </p>


                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Articles commandés </h2>
                        {order.orderItems.length === 0 ? <Message> La commande est vide </Message>
                            : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name}
                                                        fluid rounded />

                                                </Col>
                                                <Col>
                                                    <Link to={`/products/${item.product}`}></Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x {item.prix} DT = {item.qty * item.prix} DT


                                                </Col>

                                            </Row>
                                        </ListGroup.Item>

                                    ))}
                                </ListGroup>
                            )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Récapitulatif de la commande </h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Articles</Col>
                                <Col>{order.nombreOfproducts}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Articles total</Col>
                                <Col>{Math.round(order.someOfProducts - order.livraisonPrice)} DT</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Livraison</Col>
                                <Col>{Math.round(order.livraisonPrice)} DT</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Commande totale</Col>
                                <Col>{Math.round(order.someOfProducts)} DT</Col>
                            </Row>
                        </ListGroup.Item>

                    </ListGroup>
                    {userInfo?.isAdmin &&
                        <Button type='button' onClick={livrer} varianr='primary'> Livré </Button>}
                </Card>


            </Col>
        </Row>
    </>
}

export default OrderScreen
