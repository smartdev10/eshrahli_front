import React , { useState , useEffect } from "react";
import { Modal , Card  , Col , Row } from "antd";
import IntlMessages from "util/IntlMessages";
import moment from 'moment';
import PropTypes from "prop-types";

const ShowRequest = ({ onToggleModal, open, request }) => {

    const [id, setNumber] = useState('')
    const [sname, setSname] = useState('')
    const [tname, setTname] = useState('')
    const [subject, setSubject] = useState('')
    const [status, setStatus] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [duration, setDuration] = useState(0)
    const [level, setLevel] = useState('')
    const [nstudents, setNumberStudent] = useState('')
    const [sessionDate, setSessionDate] = useState('')
    const [search_type, setSearchType] = useState('')
    const [details, setDetails] = useState('')
    const [city, setCity] = useState('')
   
    const [paymentMethod, setPaymendMethod] = useState('')
   
    const [cancellationDate, setCancellationDate] = useState('')
    const [canceledBy, setCancelledBy] = useState('')
  
    useEffect(() => {
      if(Object.keys(request).length !== 0){
        setNumber(request.id)
        setSname(request.student.name)
        const teacherName = request.teacher ? request.teacher.name : 'غير وارد'
        setTname(teacherName)
        const subject = request.subject ? request.subject.name : request.other
        setSubject(subject)
        const levels = request.level ? request.level.name : 'غير وارد'
        setLevel(levels)
        setNumberStudent(request.nstudents)
        setSessionDate(request.sessionDate)
        setSearchType(request.search_type)
        setDetails(request.details)
        setStatus(request.status)
        setStartTime(request.lesson_start_time)
        setEndTime(request.lesson_end_time)
        if(startTime && endTime){
          const m1 = moment(startTime);
          const m2 = moment(endTime);
          setDuration(m2.diff(m1,'minutes'))
        }
        switch(request.paymentMethod){
          case "cash" :
            setPaymendMethod('كاش')
            break;
          case "credit_card" :
            setPaymendMethod('بطاقة مصرفية')
            break;
          default :
            setPaymendMethod('غير وارد')
            break;
        }
        const city = request.city ?  request.city.name :  'غير وارد'
        setCity(city)
       
        setCancellationDate(request.cancellationDate)
        setCancelledBy(request.canceledBy)
      }
    }, [request, startTime,endTime])

    return (
      <Modal
        width={'70%'}
        cancelText={ <IntlMessages id="modal.cancelSave"/> }
        title={<IntlMessages id= "request.showRequest"/>}
        toggle={onToggleModal} 
        visible={open}
        footer={null}
        onCancel={()=> {
          onToggleModal('onShowRequestState')
        }}>

        <div  className="gx-modal-box-row">
          <div className="gx-modal-box-form-item">
          <Card dir="rtl" title={`رقم الطلب :  ${id}`}>
             <Row>

              <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
                <Card style={{ marginTop: 16 }} type="inner"  title={<IntlMessages id="columns.studentName"/>}>
                  {sname}
                </Card>
              </Col>

              <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
                <Card style={{ marginTop: 16 }} type="inner"  title={<IntlMessages id="columns.teacherName"/>}>
                  {tname}
                </Card>
              </Col>

              <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
                <Card dir="ltr" style={{ marginTop: 16 }} type="inner"  title={<IntlMessages id="columns.sessionDateTime"/>}>
                  {moment(sessionDate).format('h:mm:ss , DD-MM-YYYY')}
                </Card>
              </Col>

              <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
                <Card style={{ marginTop: 16 }} type="inner" title={<IntlMessages id="columns.searchtype"/>}>
                  {search_type}
                </Card>
              </Col>

              <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
                <Card style={{ marginTop: 16 }} type="inner"  title={<IntlMessages id="columns.nstudents"/>}>
                  {nstudents}
                </Card>
              </Col>

              <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
                <Card style={{ marginTop: 16 }} type="inner"  title={<IntlMessages id="columns.subject"/>}>
                  {subject.length !== 0 ? subject : 'لا يوجد'}
                </Card>
              </Col>

              
              <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
                <Card style={{ marginTop: 16 }} type="inner"  title={<IntlMessages id="columns.level"/>}>
                  {level}
                </Card>
              </Col>

              <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
                  <Card style={{ marginTop: 16 }} type="inner"  title={<IntlMessages id="columns.peymentMethod"/>}>
                    {paymentMethod}
                  </Card>
              </Col>


              <Col xl={12} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
                <Card style={{ marginTop: 16 }} type="inner" title={<IntlMessages id="columns.details"/>}>
                 {details ? details : 'لا يوجد'}
                </Card>
              </Col>


              <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
                  <Card style={{ marginTop: 16 }} type="inner"  title={<IntlMessages id="columns.city"/>}>
                    {city}
                  </Card>
              </Col>

              {
                status === "COMPLETED" ? (
                  <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
                    <Card style={{ marginTop: 16 }} type="inner"  title={<IntlMessages id="columns.sessionDuration"/>}>
                      {duration + " دقيقة"}
                    </Card>
                 </Col>
                ) : null
              }

              </Row>

              <Row>

                { cancellationDate ? (
                    <>
                    <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
                      <Card style={{ marginTop: 16 }} type="inner"  title={<IntlMessages id="columns.peymentMethod"/>}>
                        {moment(cancellationDate).format('DD-MM-YYYY , h:mm:ss a')}
                      </Card>
                    </Col>

                    <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
                      <Card style={{ marginTop: 16 }} type="inner"  title={<IntlMessages id="columns.peymentMethod"/>}>
                        {canceledBy}
                      </Card>
                    </Col>
                    </>
                ) : null}
              </Row>
          </Card>
          </div>
        </div>
      </Modal>
    );
}

export default React.memo(ShowRequest);

ShowRequest.propTypes = {
  request: PropTypes.object,
  open:PropTypes.bool,
  onToggleModal:PropTypes.func
};
