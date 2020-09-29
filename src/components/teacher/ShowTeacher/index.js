import React , { useState , useEffect } from "react";
import { Modal , Card , Tag , Col , Row } from "antd";
import IntlMessages from "util/IntlMessages";

const ShowTeacher = ({ onToggleModal, open, teacher }) => {
  
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [bankname, setBankName] = useState('')
  const [bankiban, setBankIban] = useState('')
  const [nationality, setNationality] = useState('')
  const [subjectsState, setSubjects] = useState([])
  const [levelsState, setLevels] = useState([])
  const [city, setCity] = useState('')
  const [qualification, setQualification] = useState('')
  const [gender, setGender] = useState('')
  const [image , setImage] = useState(null)
  const [certificate , setCertificate] = useState(null)
  const [personalCard , setPersonalCard] = useState(null)

    useEffect(() => {
      if(Object.keys(teacher).length !== 0){
        setName(teacher.name)
        setMobile(teacher.mobile)
        setBankName(teacher.bankname)
        setBankIban(teacher.bankiban)
        setNationality(teacher.nationality.name)
        setCity(teacher.city.name)
        setQualification(teacher.qualification)
        setGender(teacher.gender)
        setImage(teacher.image)
        setCertificate(teacher.certificate)
        setPersonalCard(teacher.personalcard)
        let subjects = teacher.subjects.map((sub)=> sub.name)
        let levels = teacher.levels.map((lev)=> lev.name)
        setSubjects(subjects)
        setLevels(levels)
      }
    }, [teacher])

    return (
      <Modal
        width={'70%'}
        cancelText={ <IntlMessages id="modal.cancelSave"/> }
        title={<IntlMessages id="teacher.showTeacher"/>}
        toggle={onToggleModal} 
        visible={open}
        footer={null}
        onCancel={()=> {
          onToggleModal('showTeacherState')
        }}>

        <div  className="gx-modal-box-row">
          <div className="gx-modal-box-form-item">
          <Card dir="rtl" title={name}>
             <Row>
             <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
              <Card style={{ marginTop: 16 }} type="inner"  title={<IntlMessages id="columns.mobile"/>}>
                {mobile}
              </Card>
              </Col>
              <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
              <Card style={{ marginTop: 16 }} type="inner"  title={<IntlMessages id="columns.bankname"/>}>
              {bankname}
              </Card>
              </Col>
              <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
              <Card style={{ marginTop: 16 }} type="inner"  title={<IntlMessages id="columns.bankiban"/>}>
              {bankiban}
              </Card>
              </Col>

              <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
              <Card style={{ marginTop: 16 }} type="inner" title={<IntlMessages id="columns.nationality"/>}>
              {nationality}
              </Card>
              </Col>
              <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
              <Card style={{ marginTop: 16 }} type="inner"  title={<IntlMessages id="columns.city"/>}>
              {city}
              </Card>
              </Col>

              <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
              <Card style={{ marginTop: 16 }} type="inner" title={<IntlMessages id="columns.gender"/>}>
              {gender === 'male' ? "ذكر": "أنثى"}
              </Card>
              </Col>
              
              <Col xl={12} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
              <Card style={{ marginTop: 16 }} type="inner" title={<IntlMessages id="columns.qualification"/>}>
              {qualification}
              </Card>
              </Col>
              </Row>

              <Row>
              <Col xl={12} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
              <Card style={{ marginTop: 16 }} type="inner"title={<IntlMessages id="columns.levels"/>}>
              {levelsState.map((lev,index)=>  <Tag key={index} color="blue">{lev}</Tag>)}
              </Card>
              </Col>
              <Col xl={12} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
              <Card style={{ marginTop: 16 }} type="inner"title={<IntlMessages id="columns.materials"/>}>
              {subjectsState.map((sub , index)=>  <Tag key={index}  color="blue">{sub}</Tag>)}
              </Card>
              </Col>
              </Row>

              <Row>
              <Col xl={12} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
              <Card style={{ marginTop: 16 }} type="inner"  title="الصورة الشخصية" >
                  <Card  
                    cover={<img alt="example" src={`/teachers/${image}`} />} style={{ marginTop: 16 }} type="inner" >
                  </Card>
              </Card>
              </Col>

              <Col xl={12} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
              <Card style={{ marginTop: 16 }} type="inner"  title="صورة البطاقة الشخصية" >
                  <Card  
                    cover={<img alt="example" src={`/teachers/${personalCard}`} />} style={{ marginTop: 16 }} type="inner" >
                  </Card>
              </Card>
              </Col>

              <Col xl={12} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
              <Card style={{ marginTop: 16 }} type="inner"  title="صورة الشهادة" >
                  <Card  
                    cover={<img alt="example" src={`/teachers/${certificate}`} />} style={{ marginTop: 16 }} type="inner" >
                  </Card>
              </Card>
              </Col>
              </Row>
          </Card>
          </div>
        </div>
      </Modal>
    );
}

export default React.memo(ShowTeacher);
