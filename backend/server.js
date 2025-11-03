// server.js

require('dotenv').config();
const express = require('express');
const dbConnect = require('./config/dbConnect');
const cors = require('cors');
const path = require('path');


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


// --- React 정적 파일 제공 ---
app.use(express.static(path.join(__dirname, "../frontend/build")));

// --- SPA 라우팅 처리 (React Router 대응) ---
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

app.listen(8080, '0.0.0.0',() => {		// 8080번 포트로 서버 실행
    console.log("서버 실행")
});