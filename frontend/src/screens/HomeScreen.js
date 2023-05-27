import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productsActions'
import { Link, useParams } from 'react-router-dom'
import ProductCarousel from '../components/ProductCarousel'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'

const HomeScreen = () => {
  const params = useParams()
  const Keyword = params.Keyword

  const pageNumber = params.pageNumber || 1
  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, error, products, page, pages } = productList
  console.log(products);

  useEffect(() => {
    dispatch(listProducts(Keyword, pageNumber))

  }, [dispatch, Keyword, pageNumber])


  return (
    <>
      <Meta />
      {!Keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-light'>
        Retourner
      </Link>}
      <h1>derniers produits</h1>
      {loading ?
        <Loader />
        : error ?
          <Message variant='danger'> {error} </Message> :
          <>
            <Row>
              {products && products.map((prod) => (
                <Col key={prod._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={prod} />
                </Col>
              ))}
            </Row>
            <Paginate pages={pages} page={page} keyword={Keyword ? Keyword : ''} />
          </>
      }

    </>
  )
}

export default HomeScreen
