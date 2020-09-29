import React from "react";
import { Button, Card, Table , Col , Row , Popconfirm , message , Divider , Space , Input } from "antd";
import IntlMessages from "util/IntlMessages";
import Highlighter from 'react-highlight-words';
import {SearchOutlined , PlusCircleFilled, DeleteOutlined , EditOutlined } from "@ant-design/icons";
import AddLevel from "components/level/AddLevel";
import EditLevel from "components/level/EditLevel";
import { connect } from "react-redux";
import { fetchLevels , CreateLevel , UpdateLevel , DeleteLevel } from "../../../appRedux/actions/Levels";
import { FormattedMessage } from "react-intl";


class Levels extends React.Component {

  state = {
    selectedRowKeys: [], // Check here to configure the CRM column
    loading: false,
    level:{
      name:''
    },
    addLevelState:false,
    editLevelState:false,
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
    this.props.fetchLevels()
  }

  onToggleModal = (modal) => {
    this.setState(state => ({
      [modal]:!state[modal],
    }));
  }

  onEditLevel = (data) => {
    this.setState({level:data}, ()=>{
      this.onToggleModal("editLevelState");
    })
  };

  onAddLevel = async (data) => {
    await this.props.CreateLevel({data})
    message.success('تمت العملية بنجاح')
    await this.props.fetchLevels()
  };

  onSaveLevel = async (data) => {
    await this.props.UpdateLevel({data})
    message.success('تمت العملية بنجاح')
    await this.props.fetchLevels()
  };

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  cancel = (e) => {
    this.setState({ selectedRowKeys:[]  });
  } 

  confirm = (ids) => {
    this.setState({ loading: true });
    this.props.DeleteLevel({ids})
    .then( async ()=>{
      await this.props.fetchLevels()
      message.success('تم حذف المستوى');
      this.setState({ loading: false , selectedRowKeys:[]});
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

  render() {

    const columns = [{
      title: <IntlMessages id="columns.name"/>,
      dataIndex: 'name',
      align:'right',
      ...this.getColumnSearchProps('name')
    },{
      title: <IntlMessages id="columns.operation"/>, dataIndex: '', key: 'x', render: (data) => (
        <span>
          <Button onClick={() => this.onEditLevel(data)}  type="primary" icon={<EditOutlined />} > تعديل </Button>
        </span>
      ),
     align:'right'
    }];
    
    const { loading, selectedRowKeys , level, visible } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <Row>
       <Col span={24}>
        <Card title={<h1><IntlMessages id="sidebar.Levels"/></h1>}>
            <Button  onClick={() => this.onToggleModal('addLevelState')} size="large" icon={<PlusCircleFilled />}  type="primary" />
            <Divider type="vertical" />
            <Popconfirm visible={visible} onVisibleChange={this.handleVisibleChange}  placement="topLeft"  title="هل أنت متأكد ؟" onConfirm={ () => this.confirm(selectedRowKeys) } onCancel={this.cancel} okText="نعم" cancelText="لا">
              <Button  size="large" icon={<DeleteOutlined/>} disabled={!hasSelected} type="danger" loading={loading} />
            </Popconfirm>
          <div className="gx-mb-3">
            <span style={{marginLeft: 8}}>
              {hasSelected ? `تم تحديد ${selectedRowKeys.length} عناصر` : ''}
            </span>
          </div>
          <AddLevel open={this.state.addLevelState} onAddLevel={this.onAddLevel} onToggleModal={this.onToggleModal} />
          <EditLevel open={this.state.editLevelState} level={level} onSaveLevel={this.onSaveLevel} onToggleModal={this.onToggleModal} />
          <Table locale={{emptyText:'لا توجد أي بيانات'}} rowKey={record => record.id} dir="rtl" bordered={true} className="gx-table-responsive" rowSelection={rowSelection} columns={columns} dataSource={this.props.levels}/>
        </Card>
      </Col>
    </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    levels: state.levels,
  };
}

export default connect(mapStateToProps, { fetchLevels , CreateLevel , UpdateLevel , DeleteLevel })(Levels)

