import React from "react";
import {Button, Card, Table  , Row , Col , Popconfirm , message , Divider , Input , Space } from "antd";
import IntlMessages from "util/IntlMessages";
import Highlighter from 'react-highlight-words';
import {SearchOutlined , PlusCircleFilled, DeleteOutlined , EditOutlined } from "@ant-design/icons";
import { fetchSubjects , CreateSubject , UpdateSubject , DeleteSubject } from "../../../appRedux/actions/Subjects";
import AddSubject from "components/subject/AddSubject";
import EditSubject from "components/subject/EditSubject";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";


class Subjects extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the CRM column
    loading: false,
    subject:{
      name:''
    },
    addSubjectState:false,
    editSubjectState:false,
    visible: false,
    searchText: '',
    searchedColumn: ''
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
       <FormattedMessage id="columns.name" defaultMessage="name">
          {
            placeholder => (
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
 
  componentDidMount(){
    this.props.fetchSubjects()
  }

  onToggleModal = (modal) => {
    this.setState(state => ({
      [modal]:!state[modal],
    }));
  }

  onEditSubject = (data) => {
    this.setState({subject:data}, ()=>{
      this.onToggleModal("editSubjectState");
    })
  };

  onAddSubject = async (data) => {
    await this.props.CreateSubject({data})
    message.success('تمت العملية بنجاح')
    await this.props.fetchSubjects()
  };

  onSaveSubject = async (data) => {
    await this.props.UpdateSubject({data})
    message.success('تمت العملية بنجاح')
    await this.props.fetchSubjects()
  };

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  confirm = (ids) => {
    this.setState({ loading: true });
    this.props.DeleteSubject({ids})
    .then( async ()=>{
      await this.props.fetchSubjects()
      message.success('تم حذف المادة');
      this.setState({ loading: false , selectedRowKeys:[]});
    }).catch(()=>{
      message.error('عطل أثناء العملية');
      this.setState({ loading: false , selectedRowKeys:[]});
    });   
  }

  cancel = (e) => {
    this.setState({ selectedRowKeys:[]  });
  } 

  handleVisibleChange = (visible) => {
    const { selectedRowKeys  } = this.state;
  
    if (selectedRowKeys.length > 0) {
      this.setState({visible}); 
    }
  };

  render() {
    const {loading, selectedRowKeys , visible , subject} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const columns = [{
      title: <IntlMessages id="columns.name"/>,
      dataIndex: 'name',
      align:'right',
      ...this.getColumnSearchProps('name')
    },{
      title: <IntlMessages id="columns.type"/>,  dataIndex: '', key: 'x', render: ({type}) => (
        <span>
          {type ? type === 'main' ? 'مادة دراسية' : type === 'other' ?  'أخرى'  : 'غير وارد' : 'غير وارد'}
        </span>
      ),
     align:'right'
    },{
      title: <IntlMessages id="columns.operation"/>, dataIndex: '', key: 'x', render: (data) => (
        <span>
          <Button size="middle" onClick={() => this.onEditSubject(data)} type="primary" icon={<EditOutlined />} > تعديل </Button>
        </span>
      ),
     align:'right'
    }];

    
    return (
      <Row>
       <Col span={24}>
        <Card title={<h1><IntlMessages id="sidebar.Materials"/></h1>}>
            <Button  onClick={() => this.onToggleModal('addSubjectState')} size="large" icon={<PlusCircleFilled />}  type="primary" />
            <Divider type="vertical" />
            <Popconfirm visible={visible} onVisibleChange={this.handleVisibleChange}  placement="topLeft"  title="هل أنت متأكد ؟" onConfirm={ () => this.confirm(selectedRowKeys) } onCancel={this.cancel} okText="نعم" cancelText="لا">
              <Button size="large"  icon={<DeleteOutlined/>} disabled={!hasSelected} type="danger" loading={loading} />
            </Popconfirm>
          <div className="gx-mb-3">
            <span style={{marginLeft: 8}}>
              {hasSelected ? `تم تحديد ${selectedRowKeys.length} عناصر` : ''}
            </span>
          </div>
          <AddSubject open={this.state.addSubjectState} onAddSubject={this.onAddSubject} onToggleModal={this.onToggleModal} />
          <EditSubject open={this.state.editSubjectState} subject={subject} onSaveSubject={this.onSaveSubject} onToggleModal={this.onToggleModal} />
          <Table locale={{emptyText:'لا توجد أي بيانات'}} rowKey={record => record.id} direction="rtl"  bordered={true} className="gx-table-responsive" rowSelection={rowSelection} columns={columns} dataSource={this.props.subjects}/>
        </Card>
      </Col>
    </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    subjects: state.subjects,
  };
}

export default connect(mapStateToProps, { fetchSubjects , CreateSubject , UpdateSubject , DeleteSubject })(Subjects)
