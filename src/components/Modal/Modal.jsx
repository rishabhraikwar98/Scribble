import { motion } from "framer-motion";
import Icon from "../Icon/Icon";
import { AiOutlineClose } from "react-icons/ai";

const iconColor = "rgb(55 65 81)";

function Modal({ title, isOpen, onClose, children }) {
  return (
    <>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`modal fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50`}
        >
          <motion.div
            initial={{ opacity: 0, y: -50}}
            animate={{ opacity: 1, y:0}}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, duration:.5 }}
            className="lg:w-[500px] w-[360px] bg-gray-100 lg:h-2/3 h-1/2 rounded-xl modal-content"
          >
            {/* Content of the modal */}
            <div className="lg:py-4.5 py-4 px-6 border-b border-gray-300 flex align-center justify-between shadow-sm">
              <h1 className="text-xl font-bold text-gray-800">{title}</h1>
              <motion.button whileHover={{scale:1.1}} whileTap={{scale:.95}} className="text-sm" onClick={onClose}>
                <Icon size={24} icon={AiOutlineClose} color={iconColor} />
              </motion.button>
            </div>
            <div className="modal-body py-5">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </>
  );
}

export default Modal;
