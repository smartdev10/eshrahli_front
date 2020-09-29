import React , { useState , useEffect } from "react";
import { Input, Modal } from "antd";
import { SaveFilled } from "@ant-design/icons";
import IntlMessages from "util/IntlMessages";
import { FormattedMessage } from "react-intl";

const EditLevel = ({ onSaveLevel, onToggleModal, open, level }) => {
  
    const [name, setName] = useState('')

    useEffect(() => {
      if(Object.keys(level).length !== 0){
        console.log(level.name)
        setName(level.name)
      }
    }, [level])

    return (
      <Modal
        okText={<SaveFilled />}
        cancelText={ <IntlMessages id="modal.cancelSave"/> }
        title={<IntlMessages id="level.saveLevel"/>}
        toggle={onToggleModal} 
        visible={open}
        closable={false}
        onOk={() => {
          if (name === '')
            return;
          onToggleModal("editLevelState");
          onSaveLevel({ id:level.id , name });
          setName(name)
        }}
        onCancel={()=> {
          onToggleModal('editLevelState')
          setName(level.name)
        }}>

        <div  className="gx-modal-box-row">
          <div className="gx-modal-box-form-item">
            <div className="gx-form-group">
            <FormattedMessage id="columns.name" defaultMessage="name">
             {
               placeholder => (
              <Input
                required
                placeholder={placeholder}
                onChange={(event) => setName(event.target.value)}
                value={name}
                margin="none"/>
                )
              }
           </FormattedMessage>
            </div>
          </div>
        </div>
      </Modal>
    );
}

export default React.memo(EditLevel);
