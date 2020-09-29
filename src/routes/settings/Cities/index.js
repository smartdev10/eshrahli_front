import React from "react";
import { Button, Card, Table , Col , Row , message , Popconfirm , Divider , Input , Space} from "antd";
import { connect } from "react-redux";
import IntlMessages from "util/IntlMessages";
import Highlighter from 'react-highlight-words';
import { SearchOutlined , PlusCircleFilled , DeleteOutlined , EditOutlined } from "@ant-design/icons";
import AddCity from "components/city/AddCity";
import EditCity from "components/city/EditCity";
import { fetchCities , CreateCity , UpdateCity , DeleteCity } from "../../../appRedux/actions/Cities";
import { FormattedMessage } from "react-intl";


class Cities extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the CRM column
    loading: false,
    city:{},
    addCityState:false,
    editCityState:false,
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
    this.props.fetchCities()
  }

  onToggleModal = (modal) => {
    this.setState(state => ({
      [modal]:!state[modal],
    }));
  }

  onEditCity = (data) => {
    this.setState({city:data}, ()=>{
      this.onToggleModal("editCityState");
    })
  };

  onAddCity = async (data) => {
    await this.props.CreateCity({data})
    message.success('تمت العملية بنجاح')
    await this.props.fetchCities()
  };

  onSaveCity = async (data) => {
    await this.props.UpdateCity({data})
    message.success('تمت العملية بنجاح')
    await this.props.fetchCities()
  };

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  confirm = (ids) => {
    this.setState({ loading: true });
    this.props.DeleteCity({ids})
    .then( async ()=>{
      await this.props.fetchCities()
      message.success('تم حذف المدينة');
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
  cancel = (e) => {
    this.setState({ selectedRowKeys:[]  });
  } 

  render() {
    const {loading, selectedRowKeys , city  , visible} = this.state;
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
          <Button onClick={() => this.onEditCity(data)}  type="primary" icon={<EditOutlined />} > تعديل </Button>
        </span>
      ),
     align:'right'
    }];
    
    return (
      <Row>
       <Col span={24}>
        <Card title={<h1><IntlMessages id="sidebar.Cities"/></h1>}>
            <Button onClick={() => this.onToggleModal('addCityState')} size="large" icon={<PlusCircleFilled />}  type="primary" />
            <Divider type="vertical" />
            <Popconfirm visible={visible} onVisibleChange={this.handleVisibleChange}  placement="topLeft"  title="هل أنت متأكد ؟" onConfirm={ () => this.confirm(selectedRowKeys) } onCancel={this.cancel} okText="نعم" cancelText="لا">
              <Button  size="large" icon={<DeleteOutlined/>} disabled={!hasSelected} type="danger" loading={loading} />
            </Popconfirm>
          <div className="gx-mb-3">
            <span style={{marginLeft: 8}}>
              {hasSelected ? `تم تحديد ${selectedRowKeys.length} عناصر` : ''}
            </span>
          </div>
          <AddCity open={this.state.addCityState} onAddCity={this.onAddCity} onToggleModal={this.onToggleModal} />
          <EditCity open={this.state.editCityState} city={city} onSaveCity={this.onSaveCity} onToggleModal={this.onToggleModal} />
          <Table locale={{emptyText:'لا توجد أي بيانات'}} rowKey={record => record.id} bordered={true} className="gx-table-responsive" rowSelection={rowSelection} columns={columns} dataSource={this.props.cities}/>
        </Card>
      </Col>
    </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    cities: state.cities,
  };
}

export default connect(mapStateToProps,{ fetchCities , CreateCity , UpdateCity , DeleteCity } )(Cities)


