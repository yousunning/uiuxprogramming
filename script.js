// ========================================
// 5주차: JavaScript 연결 및 알림 설정
// ========================================

console.log("JavaScript가 연결되었습니다.");

const panelTitle = "코디 추천 알림 설정";
let isSaved = false;

const saveMessage = document.querySelector("#saveMessage");
const saveButton = document.querySelector("#saveButton");

function makeSaveMessage(saved) {
  if (saved === true) {
    return "코디 추천 알림 설정이 완료되었습니다.";
  } else {
    return "코디 추천 알림을 설정해 주세요.";
  }
}

function saveSettings() {
  isSaved = true;

  saveMessage.textContent = makeSaveMessage(isSaved);
  saveMessage.classList.add("is-saved");

  saveButton.textContent = "설정 완료";
  saveButton.disabled = true;
}

saveButton.addEventListener("click", saveSettings);

// ========================================
// 6주차: click, input, change 이벤트
// ========================================

const themeButton = document.querySelector("#themeButton");
const userNameInput = document.querySelector("#userName");
const userNameCount = document.querySelector("#userNameCount");
const agreeCheck = document.querySelector("#agreeCheck");
const agreeMessage = document.querySelector("#agreeMessage");
const startButton = document.querySelector("#startButton");

// click: 테마 전환
function handleThemeClick() {
  const isDark = document.body.classList.toggle("dark");

  themeButton.textContent = isDark
    ? "밝은 테마로 바꾸기"
    : "어두운 테마로 바꾸기";
}

themeButton.addEventListener("click", handleThemeClick);

// input: 글자 수 표시
function handleUserNameInput() {
  const currentLength = userNameInput.value.length;
  userNameCount.textContent = currentLength + " / 10";
}

userNameInput.addEventListener("input", handleUserNameInput);

// change: 서비스 이용 안내 확인
function handleAgreeChange() {
  const agreed = agreeCheck.checked;

  startButton.disabled = !agreed;

  agreeMessage.textContent = agreed
    ? "확인이 완료되었습니다. 서비스를 시작할 수 있습니다."
    : "안내 확인 후 서비스를 시작할 수 있습니다.";

  agreeMessage.classList.toggle("is-ready", agreed);
}

agreeCheck.addEventListener("change", handleAgreeChange);

// ========================================
// 6주차: 주요 기능 탭 UI
// ========================================

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

function resetTabsAndPanels() {
  tabs.forEach(function (tab) {
    tab.classList.remove("is-active");
    tab.setAttribute("aria-selected", "false");
    tab.setAttribute("tabindex", "-1");
  });

  panels.forEach(function (panel) {
    panel.classList.remove("is-active");
    panel.hidden = true;
  });
}

function activateTab(clickedTab) {
  const targetSelector = clickedTab.dataset.target;
  const targetPanel = document.querySelector(targetSelector);

  if (!targetPanel) {
    return;
  }

  resetTabsAndPanels();

  clickedTab.classList.add("is-active");
  clickedTab.setAttribute("aria-selected", "true");
  clickedTab.setAttribute("tabindex", "0");

  targetPanel.classList.add("is-active");
  targetPanel.hidden = false;
}

function handleTabClick(event) {
  activateTab(event.currentTarget);
}

tabs.forEach(function (tab, index) {
  tab.addEventListener("click", handleTabClick);

  // 키보드 좌우 방향키로 탭 전환
  tab.addEventListener("keydown", function (event) {
    if (
      event.key !== "ArrowRight" &&
      event.key !== "ArrowLeft" &&
      event.key !== "Home" &&
      event.key !== "End"
    ) {
      return;
    }

    event.preventDefault();

    let nextIndex = index;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    }

    activateTab(tabs[nextIndex]);
    tabs[nextIndex].focus();
  });
});

// ========================================
// 7주차: 코디 추천 사용자 흐름
// ========================================

// 1. DOM 요소 선택
const outfitStart = document.querySelector("#outfitStart");
const outfitFlow = document.querySelector("#outfitFlow");
const outfitSteps = document.querySelectorAll(".outfit-step");
const outfitProgress = document.querySelector("#outfitProgress");

const situationInput = document.querySelector("#situation");
const emailInput = document.querySelector("#email");

const situationError = document.querySelector("#situationError");
const emailError = document.querySelector("#emailError");

const outfitWeather = document.querySelector("#outfitWeather");
const outfitStyle = document.querySelector("#outfitStyle");
const weatherHelp = document.querySelector("#weatherHelp");

const summarySituation = document.querySelector("#summarySituation");
const summaryEmail = document.querySelector("#summaryEmail");
const summaryWeather = document.querySelector("#summaryWeather");
const summaryStyle = document.querySelector("#summaryStyle");

const stepNames = ["정보 입력", "조건 선택", "내용 확인"];

// 2. 현재 단계 표시
function showOutfitStep(step) {
  outfitSteps.forEach(function (item) {
    item.hidden = Number(item.dataset.step) !== step;
  });

  outfitProgress.textContent =
    step <= 3 ? step + " / 3 · " + stepNames[step - 1] : "코디 추천 신청 완료";
}

