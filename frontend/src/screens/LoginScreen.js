import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import { useLocation, useNavigate } from 'react-router-dom';

const LoginScreen = () => {
    let location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')

    const dispatch = useDispatch()


    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = (location?.search && location.search.split('=')[1] !== '/') ? ('/' + location.search.split('=')[1]) : '/'
    console.log('urllll', location?.search);

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect])


    const SubmitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }


    return (
        <FormContainer>
            <h1>S'identifier</h1>

            {error && <Message variant='danger'>{'email ou mot de passe est incorrect'}</Message>}
            {loading && <Loader />}
            <Form onSubmit={SubmitHandler}>

                <Form.Group controlId='email'>


                    <Form.Label>Adresse Email</Form.Label>
                    <Form.Control type='email' placeholder='Entrez email' value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>


                    <Form.Label>Mot de passe </Form.Label>
                    <Form.Control type='password' placeholder='Mot de passe' value={password}
                        required onChange={(e) => setpassword(e.target.value)}></Form.Control>
                </Form.Group>


                <Button type='submit' className='my-2' variant='primary'>
                    Connexion
                </Button>
            </Form>

            <Row>

                <Col>
                    Creer un compte?{' '}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        S'inscrire
                    </Link>
                </Col>

            </Row>
        </FormContainer>
    )
}

export default LoginScreen
