import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions';
import { useLocation, useNavigate } from 'react-router-dom';


const RegisterScreen = () => {
    let location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search && location.search.split('=')[1] !== '/' ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect])


    const SubmitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmpassword) {
            setMessage('Les mots de passe ne correspondent pas')
        } else {

            dispatch(register(name, email, password))
        }


    }
    return (
        <FormContainer>
            <h1>S'inscrire </h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={SubmitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>Nom</Form.Label>
                    <Form.Control type='name' placeholder='votre nom ' value={name}
                        onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>


                <Form.Group controlId='email'>
                    <Form.Label>Adresse Email</Form.Label>
                    <Form.Control type='email' placeholder='Enterz email' value={email}
                        required onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Mot de passe </Form.Label>
                    <Form.Control type='password' placeholder='Entrez Mot de passe ' value={password}
                        required onChange={(e) => setpassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>
                        Confirmez le mot de passe </Form.Label>
                    <Form.Control type='password' placeholder='Confirmez le mot de passe' value={confirmpassword}
                        required onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type='submit' className='my-2' variant='primary'>
                    Enregistrer
                </Button>
            </Form>

            <Row>

                <Col>

                    Avoir un compte ?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Connexion
                    </Link>
                </Col>

            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
