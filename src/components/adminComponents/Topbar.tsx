import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import styled from 'styled-components'

const Container = styled.div`    
width: 100%;
height: 50px;
background-color: white;
position: sticky;
top: 0;
z-index: 999;
    @media only screen and (max-width: 380px) {
        height: "50px";
      }       
`;  

const Box = styled.div`
height: 100%;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Logo = styled.h1`
    font-weight: bold;
    @media only screen and (max-width: 380px) {
        fontSize: "12px", marginLeft: "10px"
      }
`;

const LeftDiv = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const MiddleDiv = styled.div`
    // flex: 1;
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
        flex: 2, justifyContent: "center"
      }
`;

const IconBox = styled.div`
position: relative;
  cursor: pointer;
  margin-right: 10px;
  color: #555;
`;

const IconTag = styled.span`
width: 15px;
height: 15px;
position: absolute;
top: -5px;
right: 0px;
background-color: red;
color: white;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
font-size: 10px;
`;

const Pic= styled.img`
width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
`;
const Topbar = () => {
  return (
    <Container>
      <Box>
        <LeftDiv>
        <Logo>QUIRKY CART.</Logo>
        </LeftDiv>
        <RightDiv>
          <IconBox>
            <NotificationsNoneIcon />
            <IconTag>2</IconTag>
          </IconBox>
          <IconBox>
            <LanguageIcon />
            <IconTag>2</IconTag>
          </IconBox>
          <IconBox>
            <SettingsIcon />
          </IconBox>
          <Pic src="https://t4.ftcdn.net/jpg/05/99/64/79/240_F_599647918_bmfbrXIWjwB7mOiWvH85F9iIwijsDjkd.jpg" />
        </RightDiv>
      </Box>
    </Container>
  )
}

export default Topbar