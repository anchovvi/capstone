import React, { useEffect, useState } from "react";
import Header from "../ui/Header";
import { StyledBody } from "../styles/HeaderCSS";
import { StyledContainer } from "../styles/PosLeftCSS";
import InvenLeft from "../ui/InvenLeft";
import InvenRight from "../ui/InvenRight";
import axios from "axios";

function InventoryPage() {
    // 재고 추가 변수
    const [inventoryItems, setInventoryItems] = useState([]);

    // 초기 재고 데이터를 불러오는 함수
    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await axios.get('http://192.168.35.249:8080/inventory/show');
                setInventoryItems(response.data);
            } catch (error) {
                console.error('Error fetching inventory:', error);
            }
        };

        fetchInventory();
    }, []);

    // 재고 추가하는 함수
    const addItemToInventory = (item, quantity) => {
        setInventoryItems(prevItems => [
            ...prevItems,
            { item, quantity }
        ]);
    };

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
            <Header />
            <StyledContainer className="container">
                <InvenLeft inventoryItems={updatedInventoryItems} />
                <InvenRight addItemToInventory={addItemToInventory} />
            </StyledContainer>
        </StyledBody>
    );
}

export default InventoryPage;
