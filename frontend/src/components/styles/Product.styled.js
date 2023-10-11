import styled from 'styled-components';

export const StyledCreateProduct = styled.div`
    margin: 0 auto;
    display: flex;
    gap: 30px;
    margin-top: 40px;

    textarea {
        height: 180px;
        padding: 10px 14px;
        resize: none;
    }

    @media only screen and (max-width: 800px) {
        & {
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    }
`

export const ImageUpload = styled.div`
    display: flex;
    flex-direction: column;

    .product-image {
        border: 1px solid gray;
        width: 200px;
        aspect-ratio: 1;
        object-fit: contain;
        object-position: center;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @media only screen and (max-width: 800px) {
        & {
            margin-left: 100px;
        }
    }
`

export const StyledProducts = styled.section`
    width: 100%;
    
`

export const ProductsContainer = styled.div`
    display: flex;
    gap: 60px;
    flex-wrap: wrap;
    margin: 40px;

    .skeleton {
        width: 280px;
        height: 280px;
    }

    @media only screen and (max-width: 1000px) {
        justify-content: center;
    }
`

export const StyledProductCard = styled.div`
    width: 300px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 5px;
    position: relative;

    &:hover {
        box-shadow: rgba(100, 100, 111, 0.2) 0px 15px 35px 0px;

        .add-cart-icon {
            display: block;
        }
    }
    
    .add-cart-icon {
        position: absolute;
        width: 70px;
        right: 30px;
        bottom: 65px;
        display: none;
    }

    .product-image {
        width: 100%;
        aspect-ratio: 1;
        object-fit: cover;
        object-position: center;
        margin-bottom: 10px;
    }

    .bin-icon {
        width: 20px;
        position: absolute;
        right: 20px;
        bottom: 40px;
    }
`
export const StyledDetailed = styled.div`
    margin: 0 auto;
`