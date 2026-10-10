/**
 * 5주차:
 * 기능: 코디 추천 알림 설정 저장
 */
// JavaScript 연결 확인
console.log("JavaScript가 연결되었습니다.");

// 1. 변하지 않는 값은 const로 선언
const panelTitle = "코디 추천 알림 설정";

// 2. 저장 상태는 let으로 선언
let isSaved = false;

// 3. DOM 요소 선택
const saveMessage = document.querySelector("#saveMessage");
const saveButton = document.querySelector("#saveButton");

// 4. 저장 상태에 따른 안내 문구 반환
function makeSaveMessage(saved) {
  if (saved === true) {
    return "코디 추천 알림 설정이 완료되었습니다.";
  } else {
    return "코디 추천 알림을 설정해 주세요.";
  }
}

// 5. 저장 버튼 클릭 시 실행할 함수
function saveSettings() {
  // 저장 상태 변경
  isSaved = true;

  // 안내 문구 변경
  saveMessage.textContent = makeSaveMessage(isSaved);

  // 저장 완료 스타일 적용
  saveMessage.classList.add("is-saved");

  // 버튼 문구 변경
  saveButton.textContent = "설정 완료";

  // 중복 클릭 방지
  saveButton.disabled = true;
}

// 6. 클릭 이벤트 연결
saveButton.addEventListener("click", saveSettings);
