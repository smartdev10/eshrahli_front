import React from "react";
import { Input, Modal , DatePicker , Form, message } from "antd";
import { SaveFilled } from "@ant-design/icons";
import IntlMessages from "util/IntlMessages";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import PropTypes from "prop-types";
const {TextArea} = Input;
const RangePicker = DatePicker.RangePicker;

class AddCoupon extends React.Component {

  state = {
    name :'',
    code:'',
    discount:'',
    description:'',
    start:'',
    end:''
  }

  onChange = (dates, dateStrings) => {
    this.setState({ start:  dateStrings[0] , end:  dateStrings[1] })
    console.log(dates);
  }

  render() {
    const { onAddCoupon, onToggleModal, open } = this.props;
    const { name , code , discount , start , end , description } = this.state;
    return (
      <Modal
        okText={<SaveFilled />}
        cancelText={ <IntlMessages id="modal.cancelSave"/> }
        title={<IntlMessages id="coupon.addCoupon"/>}
        toggle={onToggleModal} visible={open}
        closable={false}
        onOk={() => {
          if (name === '' || code === '' || discount === '' || start === '' || end === '' || description === ''){
            message.error('المرجو إدخال جميع المعلومات')
            return;
          }
          if(typeof parseFloat(discount) !== "number" || Number.isNaN(parseFloat(discount)) || parseFloat(discount) === null ){
            console.log(parseFloat(discount) , typeof parseFloat(discount))
            message.error('المرجو إدخال نسبة التخفيض')
            return;
          }
          onAddCoupon({ name , code , discount:parseFloat(discount) , start , end , description });
          this.setState({ name: '' , code: '' , discount: '' , start: '', end: '', description:'' })
        }}
        onCancel={()=> {
          onToggleModal("addCouponState")
          this.setState({ name: '' , code: '' , discount: '' , start: '', end: '', description:'' })
        }}>

        <div  className="gx-modal-box-row">
          <div className="gx-modal-box-form-item">
          <Form labelCol={{span:6}} wrapperCol={{span:14}} >
            <div className="gx-form-group">
            <FormattedMessage id="columns.name" defaultMessage="name">
             {
               placeholder => (
                <Form.Item  label={<IntlMessages id="columns.name"/>}>
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
            <FormattedMessage id="columns.code" defaultMessage="code">
             {
               placeholder => (
                <Form.Item  label={<IntlMessages id="columns.code"/>}>
                <Input
                required
                value={code}
                placeholder={placeholder}
                onChange={(event) => this.setState({code: event.target.value})}
                margin="none"/>
                </Form.Item>
                )
              }
           </FormattedMessage>
            </div>

            <div className="gx-form-group">
            <FormattedMessage id="columns.discount" defaultMessage="discount">
             {
               placeholder => (
                <Form.Item rules={[{ required: true, pattern:/^\d*\.?\d*$/ , message: 'المرجو إدخال إسم المستخدم' }]} label={<IntlMessages id="columns.discount"/>}>
                  <Input
                  required
                  value={discount}
                  placeholder={placeholder}
                  onChange={(event) => this.setState({discount: event.target.value})}
                  margin="none"/>
                </Form.Item>
                )
              }
           </FormattedMessage>
            </div>

            <div className="gx-form-group">
              <FormattedMessage id="columns.description" defaultMessage="description">
              {
                placeholder => (
                <Form.Item  label={<IntlMessages id="columns.description"/>}>
                  <TextArea
                  required
                  value={description}
                  placeholder={placeholder}
                  onChange={(event) => this.setState({description: event.target.value})}
                  margin="none"/>
                </Form.Item>
                  )
                }
            </FormattedMessage>
            </div>

            <div className="gx-form-group">
            <FormattedMessage id="columns.periode" defaultMessage="periode">
             {
               placeholder => (
                <Form.Item  label={<IntlMessages id="columns.periode"/>}>
                  <RangePicker value={[start !== "" ? moment(start) : null,end !== "" ? moment(end) : null]} placeholder={placeholder}  className="gx-mb-3 gx-w-100"  onChange={this.onChange} />
                </Form.Item>
               )
              }
           </FormattedMessage>
            </div>
            </Form>
          </div>
        </div>
      </Modal>
    );
  }
}

export default AddCoupon;

AddCoupon.propTypes = {
  coupon: PropTypes.object,
  onToggleModal:PropTypes.func,
  onAddCoupon:PropTypes.func,
  open:PropTypes.bool
};

