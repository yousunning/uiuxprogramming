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

/* ========================================
   6주차: 이벤트와 화면 상태 변경
======================================== */

// DOM 요소 선택
const themeButton = document.querySelector("#themeButton");
const userNameInput = document.querySelector("#userName");
const userNameCount = document.querySelector("#userNameCount");
const agreeCheck = document.querySelector("#agreeCheck");
const agreeMessage = document.querySelector("#agreeMessage");
const startButton = document.querySelector("#startButton");

// click: 화면 테마 변경
function handleThemeClick() {
  const isDark = document.body.classList.toggle("dark");

  themeButton.textContent = isDark
    ? "밝은 테마로 바꾸기"
    : "어두운 테마로 바꾸기";
}

themeButton.addEventListener("click", handleThemeClick);

// input: 사용자 이름 글자 수 표시
function handleUserNameInput() {
  const currentLength = userNameInput.value.length;

  userNameCount.textContent = currentLength + " / 10";
}

userNameInput.addEventListener("input", handleUserNameInput);

// change: 이용 안내 확인 상태 변경
function handleAgreeChange() {
  const agreed = agreeCheck.checked;

  startButton.disabled = !agreed;

  agreeMessage.textContent = agreed
    ? "확인이 완료되었습니다. 서비스를 시작할 수 있습니다."
    : "안내 확인 후 서비스를 시작할 수 있습니다.";

  agreeMessage.classList.toggle("is-ready", agreed);
}

agreeCheck.addEventListener("change", handleAgreeChange);

/* ========================================
   6주차: 주요 기능 탭 UI
======================================== */

// 모든 탭과 패널 선택
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

// 기존 선택 상태 초기화
function resetTabsAndPanels() {
  tabs.forEach(function (tab) {
    tab.classList.remove("is-active");
    tab.setAttribute("aria-selected", "false");
  });

  panels.forEach(function (panel) {
    panel.classList.remove("is-active");
    panel.hidden = true;
  });
}

// 클릭한 탭과 연결된 패널 활성화
function activateTab(clickedTab) {
  const targetSelector = clickedTab.dataset.target;
  const targetPanel = document.querySelector(targetSelector);

  clickedTab.classList.add("is-active");
  clickedTab.setAttribute("aria-selected", "true");

  targetPanel.classList.add("is-active");
  targetPanel.hidden = false;
}

// 탭 클릭 이벤트 처리
function handleTabClick(event) {
  resetTabsAndPanels();
  activateTab(event.currentTarget);
}

// 모든 탭에 클릭 이벤트 연결
tabs.forEach(function (tab) {
  tab.addEventListener("click", handleTabClick);
});
