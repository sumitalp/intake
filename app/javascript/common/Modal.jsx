import React from 'react'
import PropTypes from 'prop-types'
import {
  CardTitle,
  Modal,
  ModalBody,
  ModalHeader,
} from '@cwds/components'

const ModalComponent = ({isOpen, size, modalTitle, modalBody, onCloseText, closeModal, modalFooter}) => {
  return (
    <div>
      <Modal isOpen={isOpen} size={size}>
        <ModalHeader toggle={closeModal}>
          <CardTitle>{modalTitle}</CardTitle>
        </ModalHeader>
        <ModalBody>
          {modalBody}
        </ModalBody>
        <div className ="p-3 text-right">
          {modalFooter}
        </div>
      </Modal>
    </div>
  )
}

ModalComponent.propTypes = {
  closeModal: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  modalBody: PropTypes.any,
  modalFooter: PropTypes.any,
  modalTitle: PropTypes.string,
  onCloseText: PropTypes.string,
  size: PropTypes.string,

}
export default ModalComponent
