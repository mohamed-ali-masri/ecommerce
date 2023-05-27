import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'
import { useNavigate } from "react-router-dom";


const ShippingScreen = () => {
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState()
    const [city, setCity] = useState()
    const [codePostal, setCodePostal] = useState()
    const [country, setCountry] = useState()

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, codePostal, country }))
        navigate('/placeorder')
    }


    return <FormContainer>
        <CheckoutSteps step1 step2 step4 />
        <h1>Expédition</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label>Adresse</Form.Label>
                <Form.Control type='text'
                    placeholder='Votre adresse'
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
                <Form.Label>Ville</Form.Label>
                <Form.Control type='text'
                    placeholder='Entrez la ville'
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='codePostal'>
                <Form.Label>Code Postal</Form.Label>
                <Form.Control type='text'
                    placeholder='Entrez le code postal '
                    value={codePostal}
                    required
                    onChange={(e) => setCodePostal(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='country'>
                <Form.Label>Pays</Form.Label>
                <Form.Control type='text'
                    placeholder='Entrez le pays '
                    value={country}
                    required
                    onChange={(e) => setCountry(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type='submit' varianr='primary'> Continuer </Button>
        </Form>
    </FormContainer>
}
export default ShippingScreen
