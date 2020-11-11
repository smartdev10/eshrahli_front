import React from "react";
import { Button, Card, Table , Col , Row, Divider , message , Popconfirm , Switch , Input , Space } from "antd";
import IntlMessages from "util/IntlMessages";
import Highlighter from 'react-highlight-words';
import { DollarOutlined , SearchOutlined , PlusCircleFilled, DeleteOutlined , EditOutlined, EyeFilled , CheckCircleTwoTone , ExclamationCircleTwoTone} from "@ant-design/icons";
import { connect } from "react-redux";
import { fetchTeachers , CreateTeacher , UpdateTeacher, DeleteTeachers , UpdateTeacherStatus } from "../../../appRedux/actions/Teachers";
import { fetchSubjects } from "../../../appRedux/actions/Subjects";
import { fetchLevels } from "../../../appRedux/actions/Levels";
import { fetchCities } from "../../../appRedux/actions/Cities";
import { fetchNationalities } from "../../../appRedux/actions/Nationalities";
import { fetchSettings } from "../../../appRedux/actions/Settings";
import AddTeacher from "components/teacher/AddTeacher";
import EditTeacher from "components/teacher/EditTeacher";
import ShowTeacher from "components/teacher/ShowTeacher";
import PropTypes from "prop-types";
import ShowTeachEarnings from "components/teacher/ShowTeachEarnings";

