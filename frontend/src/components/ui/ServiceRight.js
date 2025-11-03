// ./ServiceRight.js

import React, { useEffect, useState } from "react";
import { Div, StyledArrowButton, StyledArrowButtons, StyledDoubleArrowButton, StyledRSection, StyledRhButton, StyledRightButton, StyledRightButtons, StyledRightHeader, StyledTable, StyledTd, StyledTh, Tr } from "../styles/ServiceRightCSS";
import { StyledBottomButtons, StyledConditionInput, StyledFormGroup, StyledInput, StyledLabel, StyledPopUpClose, StyledPopUpHeader } from "../styles/ServiceLeftCSS";
import Receipt from "./Receipt";
import axios from "axios";

// Receipt 컴포넌트를 HTML 문자열로 변환
// const receiptHTML = ReactDOMServer.renderToStaticMarkup(<Receipt />);

function ServiceRight() {
    const [receipts, setReceipts] = useState([]); // 영수증 데이터를 상태로 관리
    const [selectedReceipt, setSelectedReceipt] = useState(null); // 영수증 상세 조회 
    const [showPopup, setShowPopup] = useState(false); // 팝업 표시 상태를 관리하는 useState 훅


    // 컴포넌트가 마운트될 때 영수증 데이터를 가져옴
    useEffect(() => {
        fetchReceipts();
    }, []);

    // API 호출하여 영수증 데이터를 가져오는 함수
    const fetchReceipts = async () => {
        try {
        const response = await axios.get("/order/show"); // 영수증 조회 API 호출
        setReceipts(response.data); // 가져온 데이터를 상태에 저장
        } catch (error) {
        console.error("영수증 데이터를 가져오는 중 오류 발생:", error);
        }
    };


    
    // 테이블 행 클릭 시 팝업을 표시하고 선택한 영수증 데이터를 설정하는 함수
    const handleRowClick = async (idorder) => {
        console.log("클릭 이벤트 발생:", idorder);
        try {
            const response = await axios.get(`/order/receipt?idorder=${idorder}`);
            console.log("응답 데이터:", response.data);
            setSelectedReceipt(response.data);
            setShowPopup(true);
        } catch (error) {
            console.error("상세 영수증 데이터 가져오는 중 오류 발생:", error);
        }
    };

    return (
    <>
      <StyledRSection class="right-section">
        <Div>
            <StyledRightHeader class="right-header">
                <StyledRhButton>등록 취소 조회</StyledRhButton>
            </StyledRightHeader>

            <StyledFormGroup class="form-group">
                    <StyledLabel for="search-number">조회 번호</StyledLabel>
                    <StyledInput type="text" id="search-number"/>
            </StyledFormGroup>

            <Div className="table-container">
            <StyledTable>
              <thead>
                <Tr>
                  <StyledTh>NO</StyledTh>
                  <StyledTh>POS</StyledTh>
                  <StyledTh>거래 시간</StyledTh>
                  <StyledTh>거래 형태</StyledTh>
                  <StyledTh>금액</StyledTh>
                </Tr>
              </thead>
              <tbody>
                {receipts.map((receipt, index) => (
                  <Tr key={index} onClick={() => handleRowClick(receipt.idorder)}>
                    <StyledTd>{receipt.idorder}</StyledTd>
                    <StyledTd>01</StyledTd>
                    <StyledTd>{new Date(receipt.date).toLocaleString()}</StyledTd>
                    <StyledTd>{receipt.transactionType}</StyledTd>
                    <StyledTd>{receipt.totalPrice.toLocaleString()} 원</StyledTd>
                  </Tr>
                ))}
              </tbody>
            </StyledTable>

            <StyledArrowButtons className="arrow-buttons">
              <StyledDoubleArrowButton className="double">≪</StyledDoubleArrowButton>
              <StyledArrowButton>{"<"}</StyledArrowButton>
              <StyledArrowButton>{">"}</StyledArrowButton>
              <StyledDoubleArrowButton className="double">≫</StyledDoubleArrowButton>
            </StyledArrowButtons>
          </Div>
          <p>
            ※조회번호에 해당 라인을 입력 후 [반복/입력]키를 누르거나 화면에서 해당
            항목을 선택하시면 왼쪽에 선택된 영수증 팝업이 보여집니다.
          </p>
        </Div>

        <StyledBottomButtons className="bottom-buttons" style={{ display: "flex", justifyContent: "flex-end" }}>
          <StyledRightButtons className="right-buttons">
            <StyledRightButton style={{ background: "red" }}>환불</StyledRightButton>
            <StyledRightButton>인쇄</StyledRightButton>
          </StyledRightButtons>
        </StyledBottomButtons>

      </StyledRSection>

      {showPopup && (
        <div id="popup" class="popup">
            <StyledPopUpHeader class="popup-header">
                <span>영수증</span>
                <StyledPopUpClose class="popup-close" onClick={() => setShowPopup(false)}>×</StyledPopUpClose>
            </StyledPopUpHeader>

            {/* 영수증 팝업 */}
            <Receipt receiptData={selectedReceipt}/>

            <Div style={{textAlign: 'right', marginTop: '20px'}}>
                <StyledConditionInput id="condition-input">조건 입력</StyledConditionInput>
            </Div>
        </div>
      )}
    </>
    );
}

export default ServiceRight;
