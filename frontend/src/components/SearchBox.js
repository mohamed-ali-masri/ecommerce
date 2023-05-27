import { set } from 'mongoose'
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
const SearchBox = () => {
    const navigate = useNavigate();
    const [Keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (Keyword.trim()) {
            navigate(`/search/${Keyword}`)
        } else {
            navigate('/')
        }
    }
    return (
        <Form onSubmit={submitHandler} className='d-flex ' inline>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Recherche de produits...'
                className='mr-sm-2 ml-sm-5'></Form.Control>
            <Button type='submit' variant='outline-success' className='p-2'>
                Recherche
            </Button>
        </Form>

    )
}

export default SearchBox
