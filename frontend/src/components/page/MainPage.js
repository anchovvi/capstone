import React, { useState } from "react";
import axios from "axios";
import Header from "../ui/Header";
import { StyledBody } from "../styles/HeaderCSS";
import { StyledContainer } from "../styles/PosLeftCSS";
import PosLeft from "../ui/PosLeft";
import PosRight from "../ui/PosRight";
import { StyledCancelButton, StyledConfirmButton, StyledH1, StyledP, StyledPopUp, StyledPopUpInner } from "../styles/InvenRightCSS";
import { StyledA } from "../styles/PosRightCSS";

function MainPage() {
    const [orders, setOrders] = useState([]); // 메뉴 클릭 시 주문표에 추가되는 기능 
    const [receivedAmount, setReceivedAmount] = useState(0);  // 받은 금액 상태
    const [stockAlert, setStockAlert] = useState(false);  // 재고 부족 알림 상태

    // 주문표 추가하는 함수
    const addOrder = (item) => {
        setOrders([...orders, item]);
    };

    // 전체 주문 목록을 비우는 함수
    const clearOrders = () => {
        setOrders([]);
    };

    // 선택된 주문 항목을 삭제하는 함수
    const removeSelectedOrder = (selectedOrderIndex) => {
        if (selectedOrderIndex !== null) {
            const updatedOrders = orders.filter((_, index) => index !== selectedOrderIndex);
            setOrders(updatedOrders);
        }
    };

    // 주문 데이터를 백엔드로 전송하는 함수
    const saveOrder = async (transactionType) => { // 거래 형태 매개변수로 추가 
        const totalAmount = calculateTotalPrice();
        const orderData = {
            date: new Date().toISOString().slice(0, 19).replace('T', ' '), // 현재 날짜 및 시간
            totalPrice: totalAmount,
            transactionType, // 거래 형태 
            items: orders.map(order => ({ idmenu: order.name, quantity: 1 })) // 각 아이템 수량 1로 가정
        };

        try {
            const response = await axios.post('/order/save', orderData);
            if (response.data.success) {
                clearOrders(); // 주문 저장 후 주문표 비우기 

                if (response.data.message.includes('재고 부족')) {
                    setStockAlert(true);
                } else {
                    setStockAlert(false);
                }
            } else {
                console.error('주문표 저장 실패:', response.data.message);
            }
        } catch (error) {
            console.error('주문표 저장 에러:', error);
        }
    };

    // 현금 버튼 클릭 시 실행되는 함수 
    const handleCashButtonClick = () => {
        const totalAmount = calculateTotalPrice();
        setReceivedAmount(totalAmount);
        saveOrder("현금");
    };

    // 신용카드 버튼 클릭 시 실행되는 함수 
    const handleCreditCardButtonClick = () => {
        const totalAmount = calculateTotalPrice();
        setReceivedAmount(totalAmount);
        saveOrder("신용카드");
    };

    // 총합 계산 
    const calculateTotalPrice = () => {
        let totalPrice = 0;
        orders.forEach(order => {
            totalPrice += order.price;
        });
        return totalPrice;
    };

    // 팝업 닫기 함수 
    const handleClosePopup = () => {
        setStockAlert(false);
    };

    return (
      <StyledBody>
        <Header/>
        <StyledContainer className="container">
            <PosLeft 
              orders={orders} 
              clearOrders={clearOrders} 
              removeSelectedOrder={removeSelectedOrder} 
              receivedAmount={receivedAmount}
            />
            <PosRight 
              addOrder={addOrder} 
              handleCashButtonClick={handleCashButtonClick}
              handleCreditCardButtonClick={handleCreditCardButtonClick}
            />
        </StyledContainer>

        {stockAlert && (
                <StyledPopUp className="popup">
                    <StyledPopUpInner className="popup-inner">
                        <StyledH1>🚨재고 부족🚨</StyledH1>
                        
                        <StyledP>부족한 재고를 확인하세요!</StyledP>

                        <StyledCancelButton onClick={handleClosePopup}>닫기</StyledCancelButton>
                        <StyledConfirmButton><StyledA href="/inventory">확인</StyledA></StyledConfirmButton>
                    </StyledPopUpInner>
                </StyledPopUp>
            )}
      </StyledBody>
    );
}

export default MainPage;
