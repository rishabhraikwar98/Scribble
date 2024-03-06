import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { API } from "../API/API";
import { UploadImage } from "../utils/UploadImage";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

function Home() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, []);
  // Function to handle opening the modal
  const openModal = () => {
    setIsModalOpen(true);
    console.log("Open");
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
    console.log("Close");
  };

  return (
    <div className="flex justify-center items-center my-48">
      <button onClick={openModal} className="text-white px-4 py-3 bg-blue-700 rounded-xl hover:bg-blue-500 font-medium">
        Open Modal
      </button> 
      <Modal title="Example Modal"
        isOpen={isModalOpen}
        onClose={closeModal}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            commodo eget lacus sed hendrerit. Integer consequat, libero eu
            dapibus suscipit, ligula quam tincidunt est, non fermentum justo
            ipsum in ipsum. Aenean vel risus ut nisi posuere vehicula nec at mi.
            Nullam tincidunt fringilla suscipit. Sed sed urna ac arcu aliquam
            finibus. Aenean et leo sit amet justo fermentum blandit. Sed viverra
            sapien risus, a dignissim elit dictum nec. Nullam ullamcorper libero
            sed libero venenatis, id egestas leo interdum. Aliquam erat
            volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec commodo eget lacus sed hendrerit. Integer consequat, libero eu
            dapibus suscipit, ligula quam tincidunt est, non fermentum justo
            ipsum in ipsum. Aenean vel risus ut nisi posuere vehicula nec at mi.
            Nullam tincidunt fringilla suscipit. Sed sed urna ac arcu aliquam
            finibus. Aenean et leo sit amet justo fermentum blandit. Sed viverra
            sapien risus, a dignissim elit dictum nec. Nullam ullamcorper libero
            sed libero venenatis, id egestas leo interdum. Aliquam erat
            volutpat.
          </p>
        </Modal>
    </div>
  );
}

export default Home;
