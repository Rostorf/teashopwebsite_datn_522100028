import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'
import crypto from 'crypto';
import qs from 'qs';
import moment from 'moment';

//Utils
function calsPrices(orderItems) {
    const itemsPrice = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)

    const shippingPrice = itemsPrice > 300000 ? 30000 : 0;

    const totalPrice = itemsPrice + shippingPrice

    return {
        itemsPrice,
        shippingPrice,
        totalPrice,
    }
}
function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

const createOrder = async(req, res) => {
    try {
        const {orderItems, shippingAddress, paymentMethod} = req.body;
        if (orderItems && orderItems.length === 0) {
            res.status(400)
            throw new Error('Không có sản phẩm thanh toán')
        }

        const itemsFromDB = await Product.find({
            _id: {$in: orderItems.map((x) => x._id)}
        })

        const dbOrderItems = orderItems.map((itemFromClient) => {
            const matchingItemFromDB = itemsFromDB.find((itemFromDB) => itemFromDB._id.toString() === itemFromClient._id)

            if(!matchingItemFromDB) {
                res.status(404)
                throw new Error(`Không tìm thấy sản phẩm: ${itemFromClient._id}`)
            }

            return {
                ...itemFromClient,
                product: itemFromClient._id,
                price: matchingItemFromDB.price,
                _id: undefined
            };
        });

        const {itemsPrice, shippingPrice, totalPrice} = calsPrices(dbOrderItems)

        const order = new Order({
            orderItems: dbOrderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice
        })

        const createdOrder = await order.save()
        res.status(201).json(createdOrder);

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getAllOrders = async(req, res) => {
    try {
        const orders = await Order.find({}).populate('user', "id username")
        res.json(orders)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getUserOrders = async(req, res) => {
    try {
        const orders = await Order.find({user: req.user._id})
        res.json(orders)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const countTotalOrders = async(req, res) => {
    try {
        const totalOrders = await Order.countDocuments()
        res.json({totalOrders})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const calculateTotalSales = async(req, res) => {
    try {
        const orders = await Order.find()
        const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
        res.json({totalSales})
    } catch (error) {
        res.status(500).json({error: error.message })
    }
}

const calculateTotalSalesByDate = async(req, res) => {
    try {
        const salesByDate = await Order.aggregate([
            {
                $match: {
                    isPaid: true,
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: {format: '%d-%m-%Y', date: '$paidAt'},
                    },
                    totalSales: {$sum: "$totalPrice"},
                },
            },
        ]);

        res.json(salesByDate)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const findOrderById = async(req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "username email")

        if (order) {
            res.json(order)
        } else {
            res.status(404)
            throw new Error("Không tìm thấy đơn hàng")
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const markOrderAsPaid = async(req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if(order) {
            order.isPaid = true;
            order.paidAt = Date.now()
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address
            }

            const updateOrder = await order.save()
            res.status(200).json(updateOrder)
        } else {
            res.status(404)
            throw new Error('Không tìm thấy đơn hàng')
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const markOrderAsDelivered = async(req, res) => {
    try {
        const order = await Order.findById(req.params.id)

        if(order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now()

            const updatedOrder = await order.save()
            res.json(updatedOrder)
        } else {
            res.status(404)
            throw new Error("Không tìm thấy đơn hàng")
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const createVnpayUrl = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);

        if (!order) {
            res.status(404);
            throw new Error('Order not found');
        }

        process.env.TZ = 'Asia/Ho_Chi_Minh';
        let date = new Date();
        let createDate = moment(date).format('YYYYMMDDHHmmss');

        let ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        let tmnCode = process.env.VNP_TMNCODE;
        let secretKey = process.env.VNP_HASHSECRET;
        let vnpUrl = process.env.VNP_URL;
        // Append orderId so the frontend knows which order to verify upon return
        let returnUrl = `${process.env.VNP_RETURNURL}${orderId}?vnp_Return=true`;

        // Amount must be multiplied by 100 per VNPAY docs (convert standard currency to smallest unit)
        // Assuming your order.totalPrice is in VND
        let amount = order.totalPrice * 100;
        let bankCode = ''; 
        let locale = 'vn';

        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = 'VND';
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if (bankCode) {
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);

        let signData = qs.stringify(vnp_Params, { encode: false });
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + qs.stringify(vnp_Params, { encode: false });

        res.status(200).json({ paymentUrl: vnpUrl });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const verifyVnpayReturn = async (req, res) => {
    let vnp_Params = req.query;
    let secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];
    delete vnp_Params['vnp_Return'];
    
    vnp_Params = sortObject(vnp_Params);
    
    let secretKey = process.env.VNP_HASHSECRET;
    let signData = qs.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");

    if (secureHash === signed) {
        const orderId = vnp_Params['vnp_TxnRef'];
        const rspCode = vnp_Params['vnp_ResponseCode'];
        
        // Response Code 00 means Success
        if(rspCode === '00') {
            const order = await Order.findById(orderId);
            if (order && !order.isPaid) {
                order.isPaid = true;
                order.paidAt = Date.now();
                order.paymentResult = {
                    id: vnp_Params['vnp_TransactionNo'],
                    status: 'COMPLETED',
                    update_time: Date.now(),
                    email_address: req.user ? req.user.email : 'N/A', // If token is available
                };
                await order.save();
                return res.status(200).json({ message: 'Payment verified and updated', code: '00' });
            }
            return res.status(200).json({ message: 'Order already paid', code: '00' });
        }
        res.status(400).json({ message: 'Payment failed at gateway', code: rspCode });
    } else {
        res.status(400).json({ message: 'Invalid signature', code: '97' });
    }
};

export { createOrder, getAllOrders, getUserOrders, countTotalOrders, calculateTotalSales, calculateTotalSalesByDate, findOrderById, markOrderAsPaid, markOrderAsDelivered, createVnpayUrl, verifyVnpayReturn }