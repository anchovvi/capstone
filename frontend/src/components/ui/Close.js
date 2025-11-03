import React, { useEffect, useState } from "react";
import {
    StyledBottomButtons,
    StyledLeftButtons,
    StyledLeftButton
} from "../styles/ServiceLeftCSS";
import { StyledA } from "../styles/PosRightCSS";
import { DLreceiptContent, ReceiptTable, ReceiptRow, ReceiptHeader, ReceiptCell } from "../styles/CloseCSS";

function Close({ inventoryItems }) {

    // 현재 날짜 가져오기
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줌
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}년 ${month}월 ${day}일`;

    const [totalSales, setTotalSales] = useState(0); // 총 매출액
    const [totalCashSales, setTotalCashSales] = useState(0); // 현금 
    const [totalCardSales, setTotalCardSales] = useState(0); // 신용카드

    // 총 매출액 API 
    useEffect(() => {
        const fetchTotalSales = async () => {
          try {
            const response = await fetch('/close/totalPrice'); 
            const data = await response.json();
            setTotalSales(data.totalPrice);
          } catch (error) {
            console.error('총 매출액을 불러오는 중 오류 발생:', error);
          }
        };
        fetchTotalSales();
      }, []);

    // 현금 매출액 API 
    useEffect(() => {
        const fetchTotalCashSales = async () => {
          try {
            const response = await fetch('/close/totalCashPrice'); 
            const data = await response.json();
            setTotalCashSales(data.totalPrice);
          } catch (error) {
            console.error('총 매출액을 불러오는 중 오류 발생:', error);
          }
        };
        fetchTotalCashSales();
    }, []);

    // 신용카드 매출액 API 
    useEffect(() => {
        const fetchTotalCardSales = async () => {
          try {
            const response = await fetch('/close/totalCardPrice'); 
            const data = await response.json();
            setTotalCardSales(data.totalPrice);
          } catch (error) {
            console.error('총 매출액을 불러오는 중 오류 발생:', error);
          }
        };
        fetchTotalCardSales();
    }, []);

    // 인쇄 함수
    const handlePrint = () => {
        window.print(); // 인쇄 대화 상자 열기
    };

    return (
        <DLreceiptContent>
            <ReceiptTable>
                <ReceiptHeader>
                    <tr>
                        <th colSpan="3">■ 영 업 마 감 내 역 ■</th>
                    </tr>
                </ReceiptHeader>

                <tbody>
                    <ReceiptRow>
                        <ReceiptCell>영업 일자</ReceiptCell>
                        <ReceiptCell></ReceiptCell>
                        <ReceiptCell>{formattedDate}</ReceiptCell>
                    </ReceiptRow>
                    <ReceiptRow>
                        <ReceiptCell>매장명</ReceiptCell>
                        <ReceiptCell></ReceiptCell>
                        <ReceiptCell>아신홀딩스(동의대점)</ReceiptCell>
                    </ReceiptRow>
                    <ReceiptRow>
                        <ReceiptCell>POS 번호</ReceiptCell>
                        <ReceiptCell></ReceiptCell>
                        <ReceiptCell>01</ReceiptCell>
                    </ReceiptRow>
                    <ReceiptRow>
                        <ReceiptCell>담당자</ReceiptCell>
                        <ReceiptCell></ReceiptCell>
                        <ReceiptCell>아신홀딩스</ReceiptCell>
                    </ReceiptRow>
                </tbody>

                <ReceiptHeader>
                    <tr>
                        <th colSpan="3">마감 요약 내역</th>
                    </tr>
                </ReceiptHeader>

                <tbody>
                    <ReceiptRow>
                        <ReceiptCell>총 매출액</ReceiptCell>
                        <ReceiptCell></ReceiptCell>
                        <ReceiptCell>{Number(totalSales).toLocaleString()}원</ReceiptCell>
                    </ReceiptRow>

                    <ReceiptRow>
                        <ReceiptCell>현금</ReceiptCell>
                        <ReceiptCell></ReceiptCell>
                        <ReceiptCell>{Number(totalCashSales).toLocaleString()}원</ReceiptCell>
                    </ReceiptRow>

                    <ReceiptRow>
                        <ReceiptCell>신용카드</ReceiptCell>
                        <ReceiptCell></ReceiptCell>
                        <ReceiptCell>{Number(totalCardSales).toLocaleString()}원</ReceiptCell>
                    </ReceiptRow>
                </tbody>

                <ReceiptHeader>
                    <tr>
                        <th colSpan="3">재고 내역</th>
                    </tr>
                </ReceiptHeader>

                <tbody>
                    {inventoryItems.map(item => (
                    <ReceiptRow key={item.idinventory}>
                        <ReceiptCell>{item.idinventory}({item.daysLeft}일)</ReceiptCell>
                        <ReceiptCell></ReceiptCell>
                        <ReceiptCell>{item.quantity}개</ReceiptCell>
                    </ReceiptRow>
                ))}
                </tbody>
            </ReceiptTable>

            <StyledBottomButtons class="bottom-buttons">
                    <StyledLeftButtons class="left-buttons">
                        <StyledLeftButton><StyledA href="/">이전</StyledA></StyledLeftButton>
                        <StyledLeftButton onClick={handlePrint}>인쇄</StyledLeftButton>
                    </StyledLeftButtons>
            </StyledBottomButtons>
            
        </DLreceiptContent>
    );
}

export default Close;
