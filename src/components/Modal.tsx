import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { ModalProps } from '../types'

const CustomModal: React.FC<ModalProps> = (props: ModalProps) => {
  return (
    <Modal
      show={props.modalShow}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>閉じる</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CustomModal
