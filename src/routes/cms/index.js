import React from "react";
import { Button, Card, Table , Col , Row , message , Divider , Popconfirm , Badge } from "antd";
import IntlMessages from "util/IntlMessages";
import AddPage from "components/page/AddPage";
import EditPage from "components/page/EditPage";
import { PlusCircleFilled , DeleteOutlined , EditOutlined } from "@ant-design/icons";
import { fetchPages , CreatePage , UpdatePage , DeletePages } from "appRedux/actions/Pages";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Pages extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the CRM column
    loading: false,
    page:{},
    id:'',
    name:'',
    count:0,
    content:'',
    addPageState:false,
    editPageState:false,
    visible: false,
  };
  
  componentDidMount(){
    this.props.fetchPages()
  }

  onToggleModal = (modal) => {
    this.setState(state => ({
      [modal]:!state[modal],
    }));
  }

  onEditPage = (data) => {
    this.setState({ id:data.id, name:data.name, content:data.content , page:data , count: this.state.count + 1}, ()=>{
      this.onToggleModal("editPageState");
    })
  };

  onAddPage = async (data) => {
    await this.props.CreatePage({data})
    message.success('تمت العملية بنجاح')
    await this.props.fetchPages()
  };

  onSavePage = async (data) => {
    console.log(data)
    await this.props.UpdatePage({data})
    message.success('تمت العملية بنجاح')
    await this.props.fetchPages()
  };

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  confirm = (ids) => {
    this.setState({ loading: true });
    this.props.DeletePages({ids})
    .then( async ()=>{
      await this.props.fetchPages()
      message.success('تم حذف الصفحة');
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
    const {loading, selectedRowKeys , name , content , id , page , visible , count} = this.state;
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
      title: 'slug',
      dataIndex: 'slug',
      align:'right'
    },{
      title: <IntlMessages id="columns.operation"/>, dataIndex: '', key: 'x', render: (data) => (
        <span>
          <Button onClick={() => this.onEditPage(data)}  type="primary" icon={<EditOutlined />} > تعديل </Button>
        </span>
      ),
     align:'right'
    }];

    return (
      <Row>
       <Col span={24}>
        <Card title={<h1><IntlMessages id="sidebar.Pages"/></h1>}>
            <Button onClick={() => this.onToggleModal('addPageState')}  size="large" icon={<PlusCircleFilled />}  type="primary" />
            <Divider type="vertical" />
            <Badge count={this.state.selectedRowKeys.length}>
              <Popconfirm visible={visible} onVisibleChange={this.handleVisibleChange}  title="هل أنت متأكد ؟" onConfirm={ () => this.confirm(selectedRowKeys) } onCancel={this.cancel} okText="نعم" cancelText="لا">
                <Button  size="large" icon={<DeleteOutlined/>} disabled={!hasSelected} type="danger" loading={loading} />
              </Popconfirm>
            </Badge>
          
          <AddPage open={this.state.addPageState} onAddPage={this.onAddPage} onToggleModal={this.onToggleModal} />
          <EditPage count={count} open={this.state.editPageState} page={page} id={id} name={name} content={content} onSavePage={this.onSavePage} onToggleModal={this.onToggleModal} />
          <Table locale={{emptyText:'لا توجد أي بيانات'}} rowKey={record => record.id}  dir="rtl" bordered={true} className="gx-table-responsive" rowSelection={rowSelection} columns={columns} dataSource={this.props.pages}/>
        </Card>
      </Col>
    </Row>
    );
  }
}


function mapStateToProps(state) {
  return {
    pages: state.pages,
  };
}

export default connect(mapStateToProps,{fetchPages , CreatePage , UpdatePage , DeletePages})(Pages)
Pages.propTypes = {
  pages: PropTypes.array,
  fetchPages: PropTypes.func,
  CreatePage: PropTypes.func,
  UpdatePage: PropTypes.func,
  DeletePages: PropTypes.func,
};
