import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productsActions';
import { useNavigate, useParams } from 'react-router-dom';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';


const ProductEditScreen = () => {
    const params = useParams()
    const productId = params.id;
    console.log('params.id');
    const navigate = useNavigate();

    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [image, setImage] = useState();
    const [brand, setBrand] = useState();
    const [category, setCategory] = useState();
    const [countInStock, setCountInStock] = useState();
    const [description, setDescription] = useState();
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    console.log(productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = productUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            navigate('/admin/productlist');
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId));
            } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            }
        }
    }, [dispatch, productId, product, successUpdate, navigate]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        console.log(file);
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
            const { data } = await axios.post('/api/upload', formData, config);
            setImage(data);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateProduct({
                _id: productId,
                name,
                prix: price,
                image,
                brand,
                category,
                description,
                countInStock,
            })
        );
    };

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Retourner
            </Link>
            <FormContainer>
                <h1>Modifier le produit</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Entrez votre nom'
                                value={name}
                                onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>


                        <Form.Group controlId='prix'>
                            <Form.Label>Prix </Form.Label>
                            <Form.Control type='number' placeholder='Entrez prix'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}>

                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image </Form.Label>
                            <Form.Control type='text' placeholder='Entrez image url'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}>

                            </Form.Control>
                            <Form.Control
                                type='file'
                                controlId='image-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandler}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label>Marque</Form.Label>
                            <Form.Control type='text' placeholder='Entrez la marque'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}>

                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock'>
                            <Form.Label>compter en stock </Form.Label>
                            <Form.Control type='number' placeholder='Entrez le nombre En stock'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}>

                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>Catégorie </Form.Label>
                            <Form.Control type='text' placeholder='Entrez Catégorie'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}>

                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Description </Form.Label>
                            <Form.Control type='text' placeholder='Entrez description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}>

                            </Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>

                            Mise à jour
                        </Button>
                    </Form>

                )}

            </FormContainer>
        </>

    )
}

export default ProductEditScreen
