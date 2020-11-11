import React , { useState , useEffect , useRef } from "react";
import { Modal , Card , Table , Tag } from "antd";
import IntlMessages from "util/IntlMessages";
import { SyncOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import axios from 'axios'
import NumberFormat from 'react-number-format';
import { fetchSettings } from "../../../appRedux/actions/Settings";
import PropTypes from "prop-types";


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
                      total :  <NumberFormat  decimalScale={2} value={req.total} displayType={'text'} thousandSeparator={true} suffix={' ريال'} />, 
                      tax :  <NumberFormat   decimalScale={2} value={req.total * taxx.numberValue * 0.01} displayType={'text'} thousandSeparator={true} suffix={' ريال'} />,
                      appComission :<NumberFormat   decimalScale={2} value={req.total * appCom.numberValue * 0.01} displayType={'text'} thousandSeparator={true} suffix={' ريال'} /> ,
                      grandTotal : <NumberFormat   decimalScale={2} value={req.total + (req.total * taxx.numberValue) * 0.01 + (req.total * appCom.numberValue) * 0.01} displayType={'text'} thousandSeparator={true} suffix={' ريال'} /> 
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
        align:'right'
      },
      {
        title: 'الضريبة',
        dataIndex: 'tax',
        align: 'right',
      },
      {
        title: 'نسبة التطبيق',
        dataIndex: 'appComission',
        align:'right'
      },
      {
        title: 'القيمة الإجمالية',
        dataIndex: 'grandTotal',
        align:'right'
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
                title={() =>  <span style={{ textAlign:"center" }}>عدد الطلبات المكتملة : <Tag style={{fontSize:20 , paddingTop:8}} color='green'> {reqs} </Tag> </span>}
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

ShowTeacherEarning.propTypes = {
  onToggleModal: PropTypes.func,
  teacher: PropTypes.object,
  open: PropTypes.bool,
};
