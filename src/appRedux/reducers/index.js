import {combineReducers} from "redux";
import Settings from "./Settings";
import Auth from "./Auth";
import Common from "./Common";
import Students from "./Students";
import Teachers from "./Teachers";
import Messages from "./Messages";
import Pages from "./Pages";
import Cities from "./Cities";
import Setting from "./Setting";
import Coupons from "./Coupons";
import Requests from "./Requests";
import Levels from "./Levels";
import Subjects from "./Subjects";
import Users from "./Users";
import Nationalities from "./Nationalities";
import {connectRouter} from 'connected-react-router'

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  auth: Auth,
  common: Common,
  students: Students,
  teachers: Teachers,
  messages: Messages,
  pages: Pages,
  coupons: Coupons,
  cities: Cities,
  app_settings: Setting,
  levels:Levels,
  subjects: Subjects,
  nationalities: Nationalities,
  users:Users,
  requests:Requests
});
export default rootReducer