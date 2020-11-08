import React , { useState , useEffect , useRef } from "react";
import { Modal , Card , Table , Tag } from "antd";
import IntlMessages from "util/IntlMessages";
import { SyncOutlined } from "@ant-design/icons";
// import { useSelector } from "react-redux";
import axios from 'axios'

const ShowTeacherEarning = ({ onToggleModal, open, teacher }) => {
  
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(true)
  // const [stats, setStatsData] = useState([])
  // const settings = useSelector(state => state.app_settings)
  const isMounted = useRef(true);
    useEffect(() => {
      if(Object.keys(teacher).length !== 0){
        console.log(teacher)
        if(isMounted.current){
          setName(teacher.name)
          // setMobile(teacher.mobile)
          axios.get(`/api/teachers/${teacher.id}/earnings`).then(res => {
            setLoading(false)
          })
        }
      }
      
      return ()=>{
        isMounted.current = false;
      }
    }, [teacher])

    const columns = [
      {
        title: 'حاصل الجمع',
        dataIndex: 'name',
        render: text => <span>{text}</span>,
      },
      {
        title: 'الضريبة',
        className: 'column-money',
        dataIndex: 'money',
        align: 'right',
      },
      {
        title: 'نسبة التطبيق',
        dataIndex: 'address',
      },
    ];
    
    const data = [
      {
        key: '1',
        name: 'John Brown',
        money: '￥300,000.00',
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Jim Green',
        money: '￥1,256,000.00',
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'Joe Black',
        money: '￥120,000.00',
        address: 'Sidney No. 1 Lake Park',
      },
    ];

    const gridStyle = {
      textAlign: 'center',
    };
    
    return (
      <Modal
        width={'70%'}
        cancelText={ <IntlMessages id="modal.cancelSave"/> }
        title={<IntlMessages id="teacher.earnings"/>}
        toggle={onToggleModal} 
        visible={open}
        footer={null}
        onCancel={()=> {
          onToggleModal('showTeacherEarnState')
        }}>

        <div  className="gx-modal-box-row">
          <div className="gx-modal-box-form-item">
          <Card style={gridStyle} dir="rtl" title={name}>
            {
               loading ? <SyncOutlined style={{fontSize:'50px'}} spin /> :
               (
                <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                bordered
                footer={() => <span>
                القيمة الإجمالية : <Tag style={{fontSize:20}} color='blue'>15645</Tag>
                </span>}
                />
               )
            }
          </Card>
          </div>
        </div>
      </Modal>
    );
}

export default React.memo(ShowTeacherEarning);
