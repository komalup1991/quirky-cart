import { Search } from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { RootState } from '../redux/store';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../auth/ApiCalls';

const Container = styled.div`    
    height: 60px;
    background-color: #f0f0f0; 
    @media only screen and (max-width: 380px) {
        height: 50px;
    }   
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media only screen and (max-width: 380px) {
        padding: 10px 0px;
    }  
`;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    border: 0.5px solid lightgray;
    margin-left: 25px;
`;

const Input = styled.input`
    border: none;
    @media only screen and (max-width: 380px) {
        width: 50px;
    }
`;

const Logo = styled.h1`
    font-weight: bold;
    @media only screen and (max-width: 380px) {
        fontSize: 12px;
        marginLeft: 10px;
    }
`;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    @media only screen and (max-width: 380px) {
        flex: 2;
        justifyContent: "center";
    }
`;

const LeftDiv = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const MiddleDiv = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
`;

const RightDiv = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    @media only screen and (max-width: 380px) {
        flex: 2;
        justifyContent: "center";
    }
`;

const Pic = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 10px;
`;

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const quantity = useSelector((state: RootState) => state.shoppingCart.quantity);
    const user = useSelector((state: RootState) => state.user);
    console.log(quantity);
    const handleLogout = () => {
        logout(dispatch, navigate);
    };
    return (
        <Container>
            <Wrapper>
                <LeftDiv>
                    <Pic src="https://t4.ftcdn.net/jpg/05/99/64/79/240_F_599647918_bmfbrXIWjwB7mOiWvH85F9iIwijsDjkd.jpg" />
                    WELCOME {user.currentUser?.username}
                    <SearchContainer>
                        <Input />
                        <Search style={{ color: "gray", fontSize: 16 }} />
                    </SearchContainer>
                </LeftDiv>

                <MiddleDiv>
                    <Link to="/" style={{ textDecoration: 'none', color: "black" }}>
                        <Logo>QUIRKY CART.</Logo>
                    </Link>
                </MiddleDiv>

                <RightDiv>
                    {user.currentUser===null ? (
                        <>
                            <MenuItem>
                                <Link to="/register" style={{ textDecoration: 'none', color: "black" }}>REGISTER</Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/login" style={{ textDecoration: 'none', color: "black" }}>SIGN IN</Link>
                            </MenuItem>
                        </>
                    ) : (
                        <MenuItem onClick={handleLogout}>
                           <Link to="#" style={{ textDecoration: 'none', color: "black" }}>LOGOUT</Link>
                        </MenuItem>
                    )}
                    <Link to="/shoppingCart">
                        <MenuItem>
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartIcon color="action" />
                            </Badge>
                        </MenuItem>
                    </Link>
                </RightDiv>

            </Wrapper>
        </Container>
    )
};

export default Navbar;
