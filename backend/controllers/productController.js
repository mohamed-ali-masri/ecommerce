import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc... Fetch all products 
// @route ... GET / api/products
// @access...public 

const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: "(?i).*" + req.query.keyword + ".*"
            },
        }
        : {}

    const count = await Product.count({ ...keyword })
    const products = await Product.find({ ...keyword })
        .sort({ createdAt: -1 })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
    res.json({ products, page, pages: Math.ceil(count / pageSize) })

})

const getProductById = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Produit non trouvé')
    }


    res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @desc... Delete a product
// @route ... DELETE / api/products/products/:id
// @access...Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        await product.remove()
        res.json({ message: 'Produit supprimé' })
    } else {
        res.status(404)
        throw new Error('Produit non trouvés')
    }

})

// @desc... Create a product
// @route ... POST / api/products
// @access...Private/Admin

const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'sample name',
        prix: 0,
        user: req.user._id,
        image: '/image/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'

    })

    const createProduct = await product.save()
    res.status(201).json(createProduct)



})

// @desc... Update a product
// @route ... PUT / api/products/:id
// @access...Private/Admin

const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        prix,
        description,
        image,
        brand,
        category,
        countInStock,
    } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        const updateProduct = await product.update({
            name: name,
            prix: prix,
            description: description,
            image: image,
            brand: brand,
            category: category,
            countInStock: countInStock
        })
        res.json(updateProduct)
    } else {
        res.status(404)
        throw new Error('Produit non trouvé')
    }



})

// @desc... Create new review
// @route ... POST / api/products/:id/reviews
// @access...Private

const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.
            user._id.toString())

        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Produit déjà évalué')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        product.reviews.push(review)

        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0)
            / product.reviews.length

        await product.save()
        res.status(201).json({
            message: 'Avis ajouté'
        })

    } else {
        res.status(404)
        throw new Error('Produit non trouvé')
    }



})

// @desc... Get top rated products
// @route ... GET / api/products/top
// @access...Public

const getTopProducts = asyncHandler(async (req, res) => {
    console.log('getTopProducts');
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)
    console.log(products);

    res.json(products)
})

export { getProducts, getProductById, deleteProduct, updateProduct, createProduct, createProductReview, getTopProducts }