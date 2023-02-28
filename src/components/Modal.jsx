import styles from './Modal.module.css';
import  ReactDOM  from 'react-dom';

//For styling the black-background
const Backdrop = (props) => {
    return <div className={styles.backdrop} onClick={props.onClose}></div>
}


const ModalOverlay = (props) => {
    return (
        <div className={styles.modalOverlay}>
        <div className={styles.content}>{props.children}</div> 
        </div>
    )
}


const  portalElement = document.getElementById('portal');

const Modal= (props) => {
  return (
    <>
    {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
    {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </>
  
)};

export default Modal;

