export default {
  mboCurrInfo: {}, //* MBO 현황 정보 데이터
  mboList: [], //* MBO 목록 정보 데이터
  mboNameList: [], //* MBO명 DROPDOWN 리스트 데이터
  mboModTargetInfo: {}, //* MBO 수정목표 정보 데이터
  mboKpiPoolList: [], //* MBO 항목(KPI) 데이터
  //isSelectedNewKpi: false, //* 선택한 MBO 항목(KPI)
  selectedMboInfo: {}, //* MBO 목록에서 선택된 MBO 정보

  selectedTargetMboKpi: {}, //* 선택한 목표수정 MBO KPI
  changedTargetMboKpi: {}, //* 목표를 수정한 KPI
  views: {
    mboModifyTarget: true, //* MBO 수정목표 POPUP ON/OFF
    MboKpiPopup: false, //* MBO 항목(KPI) 팝업 ON/OFF
  },
  mboBoardTab: true, //* MBO 현황탭 ON/OFF
  mboListTab: false, //* MBO 목록탭 ON/FF
};
