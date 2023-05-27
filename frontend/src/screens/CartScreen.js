import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Form, Image, Button, Card, ListGroupItem }
    from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { useLocation, useNavigate } from 'react-router-dom';

const CartScreen = () => {
    let location = useLocation();
    let params = useParams()
    const productId = params?.id
    const navigate = useNavigate();

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart


    console.log(cartItems)

    useEffect(() => {
        if (productId) {
            console.log('fn dispached');
            dispatch(addToCart(productId, qty))
        }
        console.log('fn dispached');

    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))

    }
    const checkoutHandler = async () => {
        const user = await localStorage.getItem('userInfo')
        if (user) {
            navigate('/shipping')
        } else {
            navigate('/login?redirect=shipping')
        }

    }


    return (<Row>
        <Col md={8}>
            <h1>Panier </h1>
            {cartItems.length === 0 ? (
                <Message>
                    Votre panier est vide <Link to='/'>
                        Retourner </Link>
                </Message>
            ) : (
                <ListGroup variant='flush'>
                    {cartItems.map(item => (
                        <ListGroupItem key={item?.product}>
                            <Row>
                                <Col d={2}>
                                    <Image src={item?.image} alt={item?.name} fluid rounded />

                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item?.product}`}>{item?.name}</Link>
                                </Col>
                                <Col md={2}>{item?.prix} DT </Col>
                                <Col md={2}>
                                    <Form.Control style={{ padding: 'inherit' }} as='select' value={item?.qty} onChange={(e) =>
                                        dispatch(addToCart(item?.product, Number(e?.target?.value)))} >
                                        {[...Array(+item?.countInStock).keys()].map(x => (
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        ))}
                                    </Form.Control>

                                </Col>
                                <Col md={2}>
                                    <Button
                                        type='button'
                                        variant='light'
                                        onClick={() => removeFromCartHandler(item?.product)}> <i className='fas fa-trash'></i></Button>
                                </Col>

                            </Row>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            )}

        </Col >
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroupItem>
                        <h2>total ({cartItems.reduce((acc, item) => acc + item?.qty, 0)}) articles </h2>

                        {cartItems.reduce((acc, item) => acc + item?.qty * item?.prix, 0).toFixed(2)} DT
                    </ListGroupItem>
                    <ListGroupItem>
                        <Button type='button'
                            className='btn-block'
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}>

                            Passer à la caisse
                        </Button>
                    </ListGroupItem>
                </ListGroup>

            </Card>

        </Col>



    </Row>
    )
}

export default CartScreen
