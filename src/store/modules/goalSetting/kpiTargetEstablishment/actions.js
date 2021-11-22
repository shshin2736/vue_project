import { actions, mutations } from './types';
import { axiosInstance, axiosNoSpinner } from '@/api/axios';
import { errorEventHandler } from '@/errors';
import { common } from '@/utils';

export default {
  //* 하위 KPI 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_KPI_CHILD_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_KPI_CHILD_POP, payload);
  },
  //* 단순하위 KPI 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_KPI_SIMPLE_CHILD_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_KPI_SIMPLE_CHILD_POP, payload);
  },
  //* 목표 등록 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_KPI_REG_GOAL_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_KPI_REG_GOAL_POP, payload);
  },
  //* 전체 BSC 목록 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_BSC_POOL_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_BSC_POOL_POP, payload);
  },
  //* 전체 KPI 목록 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_KPI_POOL_LIST_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_KPI_POOL_LIST_POP, payload);
  },
  //* 맞춤속성찾기 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_CUSTOM_DEF_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_CUSTOM_DEF_POP, payload);
  },
  //* 기존 KPI로 찾기팝업 ON/OFF 설정
  [actions.INIT_VIEWS_EXIST_DEF_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_EXIST_DEF_POP, payload);
  },
  //* KPI속성그룹팝업 ON/OFF 설정
  [actions.INIT_VIEWS_DEF_GROUP_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_DEF_GROUP_POP, payload);
  },
  //* 신규 KPI 등록 팝업 ON/OFF
  [actions.INIT_VIEWS_KPI_REGIST_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_KPI_REGIST_POP, payload);
  },
  //* KPI 수정 팝업 ON/OFF
  [actions.INIT_VIEWS_KPI_UPDATE_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_KPI_UPDATE_POP, payload);
  },
  //* 하위 KPI연결 KPI 전체목록 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_CHILD_KPI_POOL_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_CHILD_KPI_POOL_POP, payload);
  },
  //* KPI목표수립 리스트 가져오기
  async [actions.FETCH_KPI_TARGET_ESTABILSHMENT_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/kpiTarget/getBscKpiTreeList.do',
        payload,
      );
      commit(mutations.SET_KPI_TARGET_ESTABILSHMENT_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* BSC 관점 리스트 가져오기
  async [actions.FETCH_BSC_POOL_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/kpiTarget/getBscList.do',
        payload,
      );
      commit(mutations.SET_BSC_POOL_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* KPI POOL 리스트 가져오기
  async [actions.FETCH_KPI_POOL_DATA_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/kpiTarget/getKpiPoolList.do',
        payload,
      );
      commit(mutations.SET_KPI_POOL_DATA_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 하위 KPI연결 KPI POOL 리스트 가져오기
  async [actions.FETCH_CHILD_KPI_POOL_LIST]({ commit }, payload) {
    try {
      payload.limit = payload.limit || 10;
      payload.offset = payload.offset || 0;
      const { data } = await axiosInstance.post(
        'api/kpiTarget/getKpiPoolAllList.do',
        payload,
      );
      commit(mutations.SET_CHILD_KPI_POOL_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* BSC 목표수립리스트에 업데이트
  async [actions.UPDATE_BSC_POOL_LIST]({ dispatch }, payload) {
    try {
      let response = await axiosInstance.post(
        'api/kpiTarget/saveBscKpi.do',
        payload,
      );
      if (response.status === 200) {
        common.alert('success', 'NLS0000013');
      }
      dispatch(actions.FETCH_BSC_POOL_LIST, payload);
      dispatch(actions.FETCH_KPI_TARGET_ESTABILSHMENT_LIST, payload);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* KPI 목표수립리스트에 업데이트
  async [actions.UPDATE_KPI_POOL_DATA_LIST]({ dispatch }, payload) {
    try {
      let response = await axiosInstance.post(
        'api/kpiTarget/saveBscKpi.do',
        payload,
      );
      if (response.status === 200) {
        common.alert('success', 'NLS0000012');
      }
      dispatch(actions.FETCH_KPI_POOL_DATA_LIST, payload);
      dispatch(actions.FETCH_KPI_TARGET_ESTABILSHMENT_LIST, payload);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* KPI 목표수립리스트 단일ROW 업데이트
  async [actions.UPDATE_KPI_POOL_SINGLE]({ dispatch }, payload) {
    try {
      await axiosNoSpinner.post('api/kpiTarget/saveBscKpiSingle.do', payload);
      // if (response.status === 200) {
      //   common.alert('success', 'NLS0000012');
      // }
      let param = {
        baseYyyy: payload.baseYyyy,
        baseYyyyMm: payload.baseYyyyMm,
      };
      dispatch(actions.FETCH_KPI_TARGET_ESTABILSHMENT_LIST, param);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* KPI 목표수립리스트 ROW 삭제
  async [actions.DELETE_BSC_KPI_LIST]({ dispatch }, payload) {
    try {
      await axiosNoSpinner.post('api/kpiTarget/deleteBscKpiList.do', payload);
      common.alert('success', 'NLS0000002');
      dispatch(actions.FETCH_KPI_TARGET_ESTABILSHMENT_LIST, payload);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 하위 KPI 리스트 가져오기
  async [actions.FETCH_KPI_CHILD_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/kpiTarget/getChildKpiList.do',
        payload,
      );
      commit(mutations.SET_KPI_CHILD_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 단순하위 KPI 리스트 가져오기
  async [actions.FETCH_KPI_SIMPLE_CHILD_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/kpiTarget/getSimpleChildKpiList.do',
        payload,
      );
      commit(mutations.SET_KPI_SIMPLE_CHILD_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 기존KPI속성찾기 리스트 가져오기
  async [actions.FETCH_EXIST_DEF_LIST]({ commit }, payload) {
    try {
      payload.limit = payload.limit || 10;
      payload.offset = payload.offset || 0;
      const { data } = await axiosInstance.post(
        'api/kpiTarget/getKpiDefList.do',
        payload,
      );
      commit(mutations.SET_EXIST_DEF_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 맞춤속성찾기데이터 설정
  [actions.UPDATE_SEARCH_KPI_CUSTOM_DATA]({ commit }, payload) {
    commit(mutations.SET_SEARCH_KPI_CUSTOM_DATA, payload);
  },
  //* 속성그룹 리스트 가져오기
  async [actions.FETCH_KPI_DEF_GROUP_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/kpiTarget/getDefList.do',
        payload,
      );
      commit(mutations.SET_KPI_DEF_GROUP_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 속성그룹 데이터 설정
  [actions.INIT_KPI_DEF_GROUP_DATA]({ commit }, payload) {
    commit(mutations.SET_KPI_DEF_GROUP_DATA, payload);
  },
  //* 실적집계방식 리스트 가져오기
  async [actions.FETCH_PER_TYPE_LIST]({ commit }, payload) {
    try {
      let param = {
        ...payload,
        grpCd: 'KPI007',
      };
      const { data } = await axiosNoSpinner.post(
        'api/system/getComCodeList.do',
        param,
      );
      commit(mutations.SET_PER_TYPE_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 실적누계방식 리스트 가져오기
  async [actions.FETCH_ACC_TYPE_LIST]({ commit }, payload) {
    try {
      let param = {
        ...payload,
        grpCd: 'KPI001',
      };
      const { data } = await axiosNoSpinner.post(
        'api/system/getComCodeList.do',
        param,
      );
      commit(mutations.SET_ACC_TYPE_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 단위 리스트 가져오기
  async [actions.FETCH_UNIT_TYPE_LIST]({ commit }, payload) {
    try {
      let param = {
        ...payload,
        grpCd: 'KPI201',
      };
      const { data } = await axiosNoSpinner.post(
        'api/system/getComCodeList.do',
        param,
      );
      commit(mutations.SET_UNIT_TYPE_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* KPI명 중복체크 데이터 가져오기
  async [actions.FETCH_CHECK_KPI_NM]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/kpiTarget/getCheckKpiNm.do',
        payload,
      );
      commit(mutations.SET_CHECK_KPI_NM, data.data.cnt);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* KPI명 중복체크 데이터 설정하기
  async [actions.INIT_CHECK_KPI_NM]({ commit }, payload) {
    commit(mutations.SET_CHECK_KPI_NM, payload);
  },
  //* 측정단위 카테고리 리스트 세팅
  async [actions.INIT_KPI_UNIT_CATEGORY_LIST]({ commit }, payload) {
    commit(mutations.SET_KPI_UNIT_CATEGORY_LIST, payload);
  },
  //* 측정단위 단위 리스트 세팅
  async [actions.INIT_KPI_UNIT_UNIT_LIST]({ commit }, payload) {
    commit(mutations.SET_KPI_UNIT_UNIT_LIST, payload);
  },
  //* KPI MBO 적용 리스트 세팅
  async [actions.INIT_APPLY_MBO_LIST]({ commit }, payload) {
    commit(mutations.SET_APPLY_MBO_LIST, payload);
  },

  //* 측정단위 카테고리 리스트 가져오기
  async [actions.FETCH_KPI_UNIT_CATEGORY_LIST]({ commit }, payload) {
    try {
      let param = {
        ...payload,
        grpCd: 'KPI200',
      };
      const { data } = await axiosNoSpinner.post(
        'api/system/getComCodeList.do',
        param,
      );
      commit(mutations.SET_KPI_UNIT_CATEGORY_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 측정단위 단위 리스트 가져오기
  async [actions.FETCH_KPI_UNIT_UNIT_LIST]({ commit }, payload) {
    try {
      let param = {
        ...payload,
        grpCd: 'KPI201',
      };
      const { data } = await axiosInstance.post(
        'api/system/getComCodeList.do',
        param,
      );
      commit(mutations.SET_KPI_UNIT_UNIT_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 선택한 KPI 리스트 세팅
  async [actions.INIT_SELECTED_KPI_POOL_LIST]({ commit }, payload) {
    commit(mutations.SET_SELECTED_KPI_POOL_LIST, payload);
  },
  //*선택한 단위 세팅
  async [actions.INIT_SELECTED_UNIT_DATA]({ commit }, payload) {
    commit(mutations.SET_SELECTED_UNIT_DATA, payload);
  },
  //* 신규KPI 저장
  async [actions.UPDATE_NEW_KPI_DATA]({ dispatch }, payload) {
    try {
      const response = await axiosInstance.post(
        'api/kpiTarget/addKpiPool.do',
        payload,
      );
      if (response.status === 200) {
        common.alert('success', 'NLS0000012');
      }
      dispatch(actions.FETCH_KPI_TARGET_ESTABILSHMENT_LIST, payload);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //*KPI 수정
  async [actions.UPDATE_LOADED_KPI_DATA](_, payload) {
    try {
      const response = await axiosInstance.post(
        'api/kpiTarget/updateKpiPool.do',
        payload,
      );
      if (response.status === 200) {
        common.alert('success', 'NLS0000012');
      }
      //dispatch(actions.FETCH_KPI_TARGET_ESTABILSHMENT_LIST, payload);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 기존KPI속성찾기 리스트 세팅
  async [actions.INIT_EXIST_DEF_LIST]({ commit }, payload) {
    commit(mutations.SET_EXIST_DEF_LIST, payload);
  },
  //* 사용언어 리스트 가져오기
  async [actions.FETCH_LANGUAGE_LIST]({ commit }, payload) {
    try {
      let param = {
        ...payload,
        grpCd: 'G05',
      };
      const { data } = await axiosInstance.post(
        'api/system/getComCodeList.do',
        param,
      );
      commit(mutations.SET_LANGUAGE_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 목표등록 - KPI정보가져오기
  async [actions.FETCH_REG_GOAL_KPI_DATA_SET]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/kpiTarget/getKpiGoalData.do',
        payload,
      );
      data.data.field = payload.field;
      data.data.mboAppYn = payload.mboAppYn;
      commit(mutations.SET_REG_GOAL_KPI_DATA, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 목표등록 - 선택한 조회년도 세팅
  [actions.INIT_REG_GOAL_SELECTED_YEAR_DATA]({ commit }, payload) {
    commit(mutations.SET_REG_GOAL_SELECTED_YEAR_DATA, payload);
  },
  //* 목표등록 - 선택한 조회월 세팅
  [actions.INIT_REG_GOAL_SELECTED_MONTH_DATA]({ commit }, payload) {
    commit(mutations.SET_REG_GOAL_SELECTED_MONTH_DATA, payload);
  },
  //*KPI 월목표 저장
  async [actions.UPDATE_KPI_TARGET_MONTH_DATA](_, payload) {
    try {
      const response = await axiosInstance.post(
        'api/kpiTarget/saveKpiTargetMonthData.do',
        payload,
      );
      if (response.status === 200) {
        common.alert('success', 'NLS0000012');
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //*KPI 주목표 저장
  async [actions.UPDATE_KPI_TARGET_WEEK_DATA](_, payload) {
    try {
      const response = await axiosInstance.post(
        'api/kpiTarget/saveKpiTargetWeekData.do',
        payload,
      );
      if (response.status === 200) {
        common.alert('success', 'NLS0000012');
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* KPI 목표수립리스트 데이터 업데이트
  async [actions.UPDATE_KPI_TREE_LIST]({ dispatch }, payload) {
    try {
      await axiosInstance.post('api/kpiTarget/saveBscKpiTree.do', payload);
      dispatch(actions.FETCH_KPI_TARGET_ESTABILSHMENT_LIST, payload);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* KPI 정보 데이터가져오기
  async [actions.FETCH_KPI_INFO_DATA]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/kpiTarget/getKpiDefData.do',
        payload,
      );
      commit(mutations.SET_KPI_INFO_DATA, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* KPI 정보 업데이트 하기
  async [actions.UPDATE_KPI_INFO_DATA](_, payload) {
    try {
      const response = await axiosInstance.post(
        'api/kpiTarget/updateKpiPool.do',
        payload,
      );
      if (response.status === 200) {
        common.alert('success', 'NLS0000012');
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* KPI공동사용자 조회
  async [actions.FETCH_KPI_ADD_USER_LIST]({ commit }, payload) {
    try {
      const { data } = await axiosInstance.post(
        'api/kpiTarget/getkpiAddUserList.do',
        payload,
      );
      commit(mutations.SET_KPI_ADD_USER_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //*전년 체계도 복사
  async [actions.UPDATE_COPY_LAST_YEAR_TREE_LIST](_, payload) {
    try {
      const response = await axiosInstance.post(
        'api/kpiTarget/updateCopyTreeData.do',
        payload,
      );
      if (response.status === 200) {
        common.alert('success', 'NLS0000013');
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* KPI MBO 적용
  async [actions.UPDATE_APPLY_MBO_KPI](_, payload) {
    try {
      const response = await axiosInstance.post(
        'api/mbo/updateApplyMboKpiList.do',
        payload,
      );
      if (response.status === 200) {
        if (response.data.data.isMboExist)
          common.alert('success', 'NLS0000013');
        else common.alert('warning', 'NLS0001300');
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //*단순하위 kpi추가
  async [actions.UPDATE_KPI_SIMPLE_CHILD_LIST]({ dispatch }, payload) {
    try {
      const response = await axiosInstance.post(
        'api/kpiTarget/addSimpleKpiSub.do',
        payload,
      );
      if (response.status === 200) {
        common.alert('success', 'NLS0000013');
        dispatch(actions.FETCH_KPI_SIMPLE_CHILD_LIST, payload);
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //*단순하위 kpi삭제
  async [actions.DELETE_KPI_SIMPLE_CHILD_LIST]({ dispatch }, payload) {
    try {
      const response = await axiosInstance.post(
        'api/kpiTarget/deleteSimpleKpiSub.do',
        payload,
      );
      if (response.status === 200) {
        common.alert('success', 'NLS0000002');
        dispatch(actions.FETCH_KPI_SIMPLE_CHILD_LIST, payload);
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //*  KPI 속성그룹 수정 데이터 세팅
  [actions.INIT_KPI_INFO_DATA]({ commit }, payload) {
    commit(mutations.SET_KPI_INFO_DATA, payload);
  },
  //* KPI MBO 여부 조회
  async [actions.FETCH_IS_MBO_KPI]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/kpiTarget/getIsMboKpi.do',
        params,
      );
      commit(mutations.SET_IS_MBO_KPI, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 월별 KPI 주목표 업데이트
  async [actions.UPDATE_KPI_TARGET_MW](_, payload) {
    try {
      const response = await axiosInstance.post(
        'api/kpiTarget/saveKpiTargetMW.do',
        payload,
      );
      if (response.status === 200) {
        common.alert('success', 'NLS0000012');
      }
    } catch (error) {
      errorEventHandler(error);
    }
  },
};
