import React , { useState , useEffect , useRef } from "react";
import { Modal , Card , Table , Tag } from "antd";
import IntlMessages from "util/IntlMessages";
import { SyncOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import axios from 'axios'


const ShowTeacherEarning = ({ onToggleModal, open, teacher }) => {
  
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(true)
  // const [stats, setStatsData] = useState([])
  const settings = useSelector(state => state.app_settings)
  const isMounted = useRef(true);
    useEffect(() => {
      if(Object.keys(teacher).length !== 0){
        if(isMounted.current){
          setName(teacher.name)
          console.log(settings)
          axios.get(`/api/teachers/${teacher.id}/earnings`).then(res => {
            if(Array.isArray(res.data.requests) && res.data.requests.length !== 0){
               
            }
            setLoading(false)
          })
        }
      }
      
      return ()=>{
        isMounted.current = false;
      }
    }, [teacher,settings])


    const columns = [
      {
        title: 'حاصل الجمع',
        dataIndex: 'total',
        render: text => <span>{text}</span>,
      },
      {
        title: 'الضريبة',
        dataIndex: 'tax',
        align: 'right',
      },
      {
        title: 'نسبة التطبيق',
        dataIndex: 'app-comission',
      },
    ];
    
    const data = [];

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
                القيمة الإجمالية : <Tag style={{fontSize:20 }} color='blue'><span style={{margin:10}}>0 (SR)</span></Tag>
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
