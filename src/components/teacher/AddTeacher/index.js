import React from "react";
import { Input, Modal , Select , Form  , Radio  , Upload , Button, message } from "antd";
import { SaveFilled , UploadOutlined } from "@ant-design/icons";
import IntlMessages from "util/IntlMessages";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { fetchManyLevel } from "../../../appRedux/actions/Levels";


const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const children = [];

for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


const options = [
  {label: 'ذكر', value: 'male'},
  {label: 'أنثى', value: 'female'},
];

class AddTeacher extends React.Component {

  state = {
    name:'',
    mobile:'',
    gender:'',
    password:'',
    city:'',
    nationality:'',
    qualification:'',
    bankiban:'',
    bankname:'',
    image:null,
    certificate:null,
    personalcard:null,
    levels:[],
    subjects:[],
    subjectsState:[],
    other_subjects : [],
    fileList:[],
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    loading:false,
    disabled:true
  }

  handleChangeLevels = async (ids) => {
    this.setState({levels : ids , loading:true})
    const levels = await this.props.fetchManyLevel({ids})
    let subjects = []
    subjects = subjects.concat(...levels.map((level)=> level.subjects))
    if(subjects.length === 0){
      this.setState({disabled : true ,  subjectsState:[] , loading:false})
    }else{
      const distinctedSubjects = [];
      const map = new Map();
      for (const item of subjects) {
          if(!map.has(item.id)){
              map.set(item.id, true);    // set any value to Map
              distinctedSubjects.push({
                  id: item.id,
                  name: item.name,
                  type: item.type
              });
          }
      }
      let filteredSujects = subjects.filter((subj) => this.state.subjectsState.includes(subj.id))
      let originalSubjects = filteredSujects.map((sub) => sub.id)
      this.setState({loading:false , subjects:distinctedSubjects , subjectsState:Array.from(new Set(originalSubjects)) , disabled:false})
    }
  }

  handleChangeSubjects = (subjects) => {
    this.setState({subjectsState:subjects})
  }

  handleChangeOtherSubjects = (other_subjects) => {
    this.setState({other_subjects})
  }

  imageFile = e => {
    console.log('Upload event:', e.file);
    this.setState({image: e.file})
    if (Array.isArray(e)) {
      return e;
    }
  
    return e && e.fileList;
  };

  certificateFile = e => {
    console.log('Upload event:', e.file);
    this.setState({certificate: e.file})
    if (Array.isArray(e)) {
      return e;
    }
  
    return e && e.fileList;
  };

