import React from "react";
import {Button, Card, Table , Row , Col , Divider , message , Popconfirm , Switch ,  Input , Space } from "antd";
import IntlMessages from "util/IntlMessages";
import Highlighter from 'react-highlight-words';
import {SearchOutlined, PlusCircleFilled, DeleteOutlined , EditOutlined , CheckCircleTwoTone , ExclamationCircleTwoTone } from "@ant-design/icons";
import AddStudent from "components/student/AddStudent";
import EditStudent from "components/student/EditStudent";
import { connect } from "react-redux";
import { fetchStudents , CreateStudent , UpdateStudent, DeleteStudents } from "../../../appRedux/actions/Students";
import { FormattedMessage } from "react-intl";
import { fetchCities } from "../../../appRedux/actions/Cities";
import PropTypes from "prop-types";

class Students extends React.Component {

  state = {
    selectedRowKeys: [], // Check here to configure the CRM column
    loading: false,
    student:{},
    loadingTable:false,
    addStudentState:false,
    editStudentState:false,
    visible: false,
    searchText: '',
    searchedColumn: ''
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <FormattedMessage id="columns.name" defaultMessage="name">
          {
            () => (
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
          )
          }
       </FormattedMessage>
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

  componentDidMount() {
    this.props.fetchStudents()
    this.props.fetchCities()
    this.setState({ loading:false })
  }

  onEditStudent = (data) => {
    this.setState({student:data}, ()=>{
      this.onToggleModal("editStudentState");
    })
  };

  onAddStudent = async (data) => {
    await this.props.CreateStudent({data})
    message.success('تمت العملية بنجاح')
    await this.props.fetchStudents()
  };

  onSaveStudent = async (data) => {
    this.setState({loadingTable:true}); 
    await this.props.UpdateStudent({data})
    message.success('تمت العملية بنجاح')
    await this.props.fetchStudents()
    this.setState({loadingTable:false}); 

  };

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  confirm = (ids) => {
    this.setState({ loading: true });
    this.props.DeleteStudents({ids})
    .then( async ()=>{
      this.setState({ loading: false , selectedRowKeys:[]});
      message.success('تم حذف الطالب');
      this.setState({ loadingTable: true });
      await this.props.fetchStudents()
      this.setState({ loadingTable: false });
    }).catch(()=>{
      message.error('عطل أثناء العملية');
      this.setState({ loading: false , selectedRowKeys:[]});
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
    const {loading, selectedRowKeys , student , visible , loadingTable} = this.state;
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
    },{
      title: <IntlMessages id="columns.mobile"/>,
      dataIndex: 'mobile',
      align:'right',
      ...this.getColumnSearchProps('mobile'),
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
      title: 'تعديل الحالة', dataIndex: '', key: '', render: ({status , name , mobile , id}) => (
         <Switch  checkedChildren="مفعل" unCheckedChildren="غير مفعل"   defaultChecked={status === "active" ? true : false}  onChange={(checked) => {
          let status = checked ? "active" : "inactive"
          this.setState({loadingTable:true}); 
          this.props.UpdateStudent({data:{status , name , password:'' , mobile , id}})
          .then(async()=> {
            this.props.fetchStudents().then(()=>{
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
      title: <IntlMessages id="columns.operation"/>, dataIndex: '', key: 'x', render: (data) => (
        <span>
          <Button onClick={() => this.onEditStudent(data)} dir="rtl" type="primary" icon={<EditOutlined />} >تعديل</Button>
        </span>
      ),
     align:'right'
    }];

    return (
      <Row>
       <Col span={24}>
        <Card title={<h1><IntlMessages id="sidebar.Students"/></h1>}>
            <Button  onClick={() => this.onToggleModal('addStudentState')} size="large" icon={<PlusCircleFilled />}  type="primary" />
            <Divider type="vertical" />
            <Popconfirm visible={visible} onVisibleChange={this.handleVisibleChange}  placement="topLeft"  title="هل أنت متأكد ؟" onConfirm={ () => this.confirm(selectedRowKeys) } onCancel={this.cancel} okText="نعم" cancelText="لا">
              <Button  size="large" icon={<DeleteOutlined/>} disabled={!hasSelected} type="danger" loading={loading} />
            </Popconfirm>
          <div className="gx-mb-3">
            <span style={{marginLeft: 8}}>
              {hasSelected ? `تم تحديد ${selectedRowKeys.length} عناصر` : ''}
            </span>
          </div>
          <AddStudent open={this.state.addStudentState} onAddStudent={this.onAddStudent} onToggleModal={this.onToggleModal} />
          <EditStudent open={this.state.editStudentState} student={student} onSaveStudent={this.onSaveStudent} onToggleModal={this.onToggleModal} />
          <Table locale={{emptyText:'لا توجد أي بيانات'}} loading={loadingTable} rowKey={record => record.id} bordered={true} className="gx-table-responsive" rowSelection={rowSelection} columns={columns} dataSource={this.props.students}/>
        </Card>
      </Col>
    </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    students: state.students,
  };
}
export default connect(mapStateToProps, { fetchStudents ,  CreateStudent , UpdateStudent, DeleteStudents , fetchCities })(Students)

Students.propTypes = {
  fetchStudents: PropTypes.func,
  CreateStudent: PropTypes.func,
  UpdateStudent: PropTypes.func,
  DeleteStudents: PropTypes.func,
  fetchCities: PropTypes.func,
  students: PropTypes.array,
};
