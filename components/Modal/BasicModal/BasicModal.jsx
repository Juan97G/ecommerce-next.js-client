import React, {useState, forwardRef, useImperativeHandle} from "react";
import { Modal, Icon } from "semantic-ui-react";

const BasicModal = (props) => {

   /* DESTRUCTURING */
   const {show, setShow, title, children, ...rest} = props;
   

   /* FUNCTIONS */
   const onClose = () => setShow(false)


   return(
      <Modal className="basic-modal" open={show} onClose={onClose} {...rest}>
         <Modal.Header>
            <span>{title}</span> <Icon name="close" onClick={onClose} />
         </Modal.Header>
         <Modal.Content>
            {children}
         </Modal.Content>
      </Modal>
   )
};

export default BasicModal;