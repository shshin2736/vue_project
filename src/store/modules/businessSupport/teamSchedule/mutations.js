import { mutations } from './types';

//! 하나의 MUTATIONS 당 하나의 STATE 변경
export default {
  //* 팀 일정
  [mutations.OPEN_CALENDAR_DIALOG](state, payload) {
    state.calendar.startDate = payload.date;
    state.calendar.startTime = payload.time;
    state.calendar.hasTime = payload.hasTime;
    state.dialog = true;
  },
  [mutations.CLOSE_CALENDAR_DIALOG](state, payload) {
    state.dialog = false;
  },
  [mutations.ADD_EVENTS](state, evnet) {
    state.events[0] = evnet;
    state.events[1] = evnet;
    state.events[2] = evnet;
    state.dialog = false;
  }
};
