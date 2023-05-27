import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'
import { useNavigate } from "react-router-dom";

const PaymentScreen = () => {
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        navigate('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState()


    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        console.log(paymentMethod)
        navigate('/placeorder')
    }


    return <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>mode de paiement</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Sélectionnez la méthode</Form.Label>
                <Col>
                    <Form.Check
                        type='radio'
                        label='D17 or Credit card'
                        id='D17'
                        name='PaymentMethod'
                        value='D17'
                        checked onChange={(e) =>
                            setPaymentMethod(e.target.value)}></Form.Check>

                    <Form.Check
                        type='radio'
                        label='Stripe'
                        id='Stripe'
                        name='PaymentMethod'
                        value='Stripe'
                        onChange={(e) =>
                            setPaymentMethod(e.target.value)}></Form.Check>

                </Col>
            </Form.Group>


            <Button type='submit' varianr='primary'>
                Continue </Button>
        </Form>
    </FormContainer>
}
export default PaymentScreen
