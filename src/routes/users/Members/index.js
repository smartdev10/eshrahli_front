import React from "react";
import {Button, Card, Table , Row , Col , message , Input , Space , Switch } from "antd";
import Highlighter from 'react-highlight-words';
import { SearchOutlined , PlusCircleFilled , EditOutlined , CheckCircleTwoTone , ExclamationCircleTwoTone} from "@ant-design/icons";
import { fetchUsers , CreateUser , UpdateUser, DeleteUsers } from "../../../appRedux/actions/Users";
import { connect } from "react-redux";
import AddUser from "components/users/AddUser";
import EditUser from "components/users/EditUser";
import IntlMessages from "util/IntlMessages";
import jwtDecode from "jwt-decode";
import { FormattedMessage } from "react-intl";


class Members extends React.Component {

  state = {
    selectedRowKeys: [], // Check here to configure the CRM column
    loading: false,
    addUserState:false,
    editUserState:false,
    user:{} ,
    searchText: '',
    searchedColumn: '',
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
    const { token } = this.props.auth 
    let decoded = null
    if(token !== null){
      decoded = jwtDecode(token)
    }
    if(decoded){
      this.props.fetchUsers({
        filter : {id : decoded.userId}
      })
    }else{
      this.props.fetchUsers()
    }
  }

  onToggleModal = (modal) => {
    this.setState(state => ({
      [modal]:!state[modal],
    }));
  }

  onEditUser = (user) => {
    this.setState({user}, ()=>{
      this.onToggleModal("editUserState");
    })
  };

  onAddUser = async (data) => {
    await this.props.CreateUser({data}).then(async()=>{
      message.success('تمت العملية بنجاح')
      const { token } = this.props.auth 
      let decoded = null
      if(token !== null){
        decoded = jwtDecode(token)
      }
      if(decoded){
        await  this.props.fetchUsers({
          filter : {id : decoded.userId}
        })
      }else{
        await this.props.fetchUsers()
      }
      this.onToggleModal("addUserState");
    }).catch((err)=> {
      if(err.data.error === 'duplicate username'){
        message.error('اسم المستخدم الذي تم إدخاله مكرر')
      }else if(err.data.error === 'duplicate phonenumber'){
        message.error('الهاتف الذي تم استخدامه مكرر')
      }else{
        message.error('عطل أثناء الإضافة!')
      }
      this.onToggleModal("addUserState");
    })
  };

  onSaveUser = async (data) => {
    await this.props.UpdateUser({data})
    message.success('تمت العملية بنجاح')
    const { token } = this.props.auth 
    let decoded = null
    if(token !== null){
      decoded = jwtDecode(token)
    }
    if(decoded){
      await  this.props.fetchUsers({
        filter : {id : decoded.userId}
      })
    }else{
      await this.props.fetchUsers()
    }
  };

 
  render() {
    const { selectedRowKeys  , user} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const columns = [{
      title: <IntlMessages id="columns.name"/>,
      dataIndex: 'name',
      align:'right' ,
      ...this.getColumnSearchProps('name'),
    },{
      title: <IntlMessages id="columns.username"/>,
      dataIndex: 'username',
      align:'right'
    } ,{
      title: <IntlMessages id="columns.mobile"/>,
      dataIndex: 'mobile',
      align:'right' ,
      ...this.getColumnSearchProps('mobile')
    },{
      title: <IntlMessages id="columns.role"/>,  dataIndex: '', key: 'x', render: ({role}) => (
        <span>
          {role === 'admin' ? 'أدمن' :  role === 'superuser' ? 'سوبر أدمن' : 'غير وارد' }
        </span>
      ),
     align:'right'
    },{
      title: <IntlMessages id="columns.status"/>,  dataIndex: '', key: 'x', render: ({status}) => (
        <span>
          {status === 'active' ? <CheckCircleTwoTone title={status} twoToneColor="#40a9ff"  /> :  <ExclamationCircleTwoTone twoToneColor="#eb2f96" /> }
        </span>
      ),
     align:'right'
    },{
      title: 'تعديل الحالة', dataIndex: '', key: '', render: ({status , username , name , mobile , password , id}) => (
         <Switch  checkedChildren="مفعل" unCheckedChildren="غير مفعل"   defaultChecked={status === "active" ? true : false}  onChange={(checked) => {
          let status = checked ? "active" : "inactive"
          this.setState({loadingTable:true}); 
          this.props.UpdateUser({data:{status , name , password:'' , username , mobile , id}})
          .then(async()=> {
            const { token } = this.props.auth 
            let decoded = null
            if(token !== null){
              decoded = jwtDecode(token)
            }
            if(decoded){
              await  this.props.fetchUsers({
                filter : {id : decoded.userId}
              })
            }else{
              await this.props.fetchUsers()
            }
            message.success('تمت العملية بنجاح')
            this.setState({loadingTable:false});
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
          <Button onClick={() => this.onEditUser(data)}  type="primary" icon={<EditOutlined />}> تعديل </Button>
        </span>
      ),
     align:'right'
    }];

    return (
      <Row>
       <Col span={24}>
        <Card title={<h1><IntlMessages id="sidebar.Users"/></h1>}>
          <Button onClick={() => this.onToggleModal('addUserState')} size="large" icon={<PlusCircleFilled />}  type="primary" />
          <div className="gx-mb-3">
            <span style={{marginLeft: 8}}>
              {hasSelected ? `تم تحديد ${selectedRowKeys.length} عناصر` : ''}
            </span>
          </div>
          <AddUser open={this.state.addUserState} onAddUser={this.onAddUser} onToggleModal={this.onToggleModal} />
          <EditUser open={this.state.editUserState} user={user} onSaveUser={this.onSaveUser} onToggleModal={this.onToggleModal} />
          <Table locale={{emptyText:'لا توجد أي بيانات'}} rowKey={record => record.id} direction="rtl" bordered={true} className="gx-table-responsive" rowSelection={rowSelection} columns={columns} dataSource={this.props.users}/>
        </Card>
      </Col>
    </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
    auth: state.auth,
  };
}
export default connect(mapStateToProps,{fetchUsers , CreateUser , UpdateUser, DeleteUsers })(Members)


