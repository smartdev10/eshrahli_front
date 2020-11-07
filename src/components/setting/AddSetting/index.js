import React from "react";
import { Input, Modal } from "antd";
import { SaveFilled } from "@ant-design/icons";
import IntlMessages from "util/IntlMessages";
import { FormattedMessage } from "react-intl";

class AddSetting extends React.Component {
  constructor() {
    super()
    this.state = {
      name :'',
      numberValue:''
    }
  }

  render() {
    const { onAddSetting , onToggleModal, open } = this.props;
    const { name ,numberValue } = this.state;
    return (
      <Modal
        okText={<SaveFilled />}
        cancelText={ <IntlMessages id="modal.cancelSave"/> }
        title={<IntlMessages id="setting.add"/>}
        toggle={onToggleModal} visible={open}
        closable={false}
        onOk={() => {
          if (name === '')
            return;
          onToggleModal("addSettingState");
          onAddSetting({ name });
          this.setState({ name: '' })
        }}
        onCancel={()=> {
          onToggleModal("addSettingState")
          this.setState({ name: '' })
        }}>

        <div  className="gx-modal-box-row">
          <div className="gx-modal-box-form-item">
            <div className="gx-form-group">
            <FormattedMessage id="columns.name" defaultMessage="name">
             {
               placeholder => (
                <Input
                required
                value={name}
                placeholder={placeholder}
                onChange={(event) => this.setState({name: event.target.value})}
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
                  onChange={(event) => this.setState({numberValue: event.target.value})}
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
}

export default AddSetting;
