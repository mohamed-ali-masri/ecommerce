import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts, deleteProduct, createProduct } from '../actions/productsActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import Paginate from '../components/Paginate';

const ProductListScreen = (props) => {
    const pageNumber = props?.match?.params?.pageNumber || 1;

    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error, products = [], page, pages } = productList;

    const productdelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete,
        error: errorDelete,
        success: successDelete, } = productdelete;

    const productCreate = useSelector(state => state.productCreate);
    const { loading: loadingCreate,
        error: errorCreate,
        success: successCreate, product: createdProduct } = productCreate;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET });
        if (!userInfo.isAdmin) {
            props.history.push('/login');
        } else {
            dispatch(listProducts('', pageNumber));
        }
    }, [dispatch, userInfo, successDelete, successCreate, createdProduct, pageNumber, props.history]);

    const deleteHandler = (id) => {
        if (window.confirm('Es-tu sûr')) {
            dispatch(deleteProduct(id));
        }
    };

    const createProductHandler = () => {
        dispatch(createProduct());
    };

    return (
        <>
            <Row className='text-right'>
                <Button className='my-3' onClick={createProductHandler}>
                    <i className='fas fa-plus'></i> créer un produit
                </Button>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                : (
                    <>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nom</th>
                                    <th>PRIX</th>
                                    <th>CATEGORIE</th>
                                    <th>MARQUE</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products && products.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>

                                        <td>{product.prix} DT</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>

                                        <td>
                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button variant='danger' className='btn-sm'
                                                onClick={() =>
                                                    deleteHandler(product._id)}>
                                                <i className='fas fa-trash'></i>

                                            </Button>
                                        </td>
                                    </tr>


                                ))}
                            </tbody>
                        </Table>
                        <Paginate pages={pages} page={page} isAdmin={true} />
                    </>
                )}

        </>
    )
}

export default ProductListScreen
