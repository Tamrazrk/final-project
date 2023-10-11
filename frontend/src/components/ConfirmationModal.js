import Modal from 'react-modal';
import { BigPopup } from "./styles/Popup.styled";

const ConfirmationModal = ( {isOpen, onClose, afterYes, afterNo} ) => {

    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className='modal-container'
        overlayClassName='modal-overlay'
        ariaHideApp={false}
        >
            <BigPopup>
            <p>Are you sure you want to do it?</p>
            <div className="answers">
                <div onClick={afterYes}>yes</div>
                <div onClick={afterNo}>no</div>
            </div>
            </BigPopup>
        </Modal>
    )
}

export default ConfirmationModal;