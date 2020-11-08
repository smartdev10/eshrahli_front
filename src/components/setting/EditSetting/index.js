import React , { useState , useEffect } from "react";
import { Input, message, Modal } from "antd";
import { SaveFilled } from "@ant-design/icons";
import IntlMessages from "util/IntlMessages";
import { FormattedMessage } from "react-intl";

const EditSetting = ({ onSaveSetting, onToggleModal, open, setting }) => {
  
    const [name, setName] = useState('')
    const [numberValue, setValue] = useState(0)

    useEffect(() => {
      if(Object.keys(setting).length !== 0){
        console.log(setting.name)
        setName(setting.name)
        setValue(setting.numberValue)
      }
    }, [setting])

    return (
      <Modal
        okText={<SaveFilled />}
        cancelText={ <IntlMessages id="modal.cancelSave"/> }
        title={<IntlMessages id="setting.save"/>}
        toggle={onToggleModal} 
        visible={open}
        closable={false}
        onOk={() => {
          if (name === '' || numberValue === '' || numberValue === 0){
            message.error('المرجو إدخال المعلومات المطلوبة')
          }else if(Number.isNaN(parseFloat(numberValue))){
            message.error('المرجو إدخال أرقام فقط')
          }else{
            onToggleModal("editSettingState");
            onSaveSetting({ id:setting.id , name , numberValue:parseFloat(numberValue)});
            setName(name)
            setValue(numberValue)
          }
        }}
        onCancel={()=> {
          onToggleModal('editSettingState')
          setName(setting.name)
          setValue(setting.numberValue)
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
            <div className="gx-form-group">
              <FormattedMessage id="columns.value" defaultMessage="value">
              {
                placeholder => (
                  <Input
                  required
                  value={numberValue}
                  placeholder={placeholder}
                  onChange={(event) => {
                    setValue(event.target.value)
                  }}
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

export default React.memo(EditSetting);
