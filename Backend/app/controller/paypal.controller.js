const paypal = require("paypal-rest-sdk");
const {
    Payment,
    Users,
    BorardingHouse,
    Bill,
    Receipt,
    PAYMENTHISTORY,
    Positions,
    School,
} = require("../models/index");
exports.hien = (req, res, next) => {
    res.json({ hi: "hello" });
};
// paypal.configure({
//   mode: "sandbox", //sandbox or live
//   client_id:
//     "AV61pygPSNz0SL-_PGwSlcKHW14ovsWLJUP21dQVBDqRm3yylht8urnW8X7vg6BYMF5c5fHIuHmPFR4c",
//   client_secret:
//     "EHwuxQvcmtZ2Q7Tju0OgHLN9x2yQ3NlTcGx4jVdk-KY02WYi2f5OkIRc_5UOyR0cs4wOoZRNKGza2wDZ",
// });
exports.taopaypal = async (req, res, next) => {
    const document = await School.findOne({});
    console.log('dữ liệu nhà trường:', document);
    paypal.configure({
        mode: "sandbox", //sandbox or live
        client_id: document.clientId,
        client_secret: document.secretId,
    });
    const userName = encodeURIComponent(document["userName"]);
    const create_payment_json = {
        intent: "sale",
        payer: {
            payment_method: "paypal",
        },
        redirect_urls: {
            return_url: `http://localhost:3000/api/paypal/success?received=${req.body.total}&_id=${req.body._id}&clientId=${documentPay.clientId}&secretId=${documentPay.secretId}&isSuperAdmin=${isSuperAdmin}&userName=${userName}&phone=${documentUser.phone}`,
            cancel_url: "http://localhost:3000/api/paypal/cancel",
        },
        transactions: [
            {
                item_list: {
                    items: [
                        {
                            name: "Thanh toán hóa đơn tiền học và ăn uống tại trường ",
                            sku: "001",
                            // price: `${req.body.tongtien}`,
                            price: `${req.body.total}`,
                            currency: "USD",
                            quantity: 1,
                        },
                    ],
                },
                amount: {
                    currency: "USD",
                    // total: `${req.body.tongtien}`,
                    total: `${req.body.total}`,
                },
                description: "Thanh toán hóa đơn tiền học và ăn uống tại trường",
            },
        ],
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === "approval_url") {
                    // res.redirect(payment.links[i].href);
                    res.send(payment.links[i].href);
                }
            }
        }
    });
};
exports.thanhcong = (req, res) => {
    paypal.configure({
        mode: "sandbox", //sandbox or live
        // client_id:
        //   "AUx79GN75wtsieggQqfykauj9mYDTmnb9sWjkkx-qCwP1NiaJX59Kg5jypChJ-mxfpT1lfsbnD52ImEI",
        // client_secret:
        //   "EJMEPqAIH2Goh-iXFt79S18RSpvkH6lkNdF4YD9ClBYn7un_TRsn_47ZdybtHPTS9YnT5gpbsb6_E8la",
        client_id: req.query.clientId,
        client_secret: req.query.secretId,
    });
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const content = `${decodeURIComponent(req.query.userName)} - ${req.query.phone
        }`;
    const execute_payment_json = {
        payer_id: payerId,
        transactions: [
            {
                amount: {
                    currency: "USD",
                    total: `${req.query.received}`,
                },
            },
        ],
    };
    paypal.payment.execute(
        paymentId,
        execute_payment_json,

        async (error, payment) => {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                // console.log(JSON.stringify(payment));
                // console.log("---Total:", payment.transactions[0].amount.total);
                // res.send('Success (Mua hàng thành công)');

                // tìm hóa đơn
                // console.log("Thanh toán cho super-admin", req.query.isSuperAdmin);
                if (req.query.isSuperAdmin == "false") {
                    const documentBill = await Bill.findOne({
                        where: { _id: req.query._id },
                    });

                    // cập nhật lại hóa đơn sau khi thanh toán
                    const updateBill = await Bill.update(
                        {
                            debt:
                                Number(documentBill.debt) -
                                Number(payment.transactions[0].amount.total),
                        },
                        { where: { _id: req.query._id } }
                    );
                    //tạo hoặc update
                    const documentReceipt = await Receipt.findOne({
                        where: {
                            billId: req.query._id,
                        },
                    });
                    if (documentReceipt != null) {
                        //update
                        const updateReceipt = await Receipt.update(
                            {
                                receive:
                                    Number(documentReceipt.receive) +
                                    Number(payment.transactions[0].amount.total),
                                debt:
                                    Number(documentReceipt.debt) -
                                    Number(payment.transactions[0].amount.total),
                                content: content,
                            },
                            {
                                where: {
                                    _id: documentReceipt._id,
                                },
                            }
                        );
                    } else {
                        //create
                        const createReceipt = await Receipt.create({
                            receive: payment.transactions[0].amount.total,
                            debt:
                                Number(documentBill.total) -
                                Number(payment.transactions[0].amount.total),
                            billId: req.query._id,
                            content: content,
                        });
                    }
                    const documentPayHistory = await PAYMENTHISTORY.create({
                        money: payment.transactions[0].amount.total,
                        method: "thanh toán PayPal",
                        billId: req.query._id,
                        content: content,
                    });
                    res.writeHead(302, {
                        Location: `http://localhost:3001/billCustomer?status=1`,
                        //add other headers here...
                    });
                } else if (req.query.isSuperAdmin == "true") {
                    // console.log("thanh toán cho super admin, tạo phiếu thu");
                    const createReceipt = await Receipt.update(
                        {
                            receive: payment.transactions[0].amount.total,
                            debt: 0,
                            billUserId: req.query._id,
                            content: content,
                        },
                        {
                            where: {
                                billUserId: req.query._id,
                            },
                        }
                    );
                    res.writeHead(302, {
                        Location: `http://localhost:3001/admin/billLandlord?status=1&billId=${req.query._id}`,
                        //add other headers here...
                    });
                }
            }

            // res.writeHead(302, {
            //   Location: `http://localhost:3001/billCustomer?status=1`,
            //   //add other headers here...
            // });
            res.end();
        }
    );
};
exports.thatbai = (req, res) => {
    res.writeHead(302, {
        Location: "http://localhost:3001/post",
    });
    res.end();
};