  personalcardFile = e => {
    console.log('Upload event:', e.file);
    this.setState({personalcard: e.file})
    if (Array.isArray(e)) {
      return e;
    }
  
    return e && e.fileList;
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  render() {
    const { onAddTeacher, onToggleModal, open } = this.props;
    const { subjectsState ,  name , password , mobile, fileList , gender , bankiban , bankname , image , personalcard , certificate , nationality , city , qualification , levels , subjects , previewImage , previewTitle , previewVisible , other_subjects , loading , disabled } = this.state;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const props = {
      beforeUpload: () => {
        return false;
      },
    };
    return (
      <Modal
        width={'50%'}
        okText={<SaveFilled />}
        cancelText={ <IntlMessages id="modal.cancelSave"/> }
        title={<IntlMessages id="teacher.addTeacher"/>}
        toggle={onToggleModal} visible={open}
        closable={false}
        onOk={() => {
          if (name === '' ||  password === '' || mobile === '' || gender === '' || bankiban === '' || bankname === '' || image === null || personalcard === null || certificate === null || nationality === '' || city === '' || qualification === '' || levels.length === 0 || subjects.length === 0){
            message.error('المرجو إدخال المعلومات المطلوبة')
            return null
          }else{
              onToggleModal("addTeacherState");
              onAddTeacher({  name , password , mobile , gender , bankiban , bankname , image , personalcard , certificate , nationality , city , qualification , levels , subjects:subjectsState , other_subjects });
              this.setState({ loading:false, disabled:true, name: '' , fileList:[] ,  password:'' , mobile : '' , gender:'' , bankiban:'' ,bankname:'' ,image:null, personalcard:null, certificate:null ,nationality:'', city:'' ,qualification:'', levels: [] , subjects : [] , subjectsState:[] , other_subjects : [] })
          }
        }}
        onCancel={()=> {
          onToggleModal("addTeacherState")
          this.setState({loading:false, disabled:true, name: '' , fileList:[] , password:'' , gender:'' , mobile : '' , bankiban:'' ,bankname:'' ,image:null, personalcard:null, certificate:null ,nationality:'', city:'' ,qualification:'', levels: [] , subjects : [] , subjectsState:[] , other_subjects : [] })
        }}>

        <div  className="gx-modal-box-row">
          <div className="gx-modal-box-form-item">
          <Form  dir="rtl" {...formItemLayout}>
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
              <FormattedMessage id="columns.mobile" defaultMessage="mobile">
              {
                placeholder => (
                  <Form.Item rules={[{ required: true }]}   label={placeholder}>
                    <Input
                    required
                    value={mobile}
                    placeholder={placeholder}
                    onChange={(event) => this.setState({mobile: event.target.value})}
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
                    onChange={(event) => this.setState({bankname: event.target.value})}
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
                    onChange={(event) => this.setState({bankiban: event.target.value})}
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
                      type="password"
                      value={password}
                      placeholder={placeholder}
                      onChange={(event) => this.setState({password: event.target.value})}
                      margin="none"/>
                  </Form.Item>
                  )
                }
              </FormattedMessage>
            </div>
            <div className="gx-form-group">
            <Form.Item label={<IntlMessages id="columns.nationality"/>}>
              <Select value={nationality} placeholder={<IntlMessages id="columns.nationality"/>} onChange={(value) => this.setState({nationality: value})} className="gx-mb-3"   >
                {this.props.nationalities.map((nationality , index)=>  <Option key={index} value={nationality.id}>{nationality.name}</Option>)}
              </Select>
              </Form.Item>
            </div>
            <div className="gx-form-group">
            <Form.Item label={<IntlMessages id="columns.levels"/>}>
                <Select
                  mode="multiple"
                  value={levels}
                  style={{width: '100%'}}
                  placeholder={<IntlMessages id="columns.levels"/>}
                  onChange={this.handleChangeLevels}>
                    {this.props.levels.map((level , index)=>  <Option key={index} value={level.id}>{level.name}</Option>)}
                </Select>
              </Form.Item>
            </div>
            <div className="gx-form-group">
              <Form.Item label={<IntlMessages id="columns.materials"/>}>
                 <Select
                  loading={loading}
                  disabled={disabled}
                  mode="multiple"
                  value={subjectsState}
                  style={{width: '100%'}}
                  placeholder={<IntlMessages id="columns.materials"/>}
                  onChange={this.handleChangeSubjects}>
                  {subjects.filter((subject) => subject.type === 'main').map((subject , index)=>  <Option key={index} value={subject.id}>{subject.name}</Option>)}
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
                  onChange={this.handleChangeOtherSubjects}>
                  {this.props.subjects.filter((subject) => subject.type === 'other').map((subject , index) =>   <Option key={index} value={subject.id}>{subject.name}</Option>)}
                </Select>
              </Form.Item>
            </div>
            <div className="gx-form-group">
            <Form.Item label={<IntlMessages id="columns.city"/>}>
              <Select value={city} placeholder={<IntlMessages id="columns.city"/>}  onChange={(value) => this.setState({city: value})} className="gx-mb-3"   >
                  {this.props.cities.map((city , index)=>  <Option  key={index} value={city.id}>{city.name}</Option>)}
              </Select>
              </Form.Item>
            </div>
            <div className="gx-form-group">
              <Form.Item label={<IntlMessages id="columns.gender"/>}>
                 <RadioGroup onChange={(e)=> this.setState({gender: e.target.value})} options={options} />
              </Form.Item>
            </div>
            <div className="gx-form-group">
             <Form.Item
              name="certificate"
              label=" صورة الشهادة "
              valuePropName="fileList"
              getValueFromEvent={this.certificateFile}
              >
              <Upload fileList={fileList} onPreview={this.handlePreview} {...props} listType="picture-card">
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
              getValueFromEvent={this.personalcardFile}
              >
              <Upload fileList={fileList} onPreview={this.handlePreview} {...props} listType="picture-card">
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
              getValueFromEvent={this.imageFile}
              >
              <Upload fileList={fileList} onPreview={this.handlePreview} {...props}  listType="picture-card">
                <Button icon={<UploadOutlined />}>
                  إضغط لتحميل الصورة
                </Button>
              </Upload>
            </Form.Item>
           </div>
           <div className="gx-form-group">
              <FormattedMessage id="columns.qualification" defaultMessage="mobile">
              {
                placeholder => (
                  <Form.Item rules={[{ required: true }]}  label={placeholder}>
                      <TextArea value={qualification} placeholder={placeholder} onChange={(event) => this.setState({qualification: event.target.value})} dir="rtl" rows={8} />
                  </Form.Item>
                  )
                }
              </FormattedMessage>
            </div>
           </Form>
          </div>
        </div>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    cities: state.cities,
    levels: state.levels,
    subjects: state.subjects,
    nationalities: state.nationalities,
  };
}
export default connect(mapStateToProps , {fetchManyLevel})(AddTeacher)
