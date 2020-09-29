import React from "react";
import {Button, Card, Table  , Row , Col , message , Divider , Popconfirm , Input , Space} from "antd";
import IntlMessages from "util/IntlMessages";
import Highlighter from 'react-highlight-words';
import AddNationality from "components/nationality/AddNationality";
import EditNationality from "components/nationality/EditNationality";
import {SearchOutlined , PlusCircleFilled, DeleteOutlined , EditOutlined } from "@ant-design/icons";
import { fetchNationalities , CreateNationality , UpdateNationality , DeleteNationalities } from "../../../appRedux/actions/Nationalities";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";



class Nationalities extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the CRM column
    loading: false,
    nationality:{
      name:''
    },
    addNationalityState:false,
    editNationalityState:false,
    visible: false,
    searchText: '',
    searchedColumn: ''
  };

  getColumnSearchProps = (dataIndex , handleSearch , handleReset) => ({
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
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          )
          }
       </FormattedMessage>
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            ابحث
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
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
    this.props.fetchNationalities()
  }

  onToggleModal = (modal) => {
    this.setState(state => ({
      [modal]:!state[modal],
    }));
  }

  onEditNationality = (data) => {
    this.setState({nationality:data}, ()=>{
      this.onToggleModal("editNationalityState");
    })
  };

  onAddNationality = async (data) => {
    await this.props.CreateNationality({data})
    message.success('تمت العملية بنجاح')
    await this.props.fetchNationalities()
  };

  onSaveNationality = async (data) => {
    await this.props.UpdateNationality({data})
    message.success('تمت العملية بنجاح')
    await this.props.fetchNationalities()
  };
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  confirm = (ids) => {
    this.setState({ loading: true });
    this.props.DeleteNationalities({ids})
    .then( async ()=>{
      await this.props.fetchNationalities()
      message.success('تم حذف الجنسية');
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
    const {loading, selectedRowKeys , visible , nationality} = this.state;
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
      title: <IntlMessages id="columns.operation"/>, dataIndex: '', key: 'x', render: (data) => (
        <span>
          <Button onClick={() => this.onEditNationality(data)}  type="primary" icon={<EditOutlined />} > تعديل </Button>
        </span>
      ),
     align:'right'
    }];

    return (
      <Row>
       <Col span={24}>
        <Card title={<h1><IntlMessages id="sidebar.Nationalities"/></h1>}>
            <Button onClick={() => this.onToggleModal('addNationalityState')} size="large" icon={<PlusCircleFilled />}  type="primary" />
            <Divider type="vertical" />
            <Popconfirm visible={visible} onVisibleChange={this.handleVisibleChange}  placement="topLeft"  title="هل أنت متأكد ؟" onConfirm={ () => this.confirm(selectedRowKeys) } onCancel={this.cancel} okText="نعم" cancelText="لا">
              <Button  size="large" icon={<DeleteOutlined/>} disabled={!hasSelected} type="danger" loading={loading} />
            </Popconfirm>
          <div className="gx-mb-3">
            <span style={{marginLeft: 8}}>
              {hasSelected ? `تم تحديد ${selectedRowKeys.length} عناصر` : ''}
            </span>
          </div>
          <AddNationality open={this.state.addNationalityState} onAddNationality={this.onAddNationality} onToggleModal={this.onToggleModal} />
          <EditNationality open={this.state.editNationalityState} nationality={nationality} onSaveNationality={this.onSaveNationality} onToggleModal={this.onToggleModal} />
          <Table locale={{emptyText:'لا توجد أي بيانات'}} rowKey={record => record.id}  pagination={{position:'bottom center'}}  bordered={true} className="gx-table-responsive" rowSelection={rowSelection} columns={columns} dataSource={this.props.nationalities}/>
        </Card>
      </Col>
    </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    nationalities: state.nationalities,
  };
}

export default connect(mapStateToProps, { fetchNationalities , CreateNationality , UpdateNationality , DeleteNationalities })(Nationalities)
