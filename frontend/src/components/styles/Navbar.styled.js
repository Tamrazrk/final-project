import styled from 'styled-components';

export const StyledNavbar = styled.nav`
    padding: 0 40px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 0px 20px 0px;

    .navbar-right-sm {
        display: none;
    }

    div {
        padding: 15px;
    }

    .navbar-left {
        display: flex;
        
    }

    .cart-icon, .user-icon, .logout-icon {
        cursor: pointer;
    }

    .navbar-mid {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .navbar-right {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .cart-icon-container {
        position: relative;
    }

    .cart-count {
        position: absolute;
        font-size: 10px;
        background-color: black;
        color: white;
        padding: 0;
        width: 15px;
        height: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        top: 13px;
        right: 8px;
    }

    .menu-icon {
        width: 30px;
        cursor: pointer;
    }

    @media only screen and (max-width: 1000px) {
        & {
            position: relative;
            padding: 10px 5px;
        }
        .navbar-left {
            flex-direction: column;
        }

        .navbar-mid {
            display: ${props => props.shouldBeSearch ? "none" : "block"};
        }

        .navbar-right-sm {
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            right: 0px;
            top: 90px;
            gap: 10px;
            background-color: white;
            z-index: 2;
            box-shadow: rgba(100, 100, 111, 0.2) 0px 0px 20px 0px;
        }

        .navbar-right {
            display: none;
        }

        .menu-icon {
            display: block;
        }
    }

    @media only screen and (min-width: 1000px) {
        .navbar-right-sm {
            display: none;
        }

        .menu-icon {
            display: none;
        }
    }
`