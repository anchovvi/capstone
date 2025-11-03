// server.js

const express = require('express');
const dbConnect = require('./config/dbConnect');
const cors = require('cors');

const app = express();
dbConnect();

app.use(express.json());

app.use(cors({
    origin: ['http://localhost:3000', 'http://192.168.35.249:3000'],
    credentials: true,
}));

// 포스기 
app.use("/pos", require("./routes/posRoute"));

// 재고 
app.use("/inventory", require("./routes/invenRoute"));

// 주문 내역
app.use("/order", require("./routes/orderRoute"));

// 마감
app.use("/close", require("./routes/closeRoute"));

app.listen(8080, '0.0.0.0',() => {		// 8080번 포트로 서버 실행
    console.log("서버 실행")
});