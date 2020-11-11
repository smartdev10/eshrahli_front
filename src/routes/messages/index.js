import React from "react";
import { Button, Card, Table , Col , Row , message , Popconfirm } from "antd";
import { connect } from "react-redux";
import IntlMessages from "util/IntlMessages";
import {  DeleteOutlined , EyeFilled } from "@ant-design/icons";
import ShowMessage from "components/message/ShowMessage";
import { fetchMessages , DeleteMessages } from "../../appRedux/actions/Messages";
import PropTypes from "prop-types";


class Messages extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the CRM column
    loading: false,
    message:{},
    onShowMessageState:false,
    visible: false,
  };


  onToggleModal = (modal) => {
    this.setState(state => ({
      [modal]:!state[modal],
    }));
  }
 
  componentDidMount(){
    this.props.fetchMessages()
  }


  onShowMessage = (message) => {
    this.setState({message} , () => {
        this.onToggleModal('onShowMessageState')
    })
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  confirm = (ids) => {
    this.setState({ loading: true });
    this.props.DeleteMessages({ids})
    .then( async ()=>{
      await this.props.fetchMessages()
      message.success('تم حذف الرسالة');
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
  cancel = () => {
    this.setState({ selectedRowKeys:[]  });
  } 

  render() {
    const {loading, selectedRowKeys , message  , visible} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const columns = [{
      title: <IntlMessages id="columns.name"/>,
      dataIndex: 'name',
      align:'right'
    },{
      title: <IntlMessages id="columns.email"/>,
      dataIndex: 'email',
      align:'right'
    },{
      title: <IntlMessages id="columns.operation"/>, dataIndex: '', key: 'x', render: (data) => (
        <span>
          <Button onClick={() => this.onShowMessage(data)}  type="primary" icon={<EyeFilled />} > عرض الرسالة </Button>
        </span>
      ),
     align:'right'
    }];
    
    return (
      <Row>
       <Col span={24}>
        <Card title={<h1><IntlMessages id="sidebar.Messages"/></h1>}>
            <Popconfirm visible={visible} onVisibleChange={this.handleVisibleChange}  placement="topLeft"  title="هل أنت متأكد ؟" onConfirm={ () => this.confirm(selectedRowKeys) } onCancel={this.cancel} okText="نعم" cancelText="لا">
              <Button  size="large" icon={<DeleteOutlined/>} disabled={!hasSelected} type="danger" loading={loading} />
            </Popconfirm>
          <div className="gx-mb-3">
            <span style={{marginLeft: 8}}>
              {hasSelected ? `تم تحديد ${selectedRowKeys.length} عناصر` : ''}
            </span>
          </div>
          <ShowMessage open={this.state.onShowMessageState} message={message} onToggleModal={this.onToggleModal} />
          <Table locale={{emptyText:'لا توجد أي بيانات'}} rowKey={record => record.id} bordered={true} className="gx-table-responsive" rowSelection={rowSelection} columns={columns} dataSource={this.props.messages}/>
        </Card>
      </Col>
    </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
  };
}

export default connect(mapStateToProps, { fetchMessages , DeleteMessages })(Messages)


Messages.propTypes = {
  fetchMessages: PropTypes.func,
  DeleteMessages: PropTypes.func,
  messages: PropTypes.array,
};
