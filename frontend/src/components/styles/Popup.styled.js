import styled from 'styled-components';

export const SmallPopup = styled.div`
    position: absolute;
    right: -30px;
    top: 50px;
    color: #222;
    text-align: center;
    display: flex;
    flex-direction: column;
    background: white;
    box-shadow: rgb(0 0 0 / 20%) 1px 2px 5px;
    border-radius: 3px;

    div {
        cursor: pointer;
        padding: 10px;
    }

    div:hover {
        background-color: #e2e6da;
    }
`

export const BigPopup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;

    .answers {
        display: flex;
        gap: 20px;
    }

    .answers > div {
        background-color: rgb(15, 46, 59);
        color: white;
        padding: 5px 10px;
        border-radius: 3px;
        width: 50px;
        text-align: center;
        cursor: pointer;

    }
`