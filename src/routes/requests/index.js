import React from "react";
import { Button, Card, Table , Col , Row , Input , Space } from "antd";
import IntlMessages from "util/IntlMessages";
import { EyeFilled , SearchOutlined } from "@ant-design/icons";
import { fetchRequests } from "../../appRedux/actions/Requests";
import ShowRequest from "components/requests/ShowRequest";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Highlighter from 'react-highlight-words';



class Requests extends React.Component {

  state = {
    selectedRowKeys: [], // Check here to configure the CRM column
    loading: false,
    onShowRequestState: false,
    request:{}
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
 
  onToggleModal = (modal) => {
    this.setState(state => ({
      [modal]:!state[modal],
    }));
  }
 
  componentDidMount(){
    this.setState({loading:true})
    this.props.fetchRequests()
    this.setState({loading:false})
  }


  onShowRequest = (request) => {
    this.setState({request} , () => {
        this.onToggleModal('onShowRequestState')
    })
  }

  render() {
    const { loading, selectedRowKeys , request} = this.state;
   
    const hasSelected = selectedRowKeys.length > 0;

    const columns = [{
      title: <IntlMessages id="columns.id"/>,
      dataIndex: 'id',
      align:'right',
      ...this.getColumnSearchProps('id')
    },{
      title: <IntlMessages id="columns.studentName"/>,  dataIndex: '', key: 'x', render: ({student}) => (
        <span>
          {student && student.name ? student.name : 'غير وارد'}
        </span>
      ),
     align:'right',
    },{
      title: <IntlMessages id="columns.teacherName"/>,  dataIndex: '', key: 'x', render: ({teacher}) => (
        <span>
          {teacher && teacher.name ? teacher.name : 'غير وارد'}
        </span>
      ),
     align:'right'
    },{
      title: <IntlMessages id="columns.amount"/>,  dataIndex: '', key: 'x', render: ({amount}) => (
        <span>
          {amount ? amount : 'غير وارد' }
        </span>
      ),
     align:'right'
    },{
      title: <IntlMessages id="columns.status"/>,  dataIndex: '', key: 'x', render: ({status}) => (
        <span>
          {status === 'pending' ? 'بالإنتظار' :  status === 'canceled' ? 'ألغيت' : '' }
        </span>
      ),
     align:'right'
    },{
      title: <IntlMessages id="columns.operation"/>, dataIndex: '', key: 'x', render: (data) => (
        <span>
          <Button onClick={() => this.onShowRequest(data)}  type="primary" icon={<EyeFilled />} > تفاصيل الطلب </Button>
        </span>
      ),
     align:'right'
    }];

    return (
      <Row>
       <Col span={24}>
        <Card title={<h1><IntlMessages id="sidebar.Requests"/></h1>}>
          <div className="gx-mb-3">
            <span style={{marginLeft: 8}}>
              {hasSelected ? `تم تحديد ${selectedRowKeys.length} عناصر` : ''}
            </span>
          </div>
          <ShowRequest open={this.state.onShowRequestState} request={request} onToggleModal={this.onToggleModal} />
          <Table rowKey={record => record.id} locale={{emptyText:'لا توجد أي بيانات'}} loading={loading} dir="rtl" bordered={true} className="gx-table-responsive"  columns={columns} dataSource={this.props.requests}/>
        </Card>
      </Col>
    </Row>
    );
  }
}


function mapStateToProps(state) {
  return {
    requests: state.requests,
  };
}

export default connect(mapStateToProps, { fetchRequests })(Requests)
