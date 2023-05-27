import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails, createProductReview } from '../actions/productsActions'
import { useParams, useNavigate } from 'react-router-dom'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Meta from '../components/Meta'

const ProductScreen = (props) => {
    const [qty, setQty] = useState(1)
    const params = useParams();
    const navigate = useNavigate();
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productdetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productdetails

    const productCreateReview = useSelector(state => state.productCreateReview)
    const { success: successProductReview,
        error: errorProductReview } = productCreateReview



    useEffect(() => {
        if (successProductReview) {
            alert('Révision soumise !')
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }

        dispatch(listProductDetails(params.id))
    }, [dispatch, props, params.id, successProductReview])

    const addToCartHandler = () => {
        navigate(`/cart/${params.id}?qty=${qty}`)

    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(params.id, { rating, comment }))
    }


    return (
        <>
            <Link className='btn btn-dark my-3' to='/'>
                Retourner
            </Link>
            {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : (
                <>
                    <Meta title={product.name} />
                    <Row>
                        <Col md={6}>
                            <Image src={product?.image} alt={product.name} fluid />
                        </Col>
                        <Col>
                            <ListGroup variant='flush'>
                                <ListGroupItem>
                                    <h3>{product.name}</h3>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Rating value={product.Rating}
                                        text={`${product.numReviews} reviews`} />
                                </ListGroupItem>
                                <ListGroupItem>
                                    Prix: {product.prix} DT
                                </ListGroupItem>
                                <ListGroupItem>
                                    Description: {product.description}
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                        </Col>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <strong>{product.prix} DT</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>prix:</Col>
                                        <Col>
                                            <strong>{product.prix} DT</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Statut:</Col>
                                        <Col>
                                            {product.countInStock > 0 ? 'En stock' : 'Rupture de stock'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                                <Form.Control as='select' value={qty} onChange={(e) =>
                                                    setQty(e.target.value)}>
                                                    {[...Array(+product?.countInStock).keys()].map(x => (
                                                        <option key={x + 1} value={x + 1}> {x + 1}</option>
                                                    ))}
                                                </Form.Control>
                                            </Col>

                                        </Row>

                                    </ListGroup.Item>
                                )}



                                <ListGroup.Item>
                                    <Button
                                        onClick={addToCartHandler}
                                        className='btn-block' type='button'
                                        disabled={product.countInStock === 0}>

                                        Ajouter au panier
                                    </Button>

                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Row>
                    <Col md={6}>
                        <h2>Commentaires</h2>
                        {product.reviews.length === 0 && <Message>
                            Aucun avis</Message>}
                        <ListGroup variant='flush'>
                            {product.reviews.map((review) => (
                                <ListGroup.Item key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating value={review.rating} />
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                    <p>{review.comment}</p>
                                </ListGroup.Item>
                            ))}
                            <ListGroup.Item>
                                <h2>rédiger un avis client</h2>
                                {errorProductReview &&
                                    <Message variant='danger'>{errorProductReview}</Message>}
                                {userInfo ? (
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId='rating'>
                                            <Form.Label>Notation</Form.Label>
                                            <Form.Control as='select' className='p-0' value={rating} onChange={(e) =>
                                                setRating(e.target.value)}>
                                                <option value=''>Sélectionner </option>
                                                <option value='1'>1 - Pauvre </option>
                                                <option value='2'>2 - Équitable </option>
                                                <option value='3'>3 - Bien </option>
                                                <option value='4'>4 - Très bien </option>
                                                <option value='5'>5 -Excellent </option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='comment'>
                                            <Form.Label>commentaire</Form.Label>
                                            <Form.Control as='textarea'
                                                row='3'
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}>
                                            </Form.Control>
                                            <Button type='submit' variant='primary'>
                                                soumettre
                                            </Button>
                                        </Form.Group>
                                    </Form>
                                ) : (
                                    <Message> S'il te plaît
                                        <Link to='/login'> s'identifier </Link> écrire une critique {''}
                                    </Message>)}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </>
            )
            }

        </>
    )
}

export default ProductScreen