// 3. 시작: 기존 핵심 버튼과 6주차 시작 버튼 연결
function startOutfitFlow() {
  outfitFlow.hidden = false;

  // 완료 후 새 신청을 시작하는 경우 상태 초기화
  const completedStep = document.querySelector('.outfit-step[data-step="4"]');

  if (!completedStep.hidden) {
    resetOutfitFlow();
  }

  showOutfitStep(1);
  outfitStart.hidden = true;

  document.querySelector("#recommend").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  situationInput.focus({ preventScroll: true });
}

outfitStart.addEventListener("click", startOutfitFlow);

// 6주차 이용 안내 동의 후 시작
startButton.addEventListener("click", function () {
  if (!agreeCheck.checked) {
    return;
  }

  startOutfitFlow();
});

// 4. 필수값 오류 표시
function setFieldError(input, errorElement, message) {
  errorElement.textContent = message;
  input.classList.toggle("has-error", message !== "");

  if (message !== "") {
    input.setAttribute("aria-invalid", "true");
  } else {
    input.removeAttribute("aria-invalid");
  }
}

// 5. 이메일 형식 검사
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// 6. 정보 입력 검증
function validateOutfitInformation() {
  const situation = situationInput.value.trim();
  const email = emailInput.value.trim();

  let isValid = true;
  let firstInvalidField = null;

  if (situation === "") {
    setFieldError(
      situationInput,
      situationError,
      "오늘의 상황을 입력해 주세요. 예: 출근, 데이트, 여행",
    );

    isValid = false;
    firstInvalidField = situationInput;
  } else {
    setFieldError(situationInput, situationError, "");
  }

  if (email === "") {
    setFieldError(emailInput, emailError, "이메일 주소를 입력해 주세요.");

    isValid = false;

    if (!firstInvalidField) {
      firstInvalidField = emailInput;
    }
  } else if (!isValidEmail(email)) {
    setFieldError(
      emailInput,
      emailError,
      "올바른 이메일 형식으로 입력해 주세요. 예: name@example.com",
    );

    isValid = false;

    if (!firstInvalidField) {
      firstInvalidField = emailInput;
    }
  } else {
    setFieldError(emailInput, emailError, "");
  }

  if (!isValid && firstInvalidField) {
    firstInvalidField.focus();
  }

  return isValid;
}

// 입력값 수정 시 오류 메시지 제거
situationInput.addEventListener("input", function () {
  setFieldError(situationInput, situationError, "");
});

emailInput.addEventListener("input", function () {
  setFieldError(emailInput, emailError, "");
});

// 7. 1단계 → 2단계
document.querySelector("#outfitNext1").addEventListener("click", function () {
  if (!validateOutfitInformation()) {
    return;
  }

  showOutfitStep(2);
  outfitWeather.focus();
});

// 8. 날씨 선택에 따른 추가 안내
function handleWeatherChange() {
  const weather = outfitWeather.value;

  if (weather === "비") {
    weatherHelp.textContent =
      "비가 오는 날에는 방수 기능이 있는 겉옷과 신발을 고려해 보세요.";
  } else if (weather === "눈") {
    weatherHelp.textContent =
      "눈이 오는 날에는 보온성과 미끄럼 방지 기능을 고려해 보세요.";
  } else {
    weatherHelp.textContent =
      "선택한 날씨와 선호 스타일을 기준으로 신청 내용을 확인합니다.";
  }
}

outfitWeather.addEventListener("change", handleWeatherChange);

// 9. 2단계 → 1단계: 입력값 유지
document.querySelector("#outfitBack2").addEventListener("click", function () {
  showOutfitStep(1);
  situationInput.focus();
});

// 10. 2단계 → 3단계: 입력 및 선택값 반영
document.querySelector("#outfitNext2").addEventListener("click", function () {
  summarySituation.textContent = situationInput.value.trim();
  summaryEmail.textContent = emailInput.value.trim();
  summaryWeather.textContent = outfitWeather.value;
  summaryStyle.textContent = outfitStyle.value;

  showOutfitStep(3);
  document.querySelector("#outfitBack3").focus();
});

// 11. 3단계 → 2단계: 선택값 유지
document.querySelector("#outfitBack3").addEventListener("click", function () {
  showOutfitStep(2);
  outfitWeather.focus();
});

// 12. 신청 완료
document
  .querySelector("#outfitComplete")
  .addEventListener("click", function () {
    showOutfitStep(4);
    document.querySelector("#outfitRestart").focus();
  });

// 13. 다시 시작: 입력·오류·선택·진행 상태 초기화
function resetOutfitFlow() {
  situationInput.value = "";
  emailInput.value = "";

  outfitWeather.value = "맑음";
  outfitStyle.value = "캐주얼";

  setFieldError(situationInput, situationError, "");
  setFieldError(emailInput, emailError, "");

  weatherHelp.textContent = "오늘의 날씨에 맞는 옷차림을 선택해 보세요.";

  summarySituation.textContent = "";
  summaryEmail.textContent = "";
  summaryWeather.textContent = "";
  summaryStyle.textContent = "";

  showOutfitStep(1);
}

// 14. 다시 시작 버튼
document.querySelector("#outfitRestart").addEventListener("click", function () {
  resetOutfitFlow();
  situationInput.focus();
});