class Teachers extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the CRM column
    loading: false,
    loadingTable:false,
    teacher:{},
    addTeacherState:false,
    editTeacherState:false,
    showTeacherState:false,
    showTeacherEarnState:false,
    visible: false,
    searchText: '',
    searchedColumn: ''
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`ابحث`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            ابحث
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          إلغاء
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  onToggleModal = (modal) => {
    this.setState(state => ({
      [modal]:!state[modal],
    }));
  }

  async componentDidMount() {
    this.setState({ loadingTable:true })
    await this.props.fetchTeachers()
    await this.props.fetchCities()
    await this.props.fetchLevels()
    await this.props.fetchSubjects()
    await this.props.fetchNationalities()
    this.setState({ loadingTable:false })
  }

  onEditTeacher = (teacher) => {
    this.setState({teacher}, ()=>{
      this.onToggleModal("editTeacherState");
    })
  };

  onShowTeacher = (teacher) => {
    this.setState({teacher}, ()=>{
      this.onToggleModal("showTeacherState");
    })
  };

  onShowTeacherEarnings = (teacher) => {
    this.props.fetchSettings()
    this.setState({teacher}, ()=>{
      this.onToggleModal("showTeacherEarnState");
    })
  };


  onAddTeacher = async (data) => {
    const formData = new FormData();
    for (const key of Object.keys(data)) {
      if(Array.isArray(data[key])){
        let arr = data[key]
        for (var i = 0; i < arr.length; i++) {
          formData.append(`${key}[]`, arr[i]);
        }
      }else{
        formData.append(key,data[key])
      }
    }
    this.setState({  loadingTable:true });
    await this.props.CreateTeacher({data:formData})
    message.success('تمت العملية بنجاح')
    await this.props.fetchTeachers()
    this.setState({  loadingTable:false });
  };

  onSaveTeacher = async (data) => {
    console.log(data)
    const formData = new FormData();
    for (const key of Object.keys(data)) {
      if(Array.isArray(data[key])){
        let arr = data[key]
        for (var i = 0; i < arr.length; i++) {
          formData.append(`${key}[]`, arr[i]);
        }
      }else{
        formData.append(key,data[key])
      }
    }
    this.setState({  loadingTable:true });
    await this.props.UpdateTeacher({data:formData})
    message.success('تمت العملية بنجاح')
    await this.props.fetchTeachers()
    this.setState({  loadingTable:false });
  };
 
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  confirm = (ids) => {
    this.setState({ loading: true , loadingTable:true });
    this.props.DeleteTeachers({ids})
    .then( async ()=>{
      await this.props.fetchTeachers()
      message.success('تم حذف المدرس');
      this.setState({  loadingTable:false , loading: false , selectedRowKeys:[]});
    }).catch(()=>{
      message.error('عطل أثناء العملية');
      this.setState({  loadingTable:false , loading: false , selectedRowKeys:[]});
    });   
  }

  handleVisibleChange = (visible) => {
    const { selectedRowKeys  } = this.state;
  
    if (selectedRowKeys.length > 0) {
      this.setState({visible}); 
    }
  };
  cancel = () => {
    this.setState({ selectedRowKeys:[]  });
  } 

  render() {
    const { loading, selectedRowKeys , visible , teacher , loadingTable , showTeacherState , showTeacherEarnState , editTeacherState } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const columns = [{
      title: <IntlMessages id="columns.name"/>,
      dataIndex: 'name',
      align:'right',
      ...this.getColumnSearchProps('name'),
    }, {
      title: <IntlMessages id="columns.mobile"/>,
      dataIndex: 'mobile',
      align:'right',
      ...this.getColumnSearchProps('mobile'),
    },{
      title:  <IntlMessages id="columns.nationality"/>,
      dataIndex: 'nationality',
      key: 'nationality' , render: (nationality) => nationality.name, 
      align:'right'
    },{
      title: <IntlMessages id="columns.city"/>,
      dataIndex: 'city',
      key: 'city' , render: (city) => city.name, 
      align:'right',
    },{
      title: <IntlMessages id="columns.gender"/>,  dataIndex: '', key: 'x', render: ({gender}) => (
        <span>
          {gender ? gender === 'male' ? 'ذكر' : 'أنثى' : 'غير وارد'}
        </span>
      ),
     align:'right'
    },{
      title: <IntlMessages id="columns.status"/>,  dataIndex: '', key: 'x', render: ({status}) => (
        <span>
          {status === 'active' ? <CheckCircleTwoTone twoToneColor="#40a9ff"  /> :  <ExclamationCircleTwoTone twoToneColor="#eb2f96" /> }
        </span>
      ),
     align:'right'
    },
    {
      title: 'تعديل الحالة', dataIndex: '', key: '', render: ({status , id}) => (
         <Switch checkedChildren="مفعل" unCheckedChildren="غير مفعل"  defaultChecked={status === "active" ? true : false}  onChange={(checked) => {
          let status = checked ? "active" : "inactive"
          this.setState({loadingTable:true}); 
          this.props.UpdateTeacherStatus({data:{status , id}})
          .then(async()=> {
            this.props.fetchTeachers().then(()=>{
              message.success('تمت العملية بنجاح')
              this.setState({loadingTable:false}); 
            })
          })
          .catch(()=> {
            message.error('عطل أثناء التعديل')
            this.setState({loadingTable:false}); 
          }, 2000);
         } } />
      ) , align :'right' , width :"500"
    },{
      title: <IntlMessages id="columns.operation"/>, dataIndex: '', key: 'x', render: (teacher) => (
        <span>
          <Button onClick={() => this.onEditTeacher(teacher)} dir="rtl" type="primary" icon={<EditOutlined />}> تعديل </Button>
          <Divider type="vertical"/>
          <Button onClick={() => this.onShowTeacher(teacher)}  dir="rtl" type="primary" icon={<EyeFilled />} > تفاصيل </Button>
          <Divider type="vertical"/>
          <Button onClick={() => this.onShowTeacherEarnings(teacher)}  dir="rtl" type="primary" icon={<DollarOutlined />} > الحصيلة </Button>
        </span>
      ),
     align:'right'
    }];


    return (
      <Row>
       <Col span={24}>
        <Card title={<h1><IntlMessages id="sidebar.Teachers"/></h1>}>
            <Button  onClick={() => this.onToggleModal('addTeacherState')} size="large" icon={<PlusCircleFilled />}  type="primary" />
            <Divider type="vertical"/>
            <Popconfirm visible={visible} onVisibleChange={this.handleVisibleChange}  placement="topLeft"  title="هل أنت متأكد ؟" onConfirm={ () => this.confirm(selectedRowKeys) } onCancel={this.cancel} okText="نعم" cancelText="لا">
              <Button  size="large" icon={<DeleteOutlined/>} disabled={!hasSelected} type="danger" loading={loading} />
            </Popconfirm>
          <div className="gx-mb-3">  
            <span style={{marginLeft: 8}}>
              {hasSelected ? `تم تحديد ${selectedRowKeys.length} عناصر` : ''}
            </span>
          </div>
          <AddTeacher open={this.state.addTeacherState} onAddTeacher={this.onAddTeacher} onToggleModal={this.onToggleModal} />
          {editTeacherState && <EditTeacher open={this.state.editTeacherState} teacher={teacher} onSaveTeacher={this.onSaveTeacher} onToggleModal={this.onToggleModal} />}
          {showTeacherState && <ShowTeacher open={this.state.showTeacherState} teacher={teacher} onToggleModal={this.onToggleModal} />}
          {showTeacherEarnState && <ShowTeachEarnings open={this.state.showTeacherEarnState} teacher={teacher} onToggleModal={this.onToggleModal} />}
          <Table locale={{emptyText:'لا توجد أي بيانات'}} loading={loadingTable} rowKey={record => record.id}  bordered={true} className="gx-table-responsive" rowSelection={rowSelection} columns={columns} dataSource={this.props.teachers}/>
        </Card>
      </Col>
    </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    teachers: state.teachers,
  };
}
export default connect(mapStateToProps, { fetchSettings , UpdateTeacherStatus, fetchTeachers , CreateTeacher , UpdateTeacher, DeleteTeachers , fetchCities , fetchLevels , fetchSubjects , fetchNationalities })(Teachers)

Teachers.propTypes = {
  fetchSettings: PropTypes.func,
  UpdateTeacherStatus: PropTypes.func,
  fetchTeachers: PropTypes.func,
  CreateTeacher: PropTypes.func,
  UpdateTeacher: PropTypes.func,
  DeleteTeachers: PropTypes.func,
  fetchCities: PropTypes.func,
  fetchLevels: PropTypes.func,
  fetchSubjects: PropTypes.func,
  fetchNationalities: PropTypes.func,
  teachers: PropTypes.array,
};
