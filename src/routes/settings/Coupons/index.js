import React from "react";
import { Button, Card, Table , Row , Col , Divider , Popconfirm , message , Switch , Space , Input } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import { SearchOutlined  , PlusCircleFilled, DeleteOutlined , EditOutlined } from "@ant-design/icons";
import AddCoupon from "components/coupon/AddCoupon";
import EditCoupon from "components/coupon/EditCoupon";
import IntlMessages from "util/IntlMessages";
import Highlighter from 'react-highlight-words';
import { fetchCoupons , CreateCoupon , UpdateCoupon , DeleteCoupon } from "../../../appRedux/actions/Coupons";
import { FormattedMessage } from "react-intl";

class Coupons extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the CRM column
    loading: false,
    coupon:{
      name:''
    },
    addCouponState:false,
    editCouponState:false,
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
    this.props.fetchCoupons()
  }

  onToggleModal = (modal) => {
    this.setState(state => ({
      [modal]:!state[modal],
    }));
  }

  onEditCoupon = (data) => {
    this.setState({coupon:data}, ()=>{
      this.onToggleModal("editCouponState");
    })
  };

  onAddCoupon = (data) => {
    this.props.CreateCoupon({data}).then(async()=>{
      message.success('تمت العملية بنجاح')
      await this.props.fetchCoupons()
      this.onToggleModal("addCouponState");
    })
    .catch((err)=> {
      if(err.data.error === 'Duplicate Code'){
        message.error('الرمز الذي تم إدخاله مكرر')
      }else{
        message.error('عطل أثناء الإضافة!')
      }
    })
  };

  onSaveCoupon = async (data) => {
    await this.props.UpdateCoupon({data})
    message.success('تمت العملية بنجاح')
    await this.props.fetchCoupons()
  };

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  confirm = (ids) => {
    this.setState({ loading: true });
    this.props.DeleteCoupon({ids})
    .then( async ()=>{
      await this.props.fetchCoupons()
      message.success('تم حذف الكوبون');
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
    const { loading , selectedRowKeys , visible , coupon } = this.state;
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
    }, {
      title: <IntlMessages id="columns.code"/>,
      dataIndex: 'code',
      align:'right',
      ...this.getColumnSearchProps('code')
    }, {
      title: <IntlMessages id="columns.discount"/>,
      dataIndex: 'discount',
      align:'right'
    },{
      title: <IntlMessages id="columns.start"/>,
      dataIndex:'start',
      key: 'start',
      render: (start) => moment(start).format('DD-MM-YYYY'),
      align:'right'
    }, {
      title: <IntlMessages id="columns.end"/>,
      dataIndex: 'end',
      key: 'end' ,
      render: (end) => moment(end).format('DD-MM-YYYY'),
      align:'right'
    },{
      title: 'تعديل الحالة', dataIndex: '', key: '', render: ({ id , status , name , discount , start , end , description , code }) => (
         <Switch  checkedChildren="نشط" unCheckedChildren="غير نشط"   defaultChecked={status === "active" ? true : false}  onChange={(checked) => {
          let status = checked ? "active" : "inactive"
          this.setState({loadingTable:true}); 
          this.props.UpdateCoupon({data:{status , id , name , discount , start , end , description , code }})
          .then(async()=> {
            this.props.fetchCoupons().then(()=>{
              message.success('تم التفعيل بنجاح')
              this.setState({loadingTable:false}); 
            })
          })
          .catch((err)=> {
            message.error('عطل أثناء التعديل')
            this.setState({loadingTable:false}); 
          }, 2000);
         } } />
      ) , align :'right' , width :"500"
    },{
      title: <IntlMessages id="columns.operation"/>, dataIndex: '', key: 'x', render: (data) => (
        <span>
          <Button onClick={() => this.onEditCoupon(data)}   type="primary" icon={<EditOutlined />} > تعديل </Button>
        </span>
      ),
     align:'right'
    }];

    
    return (
      <Row>
       <Col span={24}>
        <Card title={<h1><IntlMessages id="sidebar.Coupons"/></h1>}>
            <Button  onClick={() => this.onToggleModal('addCouponState')} size="large" icon={<PlusCircleFilled />}  type="primary" />
            <Divider type="vertical" />
            <Popconfirm visible={visible} onVisibleChange={this.handleVisibleChange}  placement="topLeft"  title="هل أنت متأكد ؟" onConfirm={ () => this.confirm(selectedRowKeys) } onCancel={this.cancel} okText="نعم" cancelText="لا">
              <Button  size="large" icon={<DeleteOutlined/>} disabled={!hasSelected} type="danger" loading={loading} />
            </Popconfirm>
          <div className="gx-mb-3">
            <span style={{marginLeft: 8}}>
              {hasSelected ? `تم تحديد ${selectedRowKeys.length} عناصر` : ''}
            </span>
          </div>
          <AddCoupon open={this.state.addCouponState} onAddCoupon={this.onAddCoupon} onToggleModal={this.onToggleModal} />
          <EditCoupon open={this.state.editCouponState} coupon={coupon} onSaveCoupon={this.onSaveCoupon} onToggleModal={this.onToggleModal} />
          <Table locale={{emptyText:'لا توجد أي بيانات'}} rowKey={record => record.id} direction="rtl"  bordered={true} className="gx-table-responsive" rowSelection={rowSelection} columns={columns} dataSource={this.props.coupons}/>
        </Card>
      </Col>
    </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    coupons: state.coupons,
  };
}

export default connect(mapStateToProps, { fetchCoupons , CreateCoupon , UpdateCoupon , DeleteCoupon })(Coupons)
