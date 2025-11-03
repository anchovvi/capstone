import React, { useState } from "react";
import { StyledRightSection, StyledInvenButtonContainer, StyledPopUp, StyledPopUpInner, StyledB, StyledH1, StyledP, StyledCancelButton, StyledConfirmButton  } from "../styles/InvenRightCSS.js";
import { StyledA, StyledButtonMerged, StyledRightButton } from "../styles/PosRightCSS.js";
import Button from "../ui/Button.js";
import axios from "axios";

function InvenRight({ addItemToInventory }) {

    const [popup, setPopup] = useState({ visible: false, item: '', quantity: 1 });

    // 팝업창 보여주는 함수 
    const showPopup = (item) => {
        setPopup({ visible: true, item, quantity: 1 });
    };

    // 취소 버튼 
    const hidePopup = () => {
        setPopup({ visible: false, item: '', quantity: 1 });
    };

    // 재고 수량 증가 함수 
    const increaseQuantity = () => {
        setPopup((prevPopup) => ({ ...prevPopup, quantity: prevPopup.quantity + 1 }));
    };

    // 재고 수량 감소 함수 
    const decreaseQuantity = () => {
        setPopup((prevPopup) => ({ ...prevPopup, quantity: Math.max(1, prevPopup.quantity - 1) }));
    };

    // 확인 버튼 함수 누르면 db에 저장하기
    const handleConfirm = () => {
        axios.post("/inventory/save", {
            idinventory: popup.item,
            quantity: popup.quantity
        })
        .then(response => {
            console.log("왼쪽 재고 화면에 등록하는 로직 구현", response.data);
            addItemToInventory(popup.item, popup.quantity);
            hidePopup(); // 팝업 숨기기
            window.location.reload(); // 화면 새로고침
        })
        .catch(error => {
            console.error("Error adding item to inventory:", error);
        });
    };

    return (

        <StyledRightSection class="right-section">
            <StyledInvenButtonContainer class="button-container">

                <StyledRightButton class="rightbutton">종류</StyledRightButton>
                <StyledRightButton class="rightbutton"> </StyledRightButton>
                <StyledRightButton class="rightbutton"> </StyledRightButton>
                <StyledRightButton class="rightbutton"> </StyledRightButton>
                <StyledRightButton class="rightbutton"> </StyledRightButton>
                
                <Button/>
                
                <StyledRightButton class="button" onClick={() => showPopup('원두')}>원두</StyledRightButton>
                <StyledRightButton class="button" onClick={() => showPopup('바닐라')}>바닐라</StyledRightButton>
                <StyledRightButton class="button" onClick={() => showPopup('연유')}>연유</StyledRightButton>
                <StyledRightButton class="button" onClick={() => showPopup('초코시럽')}>초코시럽</StyledRightButton>
                <StyledRightButton class="button" onClick={() => showPopup('우유')}>우유</StyledRightButton>

                <StyledRightButton class="button" onClick={() => showPopup('녹차')}>녹차</StyledRightButton>
                <StyledRightButton class="button" onClick={() => showPopup('딸기')}>딸기</StyledRightButton>
                <StyledRightButton class="button" onClick={() => showPopup('헤이즐넛')}>헤이즐넛</StyledRightButton>
                <StyledRightButton class="button" onClick={() => showPopup('아이스크림')}>아이스크림</StyledRightButton>
                <StyledRightButton class="button" onClick={() => showPopup('콜드브루')}>콜드브루</StyledRightButton>

                <StyledRightButton class="button" onClick={() => showPopup('유자')}>유자</StyledRightButton>
                <StyledRightButton class="button" onClick={() => showPopup('설탕시럽')}>설탕시럽</StyledRightButton>
                <StyledRightButton class="button"> </StyledRightButton>
                <StyledRightButton class="button"> </StyledRightButton>
                <StyledRightButton class="button"> </StyledRightButton>


                <Button/>
                
                <StyledButtonMerged class="button merged">
                    <StyledA href="/">
                        이전
                    </StyledA>
                </StyledButtonMerged>
                <StyledRightButton class="rightbutton"> </StyledRightButton>
                <StyledRightButton class="rightbutton"> </StyledRightButton>
                <StyledRightButton class="rightbutton">
                    <StyledA href="/close">
                        마감
                    </StyledA>
                </StyledRightButton>

                <Button/>

            </StyledInvenButtonContainer>

            {popup.visible && (
                <StyledPopUp className="popup">
                    <StyledPopUpInner className="popup-inner">
                        <StyledH1>{popup.item}</StyledH1>
                        
                        <StyledP>
                            <StyledB onClick={decreaseQuantity}>{"<"}</StyledB>
                            &nbsp;{popup.quantity}&nbsp;
                            <StyledB onClick={increaseQuantity}>{">"}</StyledB>
                        </StyledP>

                        <StyledCancelButton onClick={hidePopup}>취소</StyledCancelButton>
                        <StyledConfirmButton onClick={handleConfirm}>확인</StyledConfirmButton>
                    </StyledPopUpInner>
                </StyledPopUp>
            )}
        </StyledRightSection>
    );
}

export default InvenRight;