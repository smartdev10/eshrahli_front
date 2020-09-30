import React from "react";
import { Input, Modal , Select } from "antd";
import { SaveFilled } from "@ant-design/icons";
import IntlMessages from "util/IntlMessages";
import { FormattedMessage } from "react-intl";

const Option = Select.Option;

class AddLevel extends React.Component {
  
  state = {
    name :'',
    subjects:[]
  }


  handleChangeSubjects = (subjects) => {
    this.setState({subjects})
  }

  render() {
    const { onAddLevel, onToggleModal, open } = this.props;
    const { name , subjects } = this.state;
    return (
      <Modal
        okText={<SaveFilled />}
        cancelText={ <IntlMessages id="modal.cancelSave"/> }
        title={<IntlMessages id="level.addLevel"/>}
        toggle={onToggleModal} visible={open}
        closable={false}
        onOk={() => {
          if (name === '')
            return;
          onToggleModal("addLevelState");
          onAddLevel({ name , subjects});
          this.setState({ name: '' , subjects:[] })
        }}
        onCancel={()=> {
          onToggleModal("addLevelState")
          this.setState({ name: '' , subjects:[] })
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
                 <Select
                  mode="multiple"
                  value={subjects}
                  style={{width: '100%'}}
                  placeholder={<IntlMessages id="columns.materials"/>}
                  onChange={this.handleChangeSubjects}>
                  {this.props.subjects.filter((subject) => subject.type === 'main').map((subject , index)=>  <Option key={index} value={subject.id}>{subject.name}</Option>)}
                </Select>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default AddLevel

