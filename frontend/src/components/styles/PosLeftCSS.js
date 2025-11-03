import styled from "styled-components";

export const StyledContainer = styled.div`
    display: flex;
    height: calc(100% - 50px); /* 화면의 높이에서 헤더의 높이 빼기. */

    @media (max-width: 768px) {
        height: calc(100% - 30px); /* 헤더 높이 조정 */
    }

    @media (min-width: 769px) and (max-width: 1024px) {
        height: calc(100% - 40px); /* 헤더 높이 조정 */
    }
`;

export const StyledLeftHalf = styled.div`
    width: 50%; /* 왼쪽 반절의 너비를 50%로 설정. */
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
    background-color: #f0f0f0;
    display: flex;
    flex-direction: column; 

    @media (max-width: 768px) {
        padding: 10px; /* 패딩 줄이기 */
    }

    @media (min-width: 769px) and (max-width: 1024px) {
        padding: 10px; /* 패딩 조정 */
    }
`;

export const StyledLeftInner = styled.div`
    width: 98%; 
    height: 192px; /* 왼쪽 반절의 40% */
    margin-bottom: 10px; 
    background-color: #ddd;
    padding: 10px;
    position: relative; 
    overflow: auto; /* 내용이 넘칠 경우 스크롤바 표시 */

    @media (max-width: 768px) {
        height: 150px; /* 크기 줄이기 */
        padding: 5px; /* 패딩 줄이기 */
    }

    @media (min-width: 769px) and (max-width: 1024px) {
        height: 180px; /* 크기 조정 */
        padding: 8px; /* 패딩 조정 */
    }
`;

export const StyledTable = styled.table`
    width: 100%;
`;

export const StyledTr = styled.tr`
    font-family: BMJUA;
    font-size: 18px;

    @media (max-width: 768px) {
        font-size: 16px; /* 글자 크기 조정 */
    }

    @media (min-width: 769px) and (max-width: 1024px) {
        font-size: 17px; /* 글자 크기 조정 */
    }
`;

export const StyledTh = styled.th`
    padding: 5px;
    font-family: BMJUA;
    font-size: 18px;
    border-bottom: 1px solid #999;

    @media (max-width: 768px) {
        font-size: 10px; /* 글자 크기 조정 */
        padding: 3px; /* 패딩 줄이기 */
    }

    @media (min-width: 769px) and (max-width: 1024px) {
        font-size: 10px; /* 글자 크기 조정 */
        padding: 4px; /* 패딩 조정 */
    }
`;

export const StyledLeftMiddle = styled.div`
    width: 100%; 
    height: 3%; /* 왼쪽 반절의 3% */
    margin-bottom: 10px; 
    background-color: #ccc;
    border-radius: 5px;

    @media (max-width: 768px) {
        height: 5%; /* 크기 조정 */
    }

    @media (min-width: 769px) and (max-width: 1024px) {
        height: 4%; /* 크기 조정 */
    }
`;

export const StyledLeftThird = styled.div`
    width: 100%; 
    height: 7%; /* 왼쪽 반절의 7% */
    margin-bottom: 10px; 
    background-color: #f0f0f0;
    display: flex; /* 내부 요소들을 가로로 나열하기 위해 추가 */
    justify-content: space-around; /* 가로 정렬 설정 */
    align-items: center; /* 세로 정렬 설정 */

    @media (max-width: 768px) {
        height: 10%; /* 크기 조정 */
    }

    @media (min-width: 769px) and (max-width: 1024px) {
        height: 8%; /* 크기 조정 */
    }
`;

export const StyledButton = styled.button`
    width: calc(20% - 10px); /* 버튼 간격과 여백을 고려하여 설정 */
    height: 50px;
    margin: 5px;
    background-color: #ddd;
    font-family: BMJUA;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease; /* 부드러운 색상 전환 효과 */

    &:hover {
        background-color: #a4a4a4; /* 호버 시 색상 변경 */
    }

    @media (max-width: 768px) {
        font-size: 15px; /* 글자 크기 조정 */
        height: 40px; /* 높이 조정 */
    }

    @media (min-width: 769px) and (max-width: 1024px) {
        font-size: 10px; /* 글자 크기 조정 */
        height: 45px; /* 높이 조정 */
    }

`;

