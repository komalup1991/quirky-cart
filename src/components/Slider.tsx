import React, { useState } from "react";
import styled from "styled-components";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link, To } from "react-router-dom";
import { transItems } from "../data/data"; // Ensure this path is correct and data is properly typed

// Interfaces for styled components
interface ArrowProps extends React.HTMLAttributes<HTMLDivElement> {
  direction: "left" | "right";
}
interface TransProps extends React.HTMLAttributes<HTMLDivElement> {
  background: string;
}
interface OuterBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  slideIndex: number;
}

// Styled components
const OuterBox = styled.div<OuterBoxProps>`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Trans = styled.div<TransProps>`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.background};
`;

const ContainerPic = styled.div`
  height: 100%;
  flex: 1;
`;

const Pic = styled.img`
  height: 100%;
`;

const ContainerDesc = styled.div`
  flex: 1;
  padding: 50px;
`;

const Heading = styled.h1`
  font-size: 70px;
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Arrow = styled.div<ArrowProps>`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
`;

// Main Slider component
const Slider: React.FC = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction: "left" | "right") => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : transItems.length - 1);
    } else {
      setSlideIndex(slideIndex < transItems.length - 1 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow
        direction="left"
        onClick={() => handleClick("left")}>
        <ArrowLeftIcon />
      </Arrow>
      <OuterBox slideIndex={slideIndex}>
        {transItems.map((item) => (
          <Trans
            background={item.background}
            key={item.id}>
            <ContainerPic>
              <Pic
                src={item.img}
                alt={item.title}
              />
            </ContainerPic>
            <ContainerDesc>
              <Heading>{item.title}</Heading>
              <Desc>{item.desc}</Desc>
              <Link
                to={`/flickr?category=${encodeURIComponent(item.category)}`}>
                <Button>EXPLORE</Button>
              </Link>
            </ContainerDesc>
          </Trans>
        ))}
      </OuterBox>
      <Arrow
        direction="right"
        onClick={() => handleClick("right")}>
        <ArrowRightIcon />
      </Arrow>
    </Container>
  );
};

export default Slider;
