export default {
  mboManagementList: [], //* MBO 관리 메인화면 리스트
  mboTargetList: [], //* MBO 대상 인원 내역 리스트
  mboEvalTargetList: [], //* MBO 평가대상자 리스트
  selectedMboInfo: {}, //* 선택한 MBO 기본정보(mbo명, mbo Id)
  mboEvalConf: {}, //* 단일 MBO

  isNewMboSave: false, //* MBO저장이 신규 ON/OFF
  isExistMboName: false, //* MBO명 중복체크
  beRegistName: false, //* 등록가능한 MBO명
  alreayRegistName: false, //* 이미 등록된 MBo명

  mboDropdownList: {
    //* MBO 드롭다운 메뉴 리스트
    mboEvalType: [], //* MBO 평가 타입
    mboEvalStatus: [], //* MBO 평가 상태
  },

  button: {
    btnMboTargetSetup: false, //* 평가 대상자 탭 ON/OFF
    btnMboRegistDelete: false, //* MBO 등록 팝업 삭제 버튼 ON/OFF
  },

  //* 탭 내용
  contents: {
    mboTarget: true,
    mboTargetSetup: false,
  },

  //* MBO 등록 및 수정 팝업
  views: {
    mboRegistPopup: false,
  },
};
