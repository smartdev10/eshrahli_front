import React , { useState , useEffect } from "react";
import { Input, Modal } from "antd";
import { SaveFilled } from "@ant-design/icons";
import IntlMessages from "util/IntlMessages";
import { FormattedMessage } from "react-intl";

const EditNationality = ({ onSaveNationality , onToggleModal, open, nationality }) => {
  
    const [name, setName] = useState('')

    useEffect(() => {
      if(Object.keys(nationality).length !== 0){
        console.log(nationality.name)
        setName(nationality.name)
      }
    }, [nationality])

    return (
      <Modal
        okText={<SaveFilled />}
        cancelText={ <IntlMessages id="modal.cancelSave"/> }
        title={<IntlMessages id="nationality.saveNationality"/>}
        toggle={onToggleModal} 
        visible={open}
        closable={false}
        onOk={() => {
          if (name === '')
            return;
          onToggleModal("editNationalityState");
          onSaveNationality({ id:nationality.id , name });
          setName(name)
        }}
        onCancel={()=> {
          onToggleModal('editNationalityState')
          setName(nationality.name)
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

export default React.memo(EditNationality);
