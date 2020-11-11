import React from "react";
import { Input, Modal } from "antd";
import { SaveFilled } from "@ant-design/icons";
import IntlMessages from "util/IntlMessages";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";

class AddNationality extends React.Component {

  state = {
    name :''
  }

  render() {
    const { onAddNationality, onToggleModal, open } = this.props;
    const { name } = this.state;
    return (
      <Modal
        okText={<SaveFilled />}
        cancelText={ <IntlMessages id="modal.cancelSave"/> }
        title={<IntlMessages id="nationality.addNationality"/>}
        toggle={onToggleModal} visible={open}
        closable={false}
        onOk={() => {
          if (name === '')
            return;
          onToggleModal("addNationalityState");
          onAddNationality({ name });
          this.setState({ name: '' })
        }}
        onCancel={()=> {
          onToggleModal("addNationalityState")
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
          </div>
        </div>
      </Modal>
    );
  }
}

export default AddNationality;

AddNationality.propTypes = {
  nationality: PropTypes.object,
  onAddNationality: PropTypes.func,
  onToggleModal: PropTypes.func,
  open: PropTypes.bool
};
