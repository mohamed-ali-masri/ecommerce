import React, { useEffect, useState } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from '../actions/cartActions'
const PlaceOrderScreen = () => {
    const livraisonPrice = 7
    const [nomberOfProducts, setNomberOfProducts] = useState(0)
    const [someOfProducts, setSomeOfProducts] = useState(0)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }



    cart.itemprix = addDecimals
        ((acc, item) => acc + item.prix * item.qty,
            0)



    cart.shippingprix = addDecimals(cart.itemsprix > 100 ? 0 : 100)
    cart.taxprix = addDecimals(Number((0.19 * cart.itemsprix).toFixed(2)))
    cart.totalprix = (Number(cart.itemprix) + Number(cart.shippingPrice) +
        Number(cart.taxprix)).toFixed(2)

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate
    useEffect(() => {
        const nbProducts = cart.cartItems.reduce((occ, curr) => +occ + curr?.qty, 0);
        setNomberOfProducts(nbProducts)
        const someProducts = cart.cartItems.reduce((occ, curr) => +occ + (curr?.qty * curr?.prix), 0) + livraisonPrice;
        setSomeOfProducts(someProducts)
    }, [cart])
    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`)
        }
        // eslint-disable-next-line 
    }, [success])


    const placeOrderHandler = () => {
        dispatch(savePaymentMethod('Livraison'))
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: 'Livraison',
            nombreOfproducts: nomberOfProducts,
            livraisonPrice,
            someOfProducts,

        }))
    }
    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Expédition</h2>
                            <p>
                                <strong>Adresse:</strong>
                                {cart.shippingAddress.address},
                                {cart.shippingAddress.city}{''}
                                {cart.shippingAddress.codepostal},{''}
                                {cart.shippingAddress.country}
                            </p>

                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Mode de paiement</h2>
                            Livraison
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Articles commandés</h2>
                            {cart.cartItems.length === 0 ? <Message>Votre panier est vide </Message>
                                : (
                                    <ListGroup variant='flush'>
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={2}>
                                                        <Image src={item.image} alt={item.name}
                                                            fluid rounded />
                                                    </Col>
                                                    <Col md={1}>
                                                        <Link to={`/products/${item.product}`}></Link>
                                                    </Col>
                                                    <Col md={9} >
                                                        {item.qty} x {item.prix} DT = {addDecimals(item.qty * item.prix)} DT

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
                                <h2>Detail du commande </h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Nombre De Produits</Col>
                                    <Col>{nomberOfProducts}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Livraison</Col>
                                    <Col>{livraisonPrice} DT</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>{someOfProducts} DT</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>



                            <ListGroup.Item>
                                <Button type='button' className='btn-block' disabled={cart.cartItems === 0}
                                    onClick={placeOrderHandler}> Passer une commande </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>


                </Col>
            </Row>

        </>


    )
}

export default PlaceOrderScreen
