import React, { useState, useEffect } from "react";
import Icon from "../Icon/Icon";
import { AiOutlineClose } from "react-icons/ai";
const iconColor = "rgb(55 65 81)";
function Modal({ title, isOpen, onClose, children }) {
  
  return (
    <>
    {isOpen?<div
      className={`modal fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50`}
    >
      <div className="lg:w-[500px] w-[360px] bg-gray-100 lg:h-2/3 h-1/2 rounded-xl modal-content">
        {/* Content of the modal */}
        <div className="lg:py-4.5 py-4 px-6 border-b border-gray-300 flex align-center justify-between shadow-sm">
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
          <button className="text-sm" onClick={onClose}>
            <Icon size={24} icon={AiOutlineClose} color={iconColor} />
          </button>
        </div>
        <div className="modal-body py-5">{children}</div>
      </div>
    </div>:null}
    </>
  );
}

export default Modal;
