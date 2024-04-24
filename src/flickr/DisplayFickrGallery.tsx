import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { publicRequest } from "../auth/AllApi";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

// Add styles for Modal
Modal.setAppElement("#root"); // Prevents screen readers from reading background content

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "350px", // Adjust as needed
    height: "350px", // Adjust as needed
  },
};

// Styled components defined earlier
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px;
`;

const ImageContainer = styled.div`
  width: 23%;
  margin: 1%;
  cursor: pointer; // Indicates that the item is clickable
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
`;

const Title = styled.div`
  text-align: center;
  padding: 8px;
  font-size: 0.9rem;
  color: #333;
  background-color: #f8f8f8;
  border-top: 1px solid #ccc;
`;

interface Image {
  id: string;
  secret: string;
  server: string;
  title: string;
}
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function ImageGallery() {
  const [images, setImages] = useState<Image[]>([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const query = useQuery();
  const cat = query.get("category");
  console.log("cat=", cat);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        //1-mugs,2-bags,3-key rings misc

        const res = await publicRequest.get(`/flickr/images/${cat}`);
        setImages(res.data);
      } catch (err) {
        console.error("Error fetching images:", err);
      }
    };
    fetchImages();
  }, []);

  function openModal(img: Image) {
    setIsOpen(true);
    setSelectedImage(img);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Navbar />
      <Container>
        {images.map((img, index) => (
          <ImageContainer
            key={index}
            onClick={() => openModal(img)}>
            <Image
              src={`https://live.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`}
              alt={img.title}
            />
            <Title>{img.title}</Title>
          </ImageContainer>
        ))}
      </Container>
      {selectedImage && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Image Modal">
          <h2>{selectedImage.title}</h2>
          <img
            src={`https://live.staticflickr.com/${selectedImage.server}/${selectedImage.id}_${selectedImage.secret}.jpg`}
            alt={selectedImage.title}
            style={{ width: "100%" }}
          />
          <button onClick={closeModal}>Close</button>
        </Modal>
      )}
    </div>
  );
}

export default ImageGallery;
