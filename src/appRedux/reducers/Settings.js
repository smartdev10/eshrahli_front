import {SWITCH_LANGUAGE, WINDOW_WIDTH} from "constants/ActionTypes";


const initialSettings = {
  width: window.innerWidth,
  isDirectionRTL: true,
  locale: {
    languageId: 'saudi-arabia',
    locale: 'ar',
    name: 'Arabic',
    icon: 'sa'
  }
};

const settings = (state = initialSettings, action) => {
  switch (action.type) {

    case WINDOW_WIDTH:
      return {
        ...state,
        width: action.width,
      };

    case SWITCH_LANGUAGE:
      return {
        ...state,
        locale: action.payload,

      };
    default:
      return state;
  }
};

export default settings;
