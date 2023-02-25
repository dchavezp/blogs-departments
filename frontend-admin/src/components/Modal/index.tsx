import IconButton from "../IconButton";
import styles from "./modal.module.css";
import { GrClose } from "react-icons/gr";
interface ModalProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}
function Modal({ active, setActive, children }: ModalProps) {
  const hideModal = () => {
    setActive(false);
  };
  if (active) {
    return (
      <div className={styles.container}>
        <div className={styles.background} />
        <div className={styles.content}>
          <div className={styles.actions}>
            <IconButton active={false} onClick={hideModal}>
              <GrClose />
            </IconButton>
          </div>
          {children}
        </div>
      </div>
    );
  }
  return null;
}

export default Modal;
