import React from "react";
import { Button, Card, Table , Col , Row , message , Input , Space} from "antd";
import { connect } from "react-redux";
import IntlMessages from "util/IntlMessages";
import Highlighter from 'react-highlight-words';
import { SearchOutlined , EditOutlined } from "@ant-design/icons";
import AddSetting from "components/setting/AddSetting";
import EditSetting from "components/setting/EditSetting";
import { fetchSettings , CreateSetting , UpdateSetting , DeleteSetting } from "../../../appRedux/actions/Settings";
import { FormattedMessage } from "react-intl";


class Settings extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the CRM column
    loading: false,
    setting:{},
    addSettingState:false,
    editSettingState:false,
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
    this.props.fetchSettings()
  }

  onToggleModal = (modal) => {
    this.setState(state => ({
      [modal]:!state[modal],
    }));
  }

  onEditSetting = (data) => {
    this.setState({setting:data}, ()=>{
      this.onToggleModal("editSettingState");
    })
  };

  onAddSetting = async (data) => {
    await this.props.CreateSetting({data})
    message.success('تمت العملية بنجاح')
    await this.props.fetchSettings()
  };

  onSaveSetting = async (data) => {
    await this.props.UpdateSetting({data})
    message.success('تمت العملية بنجاح')
    await this.props.fetchSettings()
  };

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  confirm = (ids) => {
    this.setState({ loading: true });
    this.props.DeleteSetting({ids})
    .then( async ()=>{
      await this.props.fetchSettings()
      message.success('تم حذف المدينة');
      this.setState({ loading: false , selectedRowKeys:[]});
    }).catch(()=>{
      message.error('عطل أثناء العملية');
      this.setState({ loading: false , selectedRowKeys:[]});
    });   
  }


  render() {
    const { setting } = this.state;
  
    const columns = [{
      title: <IntlMessages id="columns.name"/>,
      dataIndex: 'name',
      align:'right',
      ...this.getColumnSearchProps('name')
    },{
      title: <IntlMessages id="columns.value"/>, dataIndex: '', align:'right', render: ({numberValue}) => (
        <span>
         { numberValue }
        </span>
      ),
    },{
      title: <IntlMessages id="columns.operation"/>, dataIndex: '', key: 'x', render: (data) => (
        <span>
          <Button onClick={() => this.onEditSetting(data)}  type="primary" icon={<EditOutlined />} > تعديل </Button>
        </span>
      ),
     align:'right'
    }];
    
    return (
      <Row>
       <Col span={24}>
        <Card title={<h1><IntlMessages id="general"/></h1>}>
            {/* <Button onClick={() => this.onToggleModal('addSettingState')} size="large" icon={<PlusCircleFilled />}  type="primary" /> */}
            {/* <Divider type="vertical" /> */}
          <AddSetting open={this.state.addSettingState} onAddSetting={this.onAddSetting} onToggleModal={this.onToggleModal} />
          <EditSetting open={this.state.editSettingState} setting={setting} onSaveSetting={this.onSaveSetting} onToggleModal={this.onToggleModal} />
          <Table locale={{emptyText:'لا توجد أي بيانات'}} rowKey={record => record.id} bordered={true} className="gx-table-responsive"  columns={columns} dataSource={this.props.settings}/>
        </Card>
      </Col>
    </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.app_settings,
  };
}

export default connect(mapStateToProps,{ fetchSettings , CreateSetting , UpdateSetting , DeleteSetting } )(Settings)


