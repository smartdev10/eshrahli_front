import React , { useState , useEffect } from "react";
import { Modal } from "antd";
import IntlMessages from "util/IntlMessages";
import PropTypes from "prop-types";

const ShowMessage = ({ onToggleModal, open, message }) => {
  
    const [content, setMessage] = useState('')

    useEffect(() => {
      if(Object.keys(message).length !== 0){
        setMessage(message.message)
      }
    }, [message])

    return (
      <Modal
        title={<IntlMessages id="message.showMessage"/>}
        toggle={onToggleModal} 
        visible={open}
        footer={null}
        onCancel={()=> {
          onToggleModal('onShowMessageState')
        }}>

        <div  className="gx-modal-box-row">
          {content}
        </div>
      </Modal>
    );
}

export default React.memo(ShowMessage);


ShowMessage.propTypes = {
  onToggleModal: PropTypes.func,
  open: PropTypes.bool,
  message: PropTypes.object,
};
