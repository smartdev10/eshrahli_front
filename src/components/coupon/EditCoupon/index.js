import React , { useState , useEffect } from "react";
import { Input, Modal , DatePicker , Form , message } from "antd";
import { SaveFilled } from "@ant-design/icons";
import IntlMessages from "util/IntlMessages";
import { FormattedMessage } from "react-intl";
import moment from "moment";

const RangePicker = DatePicker.RangePicker;
const {TextArea} = Input;


const EditCoupon = ({ onSaveCoupon, onToggleModal, open, coupon }) => {
  
    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [discount, setDiscount] = useState('')
    const [description, setDescription] = useState('')
    const [start, setStartDate] = useState('')
    const [end, setEndDate] = useState('')

    useEffect(() => {
      if(Object.keys(coupon).length !== 0){
        setName(coupon.name)
        setCode(coupon.code)
        setDiscount(coupon.discount)
        setDescription(coupon.description)
        setStartDate(coupon.start)
        setEndDate(coupon.end)
      }
    }, [coupon])

    const onChange = (dates, dateStrings) => {
      setStartDate(dateStrings[0])
      setEndDate(dateStrings[1])
      console.log(dates);
    }

    return (
      <Modal
        okText={<SaveFilled />}
        cancelText={ <IntlMessages id="modal.cancelSave"/> }
        title={<IntlMessages id="coupon.saveCoupon"/>}
        toggle={onToggleModal} 
        visible={open}
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
          onToggleModal("editCouponState");
          onSaveCoupon({ id:coupon.id , name , code ,  discount:parseFloat(discount)  , description , start , end });
          setName(name)
          setName(name)
          setCode(code)
          setDiscount(discount)
          setDescription(description)
          setStartDate(start)
          setEndDate(end)
        }}
        onCancel={()=> {
          onToggleModal('editCouponState')
          setName(coupon.name)
          setCode(coupon.code)
          setDiscount(coupon.discount)
          setDescription(coupon.description)
          setStartDate(coupon.start)
          setEndDate(coupon.end)
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
                onChange={(event) => setName(event.target.value)}
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
                onChange={(event) => setCode(event.target.value)}
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
                onChange={(event) => setDiscount(event.target.value)}
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
                  onChange={(event) =>   setDescription(event.target.value)}
                  margin="none"/>
                </Form.Item>
                  )
                }
            </FormattedMessage>
            </div>

            <div className="gx-form-group">
              <Form.Item  label={<IntlMessages id="columns.discount"/>}>
              <RangePicker value={[moment(start),moment(end)]} className="gx-mb-3 gx-w-100" ranges={{Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')]}} onChange={onChange} />
              </Form.Item>
            </div>
            </Form>
          </div>
        </div>
      </Modal>
    );
}

export default React.memo(EditCoupon);
