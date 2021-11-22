import { common } from '@/utils';
import { errorEventHandler } from '@/errors';
import { actions, mutations } from './types';
import { axiosInstance, axiosNoSpinner } from '@/api/axios';

export default {
  // TODO: FETCH Methods declaration
  //* 과제실행 목록 리스트 가져오기
  async [actions.FETCH_PROJECT_EXECUTION_LIST]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/project/getProjectExecutionList.do',
        params,
      );
      commit(mutations.SET_PROJECT_EXECUTION_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.INIT_PROJECT_EXECUTION_LIST]({ commit }, payload) {
    commit(mutations.SET_PROJECT_EXECUTION_LIST, payload);
  },
  //* 과제실행 데이터 가져오기
  async [actions.FETCH_PROJECT_EXECUTION_INFO]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/project/getProjectExecutionInfo.do',
        params,
      );
      commit(mutations.SET_PROJECT_EXECUTION_INFO, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.FETCH_PROJECT_KPI_LIST]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/project/getProjectKpiList.do',
        params,
      );
      commit(mutations.SET_PROJECT_KPI_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* Report INFO 가져오기
  async [actions.FETCH_PROJECT_REPORT_INFO]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/project/getReportInfo.do',
        params,
      );
      data.data.reportList = params.reportList || [];
      data.data.reportType = params.reportType || '';
      commit(mutations.SET_PROJECT_REPORT_INFO, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 최초 과제등록 POPUP INFO 값 세팅
  async [actions.FETCH_PROJECT_POPUP_INFO]({ commit }, payload) {
    commit(mutations.SET_PROJECT_POPUP_INFO, payload);
  },
  //* 과제 기간 설정 POPUP INFO 값 가져오기
  async [actions.FETCH_PROJECT_DATE_INFO]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/project/getProjectDateInfo.do',
        params,
      );
      commit(mutations.SET_PROJECT_DATE_INFO, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 잠재 원인 POPUP INFO 값 가져오기
  async [actions.FETCH_PROJECT_CAUSE_INFO]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/project/getProjectCauseInfo.do',
        params,
      );
      commit(mutations.SET_PROJECT_CAUSE_INFO, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 잠재 원인 POPUP INFO 값 가져오기
  async [actions.FETCH_PROJECT_CAUSE_LIST]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/project/getProjectCauseList.do',
        params,
      );
      commit(mutations.SET_PROJECT_CAUSE_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 과제 메세지 list 가져오기 [주기적으로 CHECK 해서 SPINNER를 사용하지 않음]
  async [actions.FETCH_PROJECT_MESSENGER_LIST]({ commit }, params) {
    try {
      const { data } = await axiosNoSpinner.post(
        'api/project/getProjectMessengerList.do',
        params,
      );
      commit(mutations.SET_PROJECT_MESSENGER_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 단계별 미확인된 메세지 유무 가져오기 [주기적으로 CHECK 해서 SPINNER를 사용하지 않음]
  async [actions.FETCH_CHECK_MESSAGES_LIST]({ commit }, params) {
    try {
      const { data } = await axiosNoSpinner.post(
        'api/project/getProjectCheckMessagesList.do',
        params,
      );
      commit(mutations.SET_CHECK_MESSAGES_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 개선스킬 FILE INFO
  async [actions.FETCH_PROJECT_SKILL_CONF_INFO]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/project/getProjectSkillConfInfo.do',
        params,
      );
      commit(mutations.SET_PROJECT_SKILL_CONF_INFO, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  async [actions.FETCH_PROJECT_REPORT_USE_INFO]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/project/getPrjReportList.do',
        params,
      );
      commit(mutations.SET_PROJECT_REPORT_USE_INFO, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 개선스킬 팝업 FILE INFO
  [actions.INIT_PROJECT_SKILL_CONF_INFO_POP]({ commit }, params) {
    commit(mutations.SET_PROJECT_SKILL_CONF_INFO_POP, params);
  },

  //**-------------   연구 / 개발   -------------**/

  //* 시장 분석 INFO 가져오기
  async [actions.FETCH_PROJECT_BIZ_INFO]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/project/getPrjBizInfo.do',
        params,
      );
      commit(mutations.SET_PROJECT_BIZ_INFO, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* CSF 도출 INFO 가져오기
  async [actions.FETCH_PROJECT_CSF_INFO]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/project/getPrjCsfInfo.do',
        params,
      );
      commit(mutations.SET_PROJECT_CSF_INFO, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 컨셉수립 INFO 가져오기
  async [actions.FETCH_PROJECT_DIRCT_INFO]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/project/getPrjDirctInfo.do',
        params,
      );
      commit(mutations.SET_PROJECT_DIRCT_INFO, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 상세계획 INFO 가져오기
  async [actions.FETCH_PROJECT_DEV_LIST]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/project/getPrjDevList.do',
        params,
      );
      commit(mutations.SET_PROJECT_DEV_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 현장적용 LIST 가져오기
  async [actions.FETCH_PROJECT_PILOT_LIST]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/project/getPrjPilotList.do',
        params,
      );
      commit(mutations.SET_PROJECT_PILOT_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 효과파악 INFO 가져오기
  async [actions.FETCH_PROJECT_RD_EFFECT]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/project/getPrjRdEffectInfo.do',
        params,
      );
      commit(mutations.SET_PROJECT_RD_EFFECT, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //**-------------   의사결정   -------------**/
  //* 현상파악 INFO 가져오기
  async [actions.FETCH_PROJECT_GRASP_INFO]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/project/getDsGraspInfo.do',
        params,
      );
      commit(mutations.SET_PROJECT_GRASP_INFO, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 결정요인 LIST 가져오기
  async [actions.FETCH_PROJECT_DECISION_LIST]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/project/getDcsList.do',
        params,
      );
      commit(mutations.SET_PROJECT_DECISION_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 대안설정 LIST 저장
  async [actions.FETCH_PROJECT_ALT_LIST]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/project/getAltList.do',
        params,
      );
      commit(mutations.SET_PROJECT_ALT_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 상세계획 LIST가져오기
  async [actions.FETCH_PROJECT_IMPL_LIST]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/project/getPrjImplList.do',
        params,
      );
      commit(mutations.SET_PROJECT_IMPL_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 효과파악 INFO 가져오기
  async [actions.FETCH_PROJECT_DS_EFFECT]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/project/getDsEffectInfo.do',
        params,
      );
      commit(mutations.SET_PROJECT_DS_EFFECT, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //**-------------   판매 4단계   -------------**/
  //* 고객파악 INFO 가져오기
  async [actions.FETCH_PROJECT_SA_CUST]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/project/getSaCustInfo.do',
        params,
      );
      commit(mutations.SET_PROJECT_SA_CUST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 질문 INFO 가져오기
  async [actions.FETCH_PROJECT_SA_BIZ]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/project/getSaBizInfo.do',
        params,
      );
      commit(mutations.SET_PROJECT_SA_BIZ, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 제시 INFO 가져오기
  async [actions.FETCH_PROJECT_SUGGEST_INFO]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/project/getSuggestInfo.do',
        params,
      );
      commit(mutations.SET_PROJECT_SUGGEST_INFO, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 입증 INFO 가져오기
  async [actions.FETCH_PROJECT_OVER_INFO]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/project/getOverInfo.do',
        params,
      );
      commit(mutations.SET_PROJECT_OVER_INFO, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 결정 LIST 가져오기
  async [actions.FETCH_PROJECT_MON_LIST]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/project/getPrjMonList.do',
        params,
      );
      commit(mutations.SET_PROJECT_MON_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 효과파악 INFO 가져오기
  async [actions.FETCH_PROJECT_SA_EFFECT]({ commit }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/project/getSaEffectInfo.do',
        params,
      );
      commit(mutations.SET_PROJECT_SA_EFFECT, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //TODO : INSERT Methods declaration
  async [actions.INSERT_PROJECT_MESSAGES]({ dispatch }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/project/insertProjectMessages.do',
        params,
      );

      dispatch(actions.FETCH_PROJECT_MESSENGER_LIST, {
        prjId: params.prjId,
        prjStepId: params.prjStepId,
      });

      return data.data;
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //TODO : UPDATE Methods declaration
  async [actions.UPDATE_PROJECT_EXECUTION]({ dispatch }, params) {
    try {
      const { data } = await axiosInstance.post(
        'api/project/updateProjectExecution.do',
        params,
      );
      if (params.stepStatus && params.type != 'new') {
        if (params.stepStatus == '1') {
          //완료되었습니다
          common.alert('success', 'NLS0000856');
        } else {
          // 저장되었습니다.
          common.alert('success', 'NLS0000012');
        }
        const {
          baseYyyy,
          prjBaseInfo: { prjId },
        } = params;
        dispatch(actions.FETCH_CONN_STG_LIST, { baseYyyy, prjId });
      }
      //* 초기화
      dispatch(actions.FETCH_PROJECT_EXECUTION_INFO, {
        prjId: data.data.prjId,
      });
      return data.data;
    } catch (error) {
      errorEventHandler(error);
    }
  },
  async [actions.FETCH_CONN_STG_LIST]({ commit }, params) {
    try {
      const { data } = await axiosNoSpinner.post(
        'api/project/getConnStgList.do',
        params,
      );
      commit(mutations.SET_CONN_STG_LIST, data.data);
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 과제 추진개요 저장
  async [actions.UPDATE_PROJECT_OVERVIEW]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updateProjectOverview.do', params);
      if (params.stepStatus == '1') {
        //완료되었습니다
        common.alert('success', 'NLS0000856');
      } else {
        // 저장되었습니다.
        common.alert('success', 'NLS0000012');
      }
      //* 초기화
      dispatch(actions.FETCH_PROJECT_EXECUTION_INFO, {
        prjId: params.prjInfo.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 과제 소요자원 저장
  async [actions.UPDATE_PROJECT_RESOURCE]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updateProjectResource.do', params);
      if (params.stepStatus == '1') {
        //완료되었습니다
        common.alert('success', 'NLS0000856');
      } else {
        // 저장되었습니다.
        common.alert('success', 'NLS0000012');
      }
      //* 초기화
      dispatch(actions.FETCH_PROJECT_EXECUTION_INFO, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 과제 실행검토 저장

  async [actions.UPDATE_PROJECT_EXREVIEW]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updateProjectExReview.do', params);
      if (params.prjStatus == 'B' && params.prjGrade != 'D') {
        //진행중단 되었습니다
        common.alert('success', 'NLS0000946');
      } else {
        //수행승인 되었습니다
        common.alert('success', 'NLS0000907');
      }
      dispatch(actions.FETCH_PROJECT_EXECUTION_INFO, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 과제 실행검토 저장

  async [actions.UPDATE_PROJECT_GRASP]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updateProjectGrasp.do', params);
      if (params.stepStatus == '1') {
        //완료되었습니다
        common.alert('success', 'NLS0000856');
      } else {
        // 저장되었습니다.
        common.alert('success', 'NLS0000012');
      }
      dispatch(actions.FETCH_PROJECT_EXECUTION_INFO, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 과제 대책 수립
  async [actions.UPDATE_PROJECT_MEASURE]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updateProjectMeasure.do', params);
      if (params.stepStatus == '0') {
        // 저장되었습니다.
        common.alert('success', 'NLS0000012');
      } else {
        //완료되었습니다
        common.alert('success', 'NLS0000856');
      }
      dispatch(actions.FETCH_PROJECT_CAUSE_LIST, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 과제 상세 계획 UPDATE_PROJECT_PLAN
  async [actions.UPDATE_PROJECT_PLAN]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updateProjectPlan.do', params);
      if (params.stepStatus == '0') {
        // 저장되었습니다.
        common.alert('success', 'NLS0000012');
      } else {
        //완료되었습니다
        common.alert('success', 'NLS0000856');
      }
      dispatch(actions.FETCH_PROJECT_EXECUTION_INFO, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 대책수립 대단계 수행검토
  async [actions.UPDATE_PROJECT_MANAGER_PLAN]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updateProjectPlan.do', params);
      if (params.prjStatus == 'B') {
        //진행중단 되었습니다
        common.alert('success', 'NLS0000946');
      } else {
        //수행승인 되었습니다
        common.alert('success', 'NLS0000907');
      }
      dispatch(actions.FETCH_PROJECT_EXECUTION_INFO, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 과제 현장 파악
  async [actions.UPDATE_PROJECT_REALIZE]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updateProjectRealize.do', params);
      if (params.stepStatus == '0') {
        // 저장되었습니다.
        common.alert('success', 'NLS0000012');
      } else {
        //완료되었습니다
        common.alert('success', 'NLS0000856');
      }
      dispatch(actions.FETCH_PROJECT_CAUSE_LIST, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 과제 효과 파악 UPDATE_PROJECT_EFFECT
  async [actions.UPDATE_PROJECT_EFFECT]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updateProjectEffect.do', params);
      if (params.stepStatus == '0') {
        // 저장되었습니다.
        common.alert('success', 'NLS0000012');
      } else {
        //완료되었습니다
        common.alert('success', 'NLS0000856');
      }
      dispatch(actions.FETCH_PROJECT_EXECUTION_INFO, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 과제 종료보고(보고서) 저장
  async [actions.UPDATE_PROJECT_REPORT]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updateProjectReport.do', params);
      if (params.stepStatus == '0') {
        // 저장되었습니다.
        common.alert('success', 'NLS0000012');
      } else {
        //완료되었습니다
        common.alert('success', 'NLS0000856');
      }
      dispatch(actions.FETCH_PROJECT_EXECUTION_INFO, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 과제완료
  async [actions.UPDATE_PROJECT_FINISH]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updateProjectFinish.do', params);
      if (params.stepStatus == '0') {
        // 저장되었습니다.
        common.alert('success', 'NLS0000012');
      } else {
        //완료되었습니다
        common.alert('success', 'NLS0000856');
      }
      dispatch(actions.FETCH_PROJECT_EXECUTION_INFO, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 우수과제선정
  async [actions.UPDATE_PROJECT_BEST]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updateProjectBest.do', params);
      //우수과제로 선정되었습니다
      common.alert('success', 'NLS0001070');
      dispatch(actions.FETCH_PROJECT_EXECUTION_INFO, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 과제 기간 POPUP 저장
  async [actions.UPDATE_PROJECT_DATEINFO]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updateProjectDateInfo.do', params);
      // 저장되었습니다.
      common.alert('success', 'NLS0000012');
      dispatch(actions.FETCH_PROJECT_EXECUTION_INFO, {
        prjId: params.prjId,
      });
      dispatch(actions.FETCH_PROJECT_DATE_INFO, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 잠재 원인 POPUP 저장
  async [actions.UPDATE_PROJECT_CAUSE]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updateProjectCause.do', params);
      if (params.stepStatus == '1') {
        //완료되었습니다
        common.alert('success', 'NLS0000856');
      } else {
        // 저장되었습니다.
        common.alert('success', 'NLS0000012');
      }
      dispatch(actions.FETCH_PROJECT_CAUSE_LIST, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 메세지 읽음상태 업데이트
  async [actions.UPDATE_PROJECT_MESSENGER](_, params) {
    try {
      await axiosInstance.post('api/project/updateMessagesStatus.do', params);
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //**-------------   연구 / 개발   -------------**/

  //* 시장분석 저장
  async [actions.UPDATE_PROJECT_BIZ_INFO]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updatePrjBizInfo.do', params);
      if (params.stepStatus == '1') {
        //완료되었습니다
        common.alert('success', 'NLS0000856');
      } else {
        // 저장되었습니다.
        common.alert('success', 'NLS0000012');
      }
      dispatch(actions.FETCH_PROJECT_EXECUTION_INFO, {
        prjId: params.prjId,
      });
      dispatch(actions.FETCH_PROJECT_BIZ_INFO, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* CSF 도출 저장
  async [actions.UPDATE_PROJECT_CSF_INFO]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updatePrjCsfInfo.do', params);
      if (params.stepStatus == '1') {
        //완료되었습니다
        common.alert('success', 'NLS0000856');
      } else {
        // 저장되었습니다.
        common.alert('success', 'NLS0000012');
      }
      dispatch(actions.FETCH_PROJECT_EXECUTION_INFO, {
        prjId: params.prjId,
      });
      dispatch(actions.FETCH_PROJECT_CSF_INFO, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 컨셉수립 저장
  async [actions.UPDATE_PROJECT_DIRCT_INFO]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updatePrjDirctInfo.do', params);
      if (params.stepStatus == '1') {
        //완료되었습니다
        common.alert('success', 'NLS0000856');
      } else {
        // 저장되었습니다.
        common.alert('success', 'NLS0000012');
      }
      dispatch(actions.FETCH_PROJECT_EXECUTION_INFO, {
        prjId: params.prjId,
      });
      dispatch(actions.FETCH_PROJECT_DIRCT_INFO, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 상세계획 INFO 저장
  async [actions.UPDATE_PROJECT_DEV_LIST]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updatePrjDevList.do', params);
      if (!common.isEmpty(params.devContentList)) {
        if (params.stepStatus == '1') {
          //완료되었습니다
          common.alert('success', 'NLS0000856');
        } else {
          // 저장되었습니다.
          common.alert('success', 'NLS0000012');
        }
      } else {
        if (params.prjStatus == 'B') {
          //진행중단 되었습니다
          common.alert('success', 'NLS0000946');
        } else {
          //수행승인 되었습니다
          common.alert('success', 'NLS0000907');
        }
      }
      dispatch(actions.FETCH_PROJECT_EXECUTION_INFO, {
        prjId: params.prjId,
      });
      dispatch(actions.FETCH_PROJECT_DEV_LIST, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 현장적용 LIST 저장
  async [actions.UPDATE_PROJECT_PILOT_LIST]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updatePilotList.do', params);
      if (params.stepStatus == '1') {
        //완료되었습니다
        common.alert('success', 'NLS0000856');
      } else {
        // 저장되었습니다.
        common.alert('success', 'NLS0000012');
      }
      dispatch(actions.FETCH_PROJECT_EXECUTION_INFO, {
        prjId: params.prjId,
      });
      dispatch(actions.FETCH_PROJECT_PILOT_LIST, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 효과파악 INFO 저장
  async [actions.UPDATE_PROJECT_RD_EFFECT]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updateRdEffectInfo.do', params);
      if (params.stepStatus == '1') {
        //완료되었습니다
        common.alert('success', 'NLS0000856');
      } else {
        // 저장되었습니다.
        common.alert('success', 'NLS0000012');
      }
      dispatch(actions.FETCH_PROJECT_EXECUTION_INFO, {
        prjId: params.prjId,
      });
      dispatch(actions.FETCH_PROJECT_RD_EFFECT, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //**-------------   의사결정   -------------**/
  //* 현상파악 저장
  async [actions.UPDATE_PROJECT_GRASP_INFO]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updateDsGraspInfo.do', params);
      if (params.stepStatus == '1') {
        //완료되었습니다
        common.alert('success', 'NLS0000856');
      } else {
        // 저장되었습니다.
        common.alert('success', 'NLS0000012');
      }
      dispatch(actions.FETCH_PROJECT_EXECUTION_INFO, {
        prjId: params.prjId,
      });
      dispatch(actions.FETCH_PROJECT_GRASP_INFO, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 결정요인 저장
  async [actions.UPDATE_PROJECT_DECISION_LIST]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updateDcsList.do', params);
      if (params.stepStatus == '1') {
        //완료되었습니다
        common.alert('success', 'NLS0000856');
      } else {
        // 저장되었습니다.
        common.alert('success', 'NLS0000012');
      }
      dispatch(actions.FETCH_PROJECT_EXECUTION_INFO, {
        prjId: params.prjId,
      });
      dispatch(actions.FETCH_PROJECT_DECISION_LIST, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 대안설정 LIST 저장
  async [actions.UPDATE_PROJECT_ALT_LIST]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updateAltList.do', params);
      if (params.stepStatus == '1') {
        //완료되었습니다
        common.alert('success', 'NLS0000856');
      } else {
        // 저장되었습니다.
        common.alert('success', 'NLS0000012');
      }
      dispatch(actions.FETCH_PROJECT_EXECUTION_INFO, {
        prjId: params.prjId,
      });
      dispatch(actions.FETCH_PROJECT_ALT_LIST, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 상세계획 LIST 저장
  async [actions.UPDATE_PROJECT_IMPL_LIST]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updatePrjImplList.do', params);
      if (!common.isEmpty(params.implList)) {
        if (params.stepStatus == '1') {
          //완료되었습니다
          common.alert('success', 'NLS0000856');
        } else {
          // 저장되었습니다.
          common.alert('success', 'NLS0000012');
        }
      } else {
        if (params.prjStatus == 'B') {
          //진행중단 되었습니다
          common.alert('success', 'NLS0000946');
        } else {
          //수행승인 되었습니다
          common.alert('success', 'NLS0000907');
        }
      }
      dispatch(actions.FETCH_PROJECT_EXECUTION_INFO, {
        prjId: params.prjId,
      });
      dispatch(actions.FETCH_PROJECT_IMPL_LIST, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* RISK관리 LIST 저장
  async [actions.UPDATE_PROJECT_RISK_LIST]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updateRiskMngList.do', params);
      if (params.stepStatus == '1') {
        //완료되었습니다
        common.alert('success', 'NLS0000856');
      } else {
        // 저장되었습니다.
        common.alert('success', 'NLS0000012');
      }
      dispatch(actions.FETCH_PROJECT_EXECUTION_INFO, {
        prjId: params.prjId,
      });
      dispatch(actions.FETCH_PROJECT_IMPL_LIST, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 효과파악 INFO 저장
  async [actions.UPDATE_PROJECT_DS_EFFECT]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updateDsEffectInfo.do', params);
      if (params.stepStatus == '1') {
        //완료되었습니다
        common.alert('success', 'NLS0000856');
      } else {
        // 저장되었습니다.
        common.alert('success', 'NLS0000012');
      }
      dispatch(actions.FETCH_PROJECT_EXECUTION_INFO, {
        prjId: params.prjId,
      });
      dispatch(actions.FETCH_PROJECT_DS_EFFECT, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //**-------------   판매 4단계   -------------**/
  //* 고객파악 저장
  async [actions.UPDATE_PROJECT_SA_CUST]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updateSaCustInfo.do', params);
      if (params.stepStatus == '1') {
        //완료되었습니다
        common.alert('success', 'NLS0000856');
      } else {
        // 저장되었습니다.
        common.alert('success', 'NLS0000012');
      }
      dispatch(actions.FETCH_PROJECT_EXECUTION_INFO, {
        prjId: params.prjId,
      });
      dispatch(actions.FETCH_PROJECT_SA_CUST, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 질문 INFO 저장
  async [actions.UPDATE_PROJECT_SA_BIZ]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updateSaBizInfo.do', params);
      if (params.stepStatus == '1') {
        //완료되었습니다
        common.alert('success', 'NLS0000856');
      } else {
        // 저장되었습니다.
        common.alert('success', 'NLS0000012');
      }
      dispatch(actions.FETCH_PROJECT_EXECUTION_INFO, {
        prjId: params.prjId,
      });
      dispatch(actions.FETCH_PROJECT_SA_BIZ, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 제시 INFO 저장
  async [actions.UPDATE_PROJECT_SUGGEST_INFO]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updateSuggestInfo.do', params);
      if (params.stepStatus == '1') {
        //완료되었습니다
        common.alert('success', 'NLS0000856');
      } else {
        // 저장되었습니다.
        common.alert('success', 'NLS0000012');
      }
      dispatch(actions.FETCH_PROJECT_EXECUTION_INFO, {
        prjId: params.prjId,
      });
      dispatch(actions.FETCH_PROJECT_SUGGEST_INFO, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 제시 INFO 저장
  async [actions.UPDATE_PROJECT_OVER_INFO]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updateOverInfo.do', params);
      if (params.flag === 'U') {
        if (params.stepStatus == '1') {
          //완료되었습니다
          common.alert('success', 'NLS0000856');
        } else {
          // 저장되었습니다.
          common.alert('success', 'NLS0000012');
        }
      } else if (params.flag === 'M') {
        if (params.prjStatus == 'B') {
          //진행중단 되었습니다
          common.alert('success', 'NLS0000946');
        } else {
          //수행승인 되었습니다
          common.alert('success', 'NLS0000907');
        }
      }
      dispatch(actions.FETCH_PROJECT_EXECUTION_INFO, {
        prjId: params.prjId,
      });
      dispatch(actions.FETCH_PROJECT_OVER_INFO, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 결정 LIST 저장
  async [actions.UPDATE_PROJECT_MON_LIST]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updatePrjMonList.do', params);
      if (params.stepStatus == '1') {
        //완료되었습니다
        common.alert('success', 'NLS0000856');
      } else {
        // 저장되었습니다.
        common.alert('success', 'NLS0000012');
      }
      dispatch(actions.FETCH_PROJECT_EXECUTION_INFO, {
        prjId: params.prjId,
      });
      dispatch(actions.FETCH_PROJECT_MON_LIST, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },
  //* 효과파악 INFO 저장
  async [actions.UPDATE_PROJECT_SA_EFFECT]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/updateSaEffectInfo.do', params);
      if (params.stepStatus == '1') {
        //완료되었습니다
        common.alert('success', 'NLS0000856');
      } else {
        // 저장되었습니다.
        common.alert('success', 'NLS0000012');
      }
      dispatch(actions.FETCH_PROJECT_EXECUTION_INFO, {
        prjId: params.prjId,
      });
      dispatch(actions.FETCH_PROJECT_SA_EFFECT, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },

  //* 잠재 원인 POPUP 삭제
  async [actions.DELETE_PROJECT_CAUSE]({ dispatch }, params) {
    try {
      await axiosInstance.post('api/project/deleteProjectCause.do', params);
      //삭제되었습니다
      common.alert('warning', 'NLS0000002');
      dispatch(actions.FETCH_PROJECT_CAUSE_LIST, {
        prjId: params.prjId,
      });
    } catch (error) {
      errorEventHandler(error);
    }
  },

  // TODO: INIT Methods declaration
  //* 과제 리스트 검색 조건 저장
  [actions.INIT_PRJ_SRCH_CONDITION]({ commit }, payload) {
    commit(mutations.SET_PRJ_SRCH_CONDITION, payload);
  },
  //* 과제 단계 상태 설정
  [actions.INIT_PROJECT_STATUS_LIST]({ commit }, payload) {
    commit(mutations.SET_PROJECT_STATUS_LIST, payload);
  },
  //* 개선스킬 STEP INFO
  [actions.INIT_PROJECT_SKILL_STEP_INFO]({ commit }, payload) {
    commit(mutations.SET_PROJECT_SKILL_STEP_INFO, payload);
  },
  //* 잠재 원인 POPUP INFO 설정
  [actions.INIT_PROJECT_CAUSE_INFO]({ commit }, payload) {
    commit(mutations.SET_PROJECT_CAUSE_INFO, payload);
  },
  //* 보고서 스킨설정 팝업 INFO 설정
  [actions.INIT_PROJECT_REPORT_SKIN_INFO]({ commit }, payload) {
    commit(mutations.SET_PROJECT_REPORT_SKIN_INFO, payload);
  },
  // //* 보고서 상세 팝업 USE INFO 설정
  [actions.INIT_PROJECT_REPORT_USE_INFO]({ commit }, payload) {
    commit(mutations.SET_PROJECT_REPORT_USE_INFO, payload);
  },
  //* 보고서 첨부파일 팝업 INFO 설정
  [actions.INIT_PROJECT_ATTACH_FILE_INFO]({ commit }, payload) {
    commit(mutations.SET_PROJECT_ATTACH_FILE_INFO, payload);
  },
  //* 과제 메신저 팝업 INFO 설정
  [actions.INIT_PROJECT_MESSENGER_INFO]({ commit }, payload) {
    commit(mutations.SET_PROJECT_MESSENGER_INFO, payload);
  },
  //* 과제등록 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_PROJECT_REGIST_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_PROJECT_REGIST_POP, payload);
  },
  //* 과제 기간 설정 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_PROJECT_DATE_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_PROJECT_DATE_POP, payload);
  },
  //* 대첵수립 기간 설정 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_MEASURE_DATE_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_MEASURE_DATE_POP, payload);
  },
  //* 잠재 원인추가 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_POTENTIAL_CAUSE_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_POTENTIAL_CAUSE_POP, payload);
  },
  //* 보고서 스킨설정 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_REPORT_SKIN_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_REPORT_SKIN_POP, payload);
  },
  //* 보고서 상세화면 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_REPORT_DETAIL_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_REPORT_DETAIL_POP, payload);
  },
  //* 보고서 첨부파일 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_ATTACH_FILE_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_ATTACH_FILE_POP, payload);
  },
  //* 과제 메신저 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_MESSENGER_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_MESSENGER_POP, payload);
  },
  //* 개선스킬 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_SKILL_CONF_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_SKILL_CONF_POP, payload);
  },
  //* KPI 연결 팝업 ON/OFF 설정
  [actions.INIT_VIEWS_KPI_LIST_POP]({ commit }, payload) {
    commit(mutations.SET_VIEWS_KPI_LIST_POP, payload);
  },
  [actions.INIT_ADD_CAUSE_LIST]({ commit }, payload) {
    commit(mutations.SET_ADD_CAUSE_LIST, payload);
  },
};
