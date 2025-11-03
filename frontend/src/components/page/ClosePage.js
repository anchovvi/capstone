// ./ClosePage.js

import React, { useState, useEffect } from "react";
import { StyledBody, StyledH1, StyledHeader } from "../styles/HeaderCSS";
import Close from "../ui/Close";
import axios from "axios";

function ClosePage() {
  // 재고 변수 
  const [inventoryItems, setInventoryItems] = useState([]);

  // 초기 재고 데이터를 불러오는 함수
  useEffect(() => {
      const fetchInventory = async () => {
          try {
              const response = await axios.get('/inventory/show');
              setInventoryItems(response.data);
          } catch (error) {
              console.error('Error fetching inventory:', error);
          }
      };

      fetchInventory();
  }, []);

  // 유통기한 계산 함수
  const calculateDaysLeft = (dateAdded) => {
    const productionDate = new Date(dateAdded);
    const expirationDate = new Date(productionDate);
    expirationDate.setMonth(productionDate.getMonth() + 1); // 1개월 유통기한
    const today = new Date();
    const timeDiff = expirationDate - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysLeft >= 0 ? daysLeft : 0;
};

// 각 아이템에 유통기한 정보 추가
const updatedInventoryItems = inventoryItems.map(item => ({
    ...item,
    daysLeft: calculateDaysLeft(item.dateAdded)
}));

    return (
      <StyledBody>
        <StyledHeader class="header">
          <StyledH1>마감영수증</StyledH1>
        </StyledHeader>

        <Close inventoryItems={updatedInventoryItems} />

        
      </StyledBody>
    );
}

export default ClosePage;
