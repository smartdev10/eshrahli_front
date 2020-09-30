import React , { useState , useEffect } from "react";
import { Input, Modal , Upload , Select , Form , Radio , Button } from "antd";
import { SaveFilled , UploadOutlined } from "@ant-design/icons";
import IntlMessages from "util/IntlMessages";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";


const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const EditTeacher = ({ onSaveTeacher, onToggleModal, open, teacher }) => {

    const nationalities = useSelector(state => state.nationalities)
    const cities = useSelector(state => state.cities)
    const subjectsState = useSelector(state => state.subjects)
    const levelsState = useSelector(state => state.levels)


  
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [bankname, setBankName] = useState('')
    const [bankiban, setBankIban] = useState('')
    const [nationality, setNationality] = useState('')
    const [password, setPassword] = useState('')
    const [subjects, setSubjects] = useState([])
    const [other_subjects, setOther] = useState([])
    const [levels, setLevels] = useState([])
    const [city, setCity] = useState('')
    const [qualification, setQualification] = useState('')
    const [gender, setGender] = useState('')
    const [image , setImage] = useState(null)
    const [certificate , setCertificate] = useState(null)
    const [personalcard , setPersonalCard] = useState(null)

    const [fileList, setFileList] = useState([])


    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')

    useEffect(() => {
      if(Object.keys(teacher).length !== 0){
        console.log(teacher)
        setName(teacher.name)
        setMobile(teacher.mobile)
        setBankName(teacher.bankname)
        setBankIban(teacher.bankiban)
        setNationality(teacher.nationality.id)
        setCity(teacher.city.id)
        setQualification(teacher.qualification)
        setGender(teacher.gender)
        let subjects = teacher.subjects.map((sub)=> sub.id)
        let other_subjects = teacher.other_subjects.map((sub)=> sub.id)
        let levels = teacher.levels.map((lev)=> lev.id)
        setSubjects(subjects)
        setOther(other_subjects)
        setLevels(levels)
      }
    }, [teacher])

    const handleChangeLevels = (levels) => {
      console.log(levels)
      setLevels(levels)
    }
  
    const  handleChangeSubjects = (subjects) => {
     setSubjects(subjects)
    }

    const  handleChangeOtherSubjects = (subjects) => {
      setOther(subjects)
     }

    const imageFile = e => {
      console.log('Upload event:', e.file);
     setImage(e.file)
      if (Array.isArray(e)) {
        return e;
      }
    
      return e && e.fileList;
    };
  
    const certificateFile = e => {
      console.log('Upload event:', e.file);
      setCertificate(e.file)
      if (Array.isArray(e)) {
        return e;
      }
    
      return e && e.fileList;
    };
  
    const personalcardFile = e => {
      console.log('Upload event:', e.file);
      setPersonalCard(e.file)
      if (Array.isArray(e)) {
        return e;
      }
    
      return e && e.fileList;
    };
  
    const handleCancel = () => setPreviewVisible(false);
  
    const handlePreview = async file => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreviewVisible(true)
      setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
      setPreviewImage(file.url || file.preview)
    };

    const props = {
      beforeUpload: () => {
        return false;
      },
    };

    return (
      <Modal
        width={'70%'}
        okText={<SaveFilled />}
        cancelText={ <IntlMessages id="modal.cancelSave"/> }
        title={<IntlMessages id="teacher.saveTeacher"/>}
        toggle={onToggleModal} 
        visible={open}
        closable={false}
        onOk={() => {
          if (name === ''| mobile === '' | bankiban === ''  | bankname === '' | gender === '' | nationality === '' | city === '' | qualification === '')
            return;
          onToggleModal("editTeacherState");
          onSaveTeacher({ id:teacher.id , name , mobile , password , bankiban , bankname , gender , image , certificate , personalcard , nationality , city , subjects , other_subjects, levels , qualification });
          setPassword('')
        }}
        onCancel={()=> {
          onToggleModal('editTeacherState')
          setName(teacher.name)
          setMobile(teacher.mobile)
          setBankName(teacher.bankname)
          setBankIban(teacher.bankiban)
          setPassword('')
          setNationality(teacher.nationality.id)
          setCity(teacher.city.id)
          setQualification(teacher.qualification)
          setGender(teacher.gender)
          let subjects = teacher.subjects.map((sub)=> sub.id)
          let levels = teacher.levels.map((lev)=> lev.id)
          let other_subjects = teacher.other_subjects.map((sub)=> sub.id)
          setOther(other_subjects)
          setSubjects(subjects)
          setLevels(levels)
          setFileList([])
        }}>
   
        <div  className="gx-modal-box-row">
          <div className="gx-modal-box-form-item">
          <Form dir="rtl" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} >
            <div className="gx-form-group">
              <FormattedMessage id="columns.name" defaultMessage="name">
              {
                placeholder => (
                  <Form.Item rules={[{ required: true }]}   label={placeholder}>
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
              <FormattedMessage id="columns.mobile" defaultMessage="mobile">
              {
                placeholder => (
                  <Form.Item rules={[{ required: true }]}   label={placeholder}>
                    <Input
                    required
                    value={mobile}
                    placeholder={placeholder}
                    onChange={(event) => setMobile(event.target.value)}
                    margin="none"/>
                  </Form.Item>
                  )
                }
              </FormattedMessage>
            </div>
            <div className="gx-form-group">
              <FormattedMessage id="columns.bankname" defaultMessage="bankname">
              {
                placeholder => (
                  <Form.Item rules={[{ required: true }]}   label={placeholder}>
                    <Input
                    required
                    value={bankname}
                    placeholder={placeholder}
                    onChange={(event) => setBankName(event.target.value)}
                    margin="none"/>
                  </Form.Item>
                  )
                }
              </FormattedMessage>
            </div>
            <div className="gx-form-group">
              <FormattedMessage id="columns.bankiban" defaultMessage="bankiban">
              {
                placeholder => (
                  <Form.Item rules={[{ required: true }]}   label={placeholder}>
                    <Input
                    required
                    value={bankiban}
                    placeholder={placeholder}
                    onChange={(event) => setBankIban(event.target.value)}
                    margin="none"/>
                  </Form.Item>
                  )
                }
              </FormattedMessage>
            </div>
            <div className="gx-form-group">
              <FormattedMessage id="columns.password" defaultMessage="password">
              {
                placeholder => (
                  <Form.Item rules={[{ required: true }]}   label={placeholder}>
                    <Input
                    required
                    value={password}
                    placeholder={placeholder}
                    onChange={(event) => setPassword(event.target.value)}
                    margin="none"/>
                  </Form.Item>
                  )
                }
              </FormattedMessage>
            </div>

            <div className="gx-form-group">
            <Form.Item label={<IntlMessages id="columns.levels"/>}>
                <Select
                  mode="multiple"
                  value={levels}
                  style={{width: '100%'}}
                  placeholder={<IntlMessages id="columns.levels"/>}
                  onChange={handleChangeLevels}>
                    {levelsState.map((level , index)=>  <Option key={index} value={level.id}>{level.name}</Option>)}
                </Select>
              </Form.Item>
            </div>
            
            <div className="gx-form-group">
            <Form.Item label={<IntlMessages id="columns.materials"/>}>
                 <Select
                  mode="multiple"
                  value={subjects}
                  style={{width: '100%'}}
                  placeholder={<IntlMessages id="columns.materials"/>}
                  onChange={handleChangeSubjects}>
                  {subjectsState.filter((subject) => subject.type === 'main').map((subject , index)=>  <Option key={index} value={subject.id}>{subject.name}</Option>)}
                </Select>
              </Form.Item>
            </div>
            <div className="gx-form-group">
            <Form.Item label={<IntlMessages id="columns.other"/>}>
                 <Select
                  mode="multiple"
                  value={other_subjects}
                  style={{width: '100%'}}
                  placeholder={<IntlMessages id="columns.other"/>}
                  onChange={handleChangeOtherSubjects}>
                  {subjectsState.filter((subject) => subject.type === 'other').map((subject , index)=>  <Option key={index} value={subject.id}>{subject.name}</Option>)}
                </Select>
              </Form.Item>
            </div>
            <div className="gx-form-group">
            <Form.Item label={<IntlMessages id="columns.nationality"/>}>
              <Select placeholder={<IntlMessages id="columns.nationality"/>} value={nationality}  onChange={(value) => setNationality(value)} className="gx-mb-3"   >
                {nationalities.map((nationality , index)=>  <Option key={index} value={nationality.id}>{nationality.name}</Option>)}
              </Select>
              </Form.Item>
            </div>
            <div className="gx-form-group">
            <Form.Item label={<IntlMessages id="columns.city"/>}>
              <Select value={city}   onChange={(value) => setCity(value)} className="gx-mb-3"   >
                  {cities.map((city , index)=>  <Option  key={index} value={city.id}>{city.name}</Option>)}
              </Select>
              </Form.Item>
            </div>
            <div className="gx-form-group">
              <Form.Item label={<IntlMessages id="columns.gender"/>}>
                 <RadioGroup value={gender}   onChange={(event) => setGender(event.target.value)} options={[
                      {label: 'ذكر', value: 'male'},
                      {label: 'أنثى', value: 'female'},
                    ]} />
              </Form.Item>
            </div>
            <div className="gx-form-group">
              <FormattedMessage id="columns.qualification" defaultMessage="mobile">
              {
                placeholder => (
                  <Form.Item  rules={[{ required: true }]}  label={placeholder}>
                      <TextArea value={qualification}  onChange={(event) => setQualification(event.target.value)} dir="rtl" rows={8} />
                  </Form.Item>
                  )
                }
              </FormattedMessage>
            </div>
            <div className="gx-form-group">
             <Form.Item
              name="certificate"
              label=" صورة الشهادة "
              valuePropName="fileList"
              getValueFromEvent={certificateFile}
              >
              <Upload  fileList={fileList} onPreview={handlePreview} {...props} listType="picture-card">
                <Button icon={<UploadOutlined />}>
                  إضغط لتحميل الصورة
                </Button>
              </Upload>
            </Form.Item>
           </div>
           <div className="gx-form-group">
             <Form.Item
              name="personalCard"
              label=" صورة البطاقة الشخصية "
              valuePropName="fileList"
              getValueFromEvent={personalcardFile}
              >
              <Upload  fileList={fileList} onPreview={handlePreview} {...props} listType="picture-card">
                <Button icon={<UploadOutlined />} >
                 إضغط لتحميل الصورة
                </Button>
              </Upload>
            </Form.Item>
           </div>
           <div className="gx-form-group">
             <Form.Item
              name="image"
              label=" الصورة الشخصية "
              valuePropName="fileList"
              getValueFromEvent={imageFile}
              >
              <Upload  fileList={fileList} onPreview={handlePreview} {...props}  listType="picture-card">
                <Button icon={<UploadOutlined />}>
                  إضغط لتحميل الصورة
                </Button>
              </Upload>
            </Form.Item>
           </div>
           </Form>
          </div>
        </div>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Modal>
    );
}

export default React.memo(EditTeacher);
