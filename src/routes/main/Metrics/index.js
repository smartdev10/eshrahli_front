import React, { useEffect } from "react";
import {Col, Row} from "antd";
import { useDispatch, useSelector } from 'react-redux'
import IconWithTextCard from "components/Metrics/IconWithTextCard";
import Auxiliary from "util/Auxiliary";

import { fetchTeachers } from "../../../appRedux/actions/Teachers";
import { fetchStudents } from "../../../appRedux/actions/Students";
import { fetchSubjects } from "../../../appRedux/actions/Subjects";
import { fetchLevels } from "../../../appRedux/actions/Levels";
import { fetchCities } from "../../../appRedux/actions/Cities";
import { fetchNationalities } from "../../../appRedux/actions/Nationalities";
import { fetchCoupons } from "../../../appRedux/actions/Coupons";
import { fetchPages } from "../../../appRedux/actions/Pages";
import { fetchMessages } from "../../../appRedux/actions/Messages";
import { fetchRequests } from "../../../appRedux/actions/Requests";

const Metrics = () => {

  const cities = useSelector(state => state.cities)
  const nationalities = useSelector(state => state.nationalities)
  const subjects = useSelector(state => state.subjects)
  const levels = useSelector(state => state.levels)
  const teachers = useSelector(state => state.teachers)
  const students = useSelector(state => state.students)
  const coupons = useSelector(state => state.coupons)
  const pages = useSelector(state => state.pages)
  const messages = useSelector(state => state.messages)
  const requests = useSelector(state => state.requests)

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchTeachers())
    dispatch(fetchMessages())
    dispatch(fetchSubjects())
    dispatch(fetchLevels())
    dispatch(fetchCities())
    dispatch(fetchNationalities())
    dispatch(fetchStudents())
    dispatch(fetchCoupons())
    dispatch(fetchPages())
    dispatch(fetchRequests())
  },[dispatch])

  return (
    <Auxiliary>
      <Row>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
          <IconWithTextCard icon="avatar" iconColor="geekblue" title={teachers.length} subTitle="المدرسون"/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
          <IconWithTextCard icon="avatar" iconColor="primary" title={students.length} subTitle="الطلاب"/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
          <IconWithTextCard icon="files" iconColor="geekblue" title={subjects.length} subTitle="المواد"/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
          <IconWithTextCard icon="translation" iconColor="geekblue" title={nationalities.length} subTitle="الجنسيات"/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
          <IconWithTextCard icon="map-drawing" iconColor="geekblue" title={cities.length} subTitle="المدن"/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
          <IconWithTextCard icon="graduation" iconColor="geekblue" title={levels.length} subTitle="المستويات"/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
          <IconWithTextCard icon="ticket-new" iconColor="geekblue" title={coupons.length} subTitle="الكوبونات"/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
          <IconWithTextCard icon="orders" iconColor="geekblue" title={requests.length} subTitle="الطلبات"/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
          <IconWithTextCard icon="editor" iconColor="geekblue" title={pages.length} subTitle="الصفحات"/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
          <IconWithTextCard icon="chat-new" iconColor="geekblue" title={messages.length} subTitle="الرسائل"/>
        </Col>
      </Row>

    </Auxiliary>
  );
};
export default Metrics;
