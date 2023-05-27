import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc... Create new order
// @route ... POST / api/products
// @access...private

const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems,
        shippingAddress,
        paymentMethod,
        nombreOfproducts,
        livraisonPrice,
        someOfProducts,
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('Aucun article de commande')
        return
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            nombreOfproducts,
            livraisonPrice,
            someOfProducts,
        })

        const createOrder = await order.save()

        res.status(201).json(createOrder)

    }


})

// @desc... GET order by ID
// @route ... GET / api/orders/:id
// @access...private

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params?.id).populate('user', 'name email')
    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Commande introuvable')

    }

})

// @desc... Update order to paid
// @route ... GET / api/orders/:id/pay
// @access...private

const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.ispaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updateOrder = await order.save()
        res.json(updateOrder)
    } else {
        res.status(404)
        throw new Error('Commande introuvable')

    }

})

// @desc... Update order to deliverd
// @route ... GET / api/orders/:id/deliver
// @access...private/Admin

const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        const updateOrder = await order.update({
            isDelivered: true,
            deliveredAt: Date.now()
        })
        res.json(updateOrder)
    } else {
        res.status(404)
        throw new Error('Commande introuvable')

    }

})

// @desc... Get logged in user orders
// @route ... GET / api/orders/myorders
// @access...Private

const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)


})

// @desc... Get all orders
// @route ... GET / api/orders
// @access...Private/admin

const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).sort({ createdAt: -1 }).populate('user', 'name email')
    res.json(orders)


})


export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, updateOrderToDelivered, getOrders }

