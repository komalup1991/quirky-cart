import React, { useEffect, useState } from "react";
import { publicRequest } from "../auth/AllApi";
import styled from "styled-components";
import Navbar from "../components/Navbar";

// Styled components defined earlier

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; // Ensures that margin doesn't push the 4th image to the next line
  margin: 20px;
`;

interface Image {
  id: string;
  secret: string;
  server: string;
  title: string;
}
const ImageContainer = styled.div`
  width: 23%; // Keeps space for margin
  margin: 1%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const Title = styled.div`
  text-align: center;
  padding: 8px;
  font-size: 0.9rem;
  color: #333;
  background-color: #f8f8f8;
  border-top: 1px solid #ccc;
`;

function ImageGallery() {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await publicRequest.get("/flickr/images");
        setImages(res.data);
      } catch (err) {
        console.error("Error fetching images:", err);
      }
    };
    fetchImages();
  }, []);

  return (
    <div>
      <Navbar />
      <Container>
        {images.map((img, index) => (
          <ImageContainer key={index}>
            <Image
              src={`https://live.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`}
              alt={img.title}
            />
            <Title>{img.title}</Title>
          </ImageContainer>
        ))}
      </Container>
    </div>
  );
}

export default ImageGallery;