export const StyledLeftFourth = styled.div`
    width: 100%; 
    height: 470px; 
    background-color: #a4a4a4;
    display: flex;
    padding: 2px;

    @media (max-width: 768px) {
        height: 350px; /* 크기 조정 */
    }

    @media (min-width: 769px) and (max-width: 1024px) {
        height: 400px; /* 크기 조정 */
    }
`;

export const StyledLeftFourthLeft = styled.div`
    width: 50%;
    height: 95%;
    background-color: #ddd;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 10px;

    @media (max-width: 768px) {
        padding: 5px; /* 패딩 줄이기 */
    }

    @media (min-width: 769px) and (max-width: 1024px) {
        padding: 8px; /* 패딩 조정 */
    }
`;

export const StyledLeftFourthLeft2 = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;

    @media (max-width: 768px) {
        flex-direction: column; /* 세로 배치 */
    }

    @media (min-width: 769px) and (max-width: 1024px) {
        flex-direction: row; /* 가로 배치 */
    }
`;

export const StyledLeftFourthLeftButton = styled.button`
    width: calc(33.3% - 10px); /* 버튼 간격과 여백을 고려하여 설정 */
    height: 50px;
    margin: 5px;
    background-color: #ddd;
    font-family: BMJUA;
    font-weight: bold;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease; /* 부드러운 색상 전환 효과 */

    &:hover {
        background-color: #bbb; /* 호버 시 색상 변경 */
    }

    @media (max-width: 768px) {
        font-size: 10px; /* 글자 크기 조정 */
        height: 40px; /* 높이 조정 */
    }

    @media (min-width: 769px) and (max-width: 1024px) {
        font-size: 15px; /* 글자 크기 조정 */
        height: 45px; /* 높이 조정 */
    }
`;

export const StyledLeftFourthMiddle = styled.div`
    width: 40%;
    height: 100%;
    background-color: #858383;

    @media (max-width: 768px) {
        width: 100%; /* 전체 너비로 조정 */
        height: 50%; /* 크기 조정 */
    }

    @media (min-width: 769px) and (max-width: 1024px) {
        width: 50%; /* 크기 조정 */
        height: 60%; /* 크기 조정 */
    }
`;

export const StyledLeftFourthRight = styled.div`
    width: 10%; /* 왼쪽 반절의 10% */
    height: 100%;
    background-color: #bbb;
    display: flex;
    flex-direction: column;
    gap: 5px;

    @media (max-width: 768px) {
        width: 100%; /* 전체 너비로 조정 */
        height: 50%; /* 크기 조정 */
    }

    @media (min-width: 769px) and (max-width: 1024px) {
        width: 50%; /* 크기 조정 */
        height: 60%; /* 크기 조정 */
    }
`;

export const StyledCenter = styled.div`
    width: 90%;
    display: flex;
    justify-content: center;

    @media (max-width: 768px) {
        width: 100%; /* 전체 너비로 조정 */
    }

    @media (min-width: 769px) and (max-width: 1024px) {
        width: 90%; /* 크기 조정 */
    }
`;

export const StyledNum = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 10px;

    @media (max-width: 768px) {
        flex-direction: column; /* 세로 배치 */
    }

    @media (min-width: 769px) and (max-width: 1024px) {
        flex-direction: row; /* 가로 배치 */
    }
`;

export const StyledInfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    width: 100%;

    @media (max-width: 768px) {
        flex-direction: column; /* 세로 배치 */
    }

    @media (min-width: 769px) and (max-width: 1024px) {
        flex-direction: row; /* 가로 배치 */
    }
`;

export const StyledLabel = styled.span`
    text-align: left;
    flex: 1;
    font-family: BMJUA;
    font-weight: bold;
    font-size: 20px;

    @media (max-width: 768px) {
        font-size: 10px; /* 글자 크기 조정 */
    }

    @media (min-width: 769px) and (max-width: 1024px) {
        font-size: 10px; /* 글자 크기 조정 */
    }
`;

export const StyledValue = styled.span`
    text-align: right;
    flex: 1;
    font-family: BMJUA;
    font-weight: bold;
    font-size: 20px;

    @media (max-width: 768px) {
        font-size: 10px; /* 글자 크기 조정 */
    }

    @media (min-width: 769px) and (max-width: 1024px) {
        font-size: 10px; /* 글자 크기 조정 */
    }
`;
