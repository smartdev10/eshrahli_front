import React , { useState , useEffect , useRef } from "react";
import { Modal , Card , Table , Tag } from "antd";
import IntlMessages from "util/IntlMessages";
import { SyncOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import axios from 'axios'
import { fetchSettings } from "../../../appRedux/actions/Settings";


const ShowTeacherEarning = ({ onToggleModal, open, teacher }) => {
  
  const [name, setName] = useState('')
  const [reqs, setTotalReqs] = useState(0)
  const [loading, setLoading] = useState(true)
  const [stats, setStatsData] = useState([])
  const dispatch = useDispatch()
  const isMounted = useRef(true);
    useEffect(() => {
      if(Object.keys(teacher).length !== 0){
        if(isMounted.current){
          setName(teacher.name)
          axios.get(`/api/teachers/${teacher.id}/earnings`).then(({data}) => {
            dispatch(fetchSettings()).then(settings => {
              if(Array.isArray(data.requests) && data.requests.length !== 0){
                const taxx = settings.find(s => s.slug === 'tax')
                const appCom = settings.find(s => s.slug === 'app-comission')
                setTotalReqs(data.requests.length)
                if(appCom && taxx){
                  const statsData = data.requests.map((req,i) => {
                    return {
                      i,
                      total : req.total,
                      tax : req.total * taxx.numberValue * 0.01,
                      appComission : req.total * appCom.numberValue * 0.01,
                      grandTotal : req.total + (req.total * taxx.numberValue) * 0.01 + (req.total * appCom.numberValue) * 0.01
                    }
                  })
                  setStatsData(statsData)
                }
                setLoading(false)
              }else{
                setLoading(false)
              }
             })
          })
        }
      }
      
      return ()=>{
        isMounted.current = false;
      }
    }, [teacher,dispatch])


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
        dataIndex: 'appComission',
      },
      {
        title: 'القيمة الإجمالية',
        dataIndex: 'grandTotal',
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
          <Card style={gridStyle} dir="rtl" title={name} >
            {
               loading ? <SyncOutlined style={{fontSize:'50px'}} spin /> :
               (
                <Table
                title={() =>  <span>عدد الطلبات المكتملة  <Tag style={{fontSize:20 }} color='green'> {reqs} </Tag> </span>}
                columns={columns}
                dataSource={stats}
                pagination={false}
                bordered
                rowKey={record => record.i}
                // footer={() => <span>
                // القيمة الإجمالية : <Tag style={{fontSize:20 }} color='blue'><span style={{margin:10}}>{grandTotal} (SR)</span></Tag>
                // </span>}
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
