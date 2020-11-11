import React from "react";
import { Input, Modal , Radio , Form } from "antd";
import { SaveFilled } from "@ant-design/icons";
import IntlMessages from "util/IntlMessages";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";


const RadioGroup = Radio.Group;

const options = [
  {label: 'مادة دراسية', value: 'main'},
  {label: 'أخرى', value: 'other'},
];

class AddSubject extends React.Component {
  constructor() {
    super()
    this.state = {
      name :'',
      type:''
    }
  }

  render() {
    const { onAddSubject, onToggleModal, open } = this.props;
    const { name , type } = this.state;
    return (
      <Modal
        okText={<SaveFilled />}
        cancelText={ <IntlMessages id="modal.cancelSave"/> }
        title={<IntlMessages id="subject.addSubject"/>}
        toggle={onToggleModal} visible={open}
        closable={false}
        onOk={() => {
          if (name === '')
            return;
          onToggleModal("addSubjectState");
          onAddSubject({ name , type });
          this.setState({ name: '' , type:'' })
        }}
        onCancel={()=> {
          onToggleModal("addSubjectState")
          this.setState({ name: '' , type:'' })
        }}>

        <div  className="gx-modal-box-row">
          <div className="gx-modal-box-form-item">
          <Form labelCol={{span:6}} wrapperCol={{span:14}} >
            <div className="gx-form-group">
            <FormattedMessage id="columns.name" defaultMessage="name">
             {
               placeholder => (
                <Form.Item rules={[{ required: true }]}   label={placeholder}>
                <Input
                required
                value={name}
                placeholder={placeholder}
                onChange={(event) => this.setState({name: event.target.value})}
                margin="none"/>
                </Form.Item>
                )
              }
           </FormattedMessage>
            </div>
            <div className="gx-form-group">
              <Form.Item label={<IntlMessages id="columns.type"/>}>
                 <RadioGroup value={type} onChange={(e)=> {
                   this.setState({type: e.target.value})
                 }} options={options} />
              </Form.Item>
            </div>
            </Form>
          </div>
        </div>
      </Modal>
    );
  }
}

export default AddSubject;

AddSubject.propTypes = {
  onAddSubject: PropTypes.func,
  onToggleModal: PropTypes.func,
  open: PropTypes.bool
};