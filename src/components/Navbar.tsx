import { useState } from "react";
import { Search } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { RootState } from "../redux/store";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../auth/ApiCalls";

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
  @media only screen and (max-width: 480px) {
    display: none;
  }
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
    fontsize: 12px;
    marginleft: 10px;
  }
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  @media only screen and (max-width: 380px) {
    flex: 2;
    justifycontent: "center";
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
    justifycontent: "center";
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
  const quantity = useSelector(
    (state: RootState) => state.shoppingCart.totalQuantity,
  );
  const user = useSelector((state: RootState) => state.user);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const handleLogout = () => {
    logout(dispatch);
  };
  const handleSearch = (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    if (
      event.type === "click" ||
      (event as React.KeyboardEvent).key === "Enter"
    ) {
      navigate(`/flickr?category=${encodeURIComponent(searchKeyword)}`);
    }
  };
  const userId = user.currentUser?.id;
  return (
    <Container>
      <Wrapper>
        <LeftDiv>
          {user.currentUser ? (
            <>
              <Link
                to={`/user/${user.currentUser.id}`}
                style={{ textDecoration: "none", color: "black" }}>
                <Pic
                  src={
                    user.currentUser.profilePic
                      ? user.currentUser.profilePic
                      : "https://www.shareicon.net/data/128x128/2016/05/24/770042_people_512x512.png"
                  }
                />
              </Link>
              <span>WELCOME, {user.currentUser.username}</span>
            </>
          ) : null}

          <SearchContainer>
            <Input
              value={searchKeyword}
              placeholder="Search random images!!! mugs, bags colors and more"
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyPress={handleSearch}
            />
            <Search
              style={{ color: "gray", fontSize: 16 }}
              onClick={handleSearch}
            />
          </SearchContainer>
        </LeftDiv>

        <MiddleDiv>
          <Link
            to="/"
            style={{ textDecoration: "none", color: "black" }}>
            <Logo>QUIRKY CART.</Logo>
          </Link>
        </MiddleDiv>

        <RightDiv>
          <MenuItem>
            <Link
              to="/userList"
              style={{ textDecoration: "none", color: "black" }}>
              USER LIST
            </Link>
          </MenuItem>
          {user.currentUser ? (
            <MenuItem onClick={handleLogout}>
              <Link
                to="#"
                style={{ textDecoration: "none", color: "black" }}>
                LOGOUT
              </Link>
            </MenuItem>
          ) : (
            <>
              <MenuItem>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "black" }}>
                  REGISTER
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "black" }}>
                  SIGN IN
                </Link>
              </MenuItem>
            </>
          )}
          <Link to="/shoppingCart">
            <MenuItem>
              {user.currentUser ? (
                <Badge
                  badgeContent={quantity}
                  color="primary">
                  <ShoppingCartIcon color="action" />
                </Badge>
              ) : (
                <ShoppingCartIcon color="action" />
              )}
            </MenuItem>
          </Link>
        </RightDiv>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
