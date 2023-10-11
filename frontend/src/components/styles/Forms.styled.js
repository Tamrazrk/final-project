import styled from 'styled-components';

export const StyledForm = styled.form`
    padding: 15px;
    width: 300px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;

    h1 {
        text-align: center;
    }

    p {
        font-size: smaller;
        color: blue;
        text-decoration: underline;
        cursor: pointer;
    }

`

export const StyledFormInput = styled.div`
    width: 100%;

    input {
        width: 100%;
        padding: 10px 14px;
    }
`

export const StyledFormButton = styled.button`
    background-color: var(--primaryGreen);
    border: none;
    padding: 8px 0;
    color: white;
    cursor: pointer;
`