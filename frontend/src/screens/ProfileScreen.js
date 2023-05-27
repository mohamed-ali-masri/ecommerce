import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { useLocation, useNavigate } from 'react-router-dom'
import { listMyOrders } from '../actions/orderActions'
import { LinkContainer } from 'react-router-bootstrap'

const ProfileScreen = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy


    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!userInfo.name) {
                dispatch(getUserDetails('profile'))

            } else {
                setName(userInfo.name)
                setEmail(userInfo.email)
            }
            dispatch(listMyOrders())
        }
    }, [dispatch, userInfo, user])


    const SubmitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmpassword) {
            setMessage('Passwords do not martch ')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))


        }


    }
    return <Row>
        <Col md={3}></Col>
        <h2> Profil de l'utilisateur </h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'> mis à jour Profil</Message>}
        {loading && <Loader />}
        <Form onSubmit={SubmitHandler}>

            <Form.Group controlId='name'>
                <Form.Label>Nom</Form.Label>
                <Form.Control type='name' placeholder='votre nom' value={name}
                    onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>


            <Form.Group controlId='email'>
                <Form.Label>Adresse Email</Form.Label>
                <Form.Control type='email' placeholder='Entrez email' value={email}
                    onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label> Mot de passe  </Form.Label>
                <Form.Control type='password' placeholder='Entrer le mot de passe' value={password}
                    onChange={(e) => setpassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirmez le mot de passe </Form.Label>
                <Form.Control type='password' placeholder='Confirmez le mot de passe' value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Mise à jour

            </Button>
        </Form>
        <Col md={9}>
            <h2>Mes commandes</h2>
            {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>
                {errorOrders}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>LIVRÉ</th>
                            <th></th>
                        </tr>

                    </thead>
                    <tbody>
                        {orders.map((order, i) => (
                            <tr key={order._id}>
                                <td>{i + 1}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{Math.round(order.someOfProducts)}</td>
                                <td>{order.isDelivered ? (
                                    order.deliveredAt.substring(0, 10)) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className='btn-sm' variant='light'>Details</Button>
                                    </LinkContainer>
                                </td>



                            </tr>
                        ))}

                    </tbody>
                </Table>
            )
            }
        </Col>

    </Row>
}

export default ProfileScreen
