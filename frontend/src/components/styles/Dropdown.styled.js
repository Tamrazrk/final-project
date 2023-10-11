import styled from 'styled-components';

export const StyledDropdown = styled.div`
    width: fit-content;
    height: 40px;
    color: white;
    background-color: var(--primaryGreen);
    padding: 0;
    display: flex;
    align-items: center;
    position: relative;
    font-size: 12px;

    @media only screen and (max-width: 1000px) {
        & {
            font-size: 12px;
            
        }
    }
`
export const DropdownSelector = styled.div`
    width: 100%;
    padding: 5px;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    cursor: pointer;
`

export const DropdownList = styled.div`
    position: absolute;
    top: 50px;
    padding: 0;
    left: 0;
    width: 100%;
    background-color: white;
    color: black;
    z-index: 1;

    div {
        width: 100%;
        padding: 5px;
    }

    div:hover {
        background-color: var(--primaryGreen);
        color: white;
        cursor: pointer;
    }

    
`

export const SearchInput = styled.input`
    border: 1px solid var(--primaryGreen);
    padding: 0 10px;
    width: 155px;
    height: 40px;
    font-size: 12px;

    &:focus {
        outline: none;
    }
`