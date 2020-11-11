import React , { useState , useEffect } from "react";
import { Input, Modal } from "antd";
import { SaveFilled } from "@ant-design/icons";
import IntlMessages from "util/IntlMessages";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

const EditCity = ({ onSaveCity, onToggleModal, open, city }) => {
  
    const [name, setName] = useState('')

    useEffect(() => {
      if(Object.keys(city).length !== 0){
        console.log(city.name)
        setName(city.name)
      }
    }, [city])

    return (
      <Modal
        okText={<SaveFilled />}
        cancelText={ <IntlMessages id="modal.cancelSave"/> }
        title={<IntlMessages id="city.saveCity"/>}
        toggle={onToggleModal} 
        visible={open}
        closable={false}
        onOk={() => {
          if (name === '')
            return;
          onToggleModal("editCityState");
          onSaveCity({ id:city.id , name });
          setName(name)
        }}
        onCancel={()=> {
          onToggleModal('editCityState')
          setName(city.name)
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

export default React.memo(EditCity);


EditCity.propTypes = {
  city: PropTypes.object,
  open: PropTypes.bool,
  onSaveCity:PropTypes.func,
  onToggleModal:PropTypes.func,
};