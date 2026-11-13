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
    step <= 3 ? `${step} / 3 · ${stepNames[step - 1]}` : "코디 추천 신청 완료";

  const currentStep = document.querySelector(
    `.outfit-step[data-step="${step}"]`,
  );

  const heading = currentStep.querySelector("h3");

  if (heading) {
    heading.tabIndex = -1;

    requestAnimationFrame(function () {
      heading.focus({ preventScroll: true });
    });
  }
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

// ========================================
// 9주차: 입력 검증 및 상태 관리
// ========================================

const situationField = document.querySelector("#situationField");
const situationHelp = document.querySelector("#situationHelp");
const situationCount = document.querySelector("#situationCount");
const emailField = document.querySelector("#emailField");

// 오류 표시
function showInputError(input, field, errorElement, message) {
  input.setAttribute("aria-invalid", "true");
  input.classList.add("has-error");

  field.classList.add("has-error");
  field.classList.remove("is-valid");

  errorElement.textContent = message;
  return false;
}

// 오류 해제
function clearInputError(input, field, errorElement) {
  input.removeAttribute("aria-invalid");
  input.classList.remove("has-error");
  field.classList.remove("has-error");

  errorElement.textContent = "";
}

// 기존 초기화 함수와 호환
function setFieldError(input, errorElement, message) {
  const field = input.closest(".flow-field");

  if (message) {
    showInputError(input, field, errorElement, message);
  } else {
    clearInputError(input, field, errorElement);
  }
}

// 이메일 형식 검사
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// 상황 입력 상태
function updateSituationExperience() {
  const length = situationInput.value.length;
  const enough = situationInput.value.trim().length >= 2;
  const invalid = situationInput.getAttribute("aria-invalid") === "true";

  situationCount.textContent = `${length} / 50자`;

  situationField.classList.toggle("is-valid", enough && !invalid);

  if (!invalid) {
    situationHelp.textContent = enough
      ? "입력 조건을 충족했습니다."
      : "외출 상황을 2자 이상 입력해 주세요.";
  }
}

// 상황 검증
function validateSituation() {
  const value = situationInput.value.trim();

  if (!value) {
    situationHelp.textContent = "외출 상황을 2자 이상 입력해 주세요.";

    return showInputError(
      situationInput,
      situationField,
      situationError,
      "오늘의 상황을 입력해 주세요.",
    );
  }

  if (value.length < 2) {
    situationHelp.textContent = "외출 상황을 2자 이상 입력해 주세요.";

    return showInputError(
      situationInput,
      situationField,
      situationError,
      "오늘의 상황을 2자 이상 입력해 주세요.",
    );
  }

  clearInputError(situationInput, situationField, situationError);
  updateSituationExperience();

  return true;
}

// 이메일 검증
function validateEmail() {
  const value = emailInput.value.trim();

  if (!value) {
    return showInputError(
      emailInput,
      emailField,
      emailError,
      "이메일 주소를 입력해 주세요.",
    );
  }

  if (!isValidEmail(value)) {
    return showInputError(
      emailInput,
      emailField,
      emailError,
      "올바른 이메일 형식으로 입력해 주세요.",
    );
  }

  clearInputError(emailInput, emailField, emailError);
  emailField.classList.add("is-valid");

  return true;
}

// 전체 입력 검증
function validateOutfitInformation() {
  const situationValid = validateSituation();
  const emailValid = validateEmail();

  if (!situationValid) {
    situationInput.focus();
  } else if (!emailValid) {
    emailInput.focus();
  }

  return situationValid && emailValid;
}

// 상황 입력 변경
situationInput.addEventListener("input", function () {
  if (situationInput.getAttribute("aria-invalid") === "true") {
    validateSituation();
  }

  updateSituationExperience();
});

// 이메일 입력 변경
emailInput.addEventListener("input", function () {
  if (emailInput.getAttribute("aria-invalid") === "true") {
    validateEmail();
  } else {
    emailField.classList.toggle(
      "is-valid",
      isValidEmail(emailInput.value.trim()),
    );
  }
});

updateSituationExperience();

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
  if (!validateRequest()) {
    outfitRequest.focus();
    return;
  }

  summarySituation.textContent = situationInput.value.trim();
  summaryEmail.textContent = emailInput.value.trim();
  summaryWeather.textContent = outfitWeather.value;
  summaryStyle.textContent = outfitStyle.value;

  summaryRequest.textContent = requestOption.checked
    ? outfitRequest.value.trim()
    : "없음";

  showOutfitStep(3);
});

// 11. 3단계 → 2단계: 선택값 유지
document.querySelector("#outfitBack3").addEventListener("click", function () {
  showOutfitStep(2);
  outfitWeather.focus();
});
// ========================================
// 9주차: 제출 상태 및 실패 처리
// ========================================

const outfitForm = document.querySelector("#outfitFlow");
const outfitCompleteButton = document.querySelector("#outfitComplete");
const submitStatus = document.querySelector("#submitStatus");

// 실습용 실패 조건: 주소에 ?save-error=1 추가
const forceSubmitFailure = new URLSearchParams(window.location.search).has(
  "save-error",
);

let isSubmitting = false;

function setSubmitState(loading, message) {
  isSubmitting = loading;

  outfitForm.setAttribute("aria-busy", String(loading));

  outfitCompleteButton.disabled = loading;

  outfitCompleteButton.textContent = loading
    ? "신청 처리 중..."
    : "코디 추천 신청 완료";

  submitStatus.textContent = message;
}

function wait(milliseconds) {
  return new Promise(function (resolve) {
    window.setTimeout(resolve, milliseconds);
  });
}

// 실습용 비동기 신청 처리
async function submitOutfitApplication() {
  await wait(600);

  if (forceSubmitFailure) {
    throw new Error("실습용 신청 실패");
  }

  // 실제 서버 전송 없이 성공 상태를 반환
  return true;
}

// 최종 제출
outfitForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  if (isSubmitting) {
    return;
  }

  const currentStep = document.querySelector(".outfit-step:not([hidden])");

  if (!currentStep || currentStep.dataset.step !== "3") {
    return;
  }

  // 최종 제출 시 입력값 전체 재검증
  if (!validateOutfitInformation()) {
    showOutfitStep(1);

    requestAnimationFrame(function () {
      outfitForm.querySelector('[aria-invalid="true"]')?.focus();
    });

    return;
  }

  if (!validateRequest()) {
    showOutfitStep(2);

    requestAnimationFrame(function () {
      outfitRequest.focus();
    });

    return;
  }

  setSubmitState(true, "코디 추천 신청을 처리하고 있습니다.");

  try {
    await submitOutfitApplication();

    setSubmitState(false, "코디 추천 신청이 완료되었습니다.");

    showOutfitStep(4);
  } catch (error) {
    setSubmitState(
      false,
      "신청을 완료하지 못했습니다. 입력한 내용은 유지됩니다. 다시 시도해 주세요.",
    );
  }
});

// 13. 다시 시작: 입력·오류·선택·진행 상태 초기화
function resetOutfitFlow() {
  situationInput.value = "";
  emailInput.value = "";

  outfitWeather.value = "맑음";
  outfitStyle.value = "캐주얼";

  weatherHelp.textContent = "오늘의 날씨에 맞는 옷차림을 선택해 보세요.";

  summarySituation.textContent = "";
  summaryEmail.textContent = "";
  summaryWeather.textContent = "";
  summaryStyle.textContent = "";

  showOutfitStep(1);

  // 9주차 추가 요청사항 초기화
  requestOption.checked = false;
  outfitRequest.value = "";

  clearInputError(outfitRequest, requestOptions, requestError);

  requestOptions.classList.remove("is-valid");

  syncRequestFields();
  updateRequestExperience();

  // 상황·이메일 입력 상태 초기화
  clearInputError(situationInput, situationField, situationError);

  clearInputError(emailInput, emailField, emailError);

  situationField.classList.remove("is-valid");
  emailField.classList.remove("is-valid");

  updateSituationExperience();

  summaryRequest.textContent = "없음";

  // 제출 상태 초기화
  setSubmitState(false, "");

  // 중간고사 추천 결과 초기화
  recommendationIndex = 0;
  previousRecommendationKey = "";
  clearRecommendationResult();
}

// ========================================
// 중간고사: 개인 맞춤 코디 추천 기능
// ========================================

// DOM 요소 선택
const generateOutfitButton = document.querySelector("#generateOutfit");

const regenerateOutfitButton = document.querySelector("#regenerateOutfit");

const outfitResult = document.querySelector("#outfitResult");

const outfitNoResult = document.querySelector("#outfitNoResult");

const outfitResultTitle = document.querySelector("#outfitResultTitle");

const resultTop = document.querySelector("#resultTop");

const resultBottom = document.querySelector("#resultBottom");

const resultOuter = document.querySelector("#resultOuter");

const resultReason = document.querySelector("#resultReason");

const noResultMessage = document.querySelector("#noResultMessage");

const editOutfitConditions = document.querySelector("#editOutfitConditions");

// 지원하는 상황별 코디 데이터
const outfitRecommendations = {
  출근: {
    캐주얼: [
      { top: "니트", bottom: "슬랙스" },
      { top: "셔츠", bottom: "면바지" },
    ],
    포멀: [
      { top: "블라우스 또는 셔츠", bottom: "정장 슬랙스" },
      { top: "단정한 셔츠", bottom: "테일러드 팬츠" },
    ],
    스포티: [
      { top: "깔끔한 맨투맨", bottom: "조거 팬츠" },
      { top: "베이직 티셔츠", bottom: "활동성 좋은 팬츠" },
    ],
  },

  데이트: {
    캐주얼: [
      { top: "가디건", bottom: "데님 팬츠" },
      { top: "니트", bottom: "와이드 팬츠" },
    ],
    포멀: [
      { top: "셔츠", bottom: "슬랙스" },
      { top: "블라우스", bottom: "테일러드 팬츠" },
    ],
    스포티: [
      { top: "스웨트셔츠", bottom: "조거 팬츠" },
      { top: "후드 티셔츠", bottom: "데님 팬츠" },
    ],
  },

  여행: {
    캐주얼: [
      { top: "편안한 티셔츠", bottom: "데님 팬츠" },
      { top: "맨투맨", bottom: "면바지" },
    ],
    포멀: [
      { top: "린넨 셔츠", bottom: "슬랙스" },
      { top: "단정한 니트", bottom: "와이드 팬츠" },
    ],
    스포티: [
      { top: "기능성 티셔츠", bottom: "조거 팬츠" },
      { top: "스포츠 맨투맨", bottom: "트레이닝 팬츠" },
    ],
  },

  학교: {
    캐주얼: [
      { top: "맨투맨", bottom: "데님 팬츠" },
      { top: "후드 티셔츠", bottom: "면바지" },
    ],
    포멀: [
      { top: "셔츠", bottom: "슬랙스" },
      { top: "가디건", bottom: "테일러드 팬츠" },
    ],
    스포티: [
      { top: "후드 티셔츠", bottom: "조거 팬츠" },
      { top: "스포츠 티셔츠", bottom: "트레이닝 팬츠" },
    ],
  },
};

// 날씨별 겉옷 및 추천 이유
const weatherRecommendations = {
  맑음: {
    outer: "가벼운 가디건 또는 필요에 따라 생략",
    reason: "맑은 날에는 활동하기 편한 옷차림을 추천합니다.",
  },
  흐림: {
    outer: "가벼운 재킷",
    reason: "흐린 날에는 겉옷을 준비하면 좋습니다.",
  },
  비: {
    outer: "방수 재킷",
    reason: "비가 오는 날에는 방수 겉옷과 미끄럽지 않은 신발을 추천합니다.",
  },
  눈: {
    outer: "방한 패딩",
    reason: "눈이 오는 날에는 보온성과 미끄럼 방지를 고려하세요.",
  },
};

// 동일 조건에서 다른 코디를 순서대로 추천하기 위한 상태
let recommendationIndex = 0;
let previousRecommendationKey = "";

// 입력한 상황을 지원하는 상황으로 분류
function findOutfitSituation(value) {
  const normalized = value.trim().replace(/\s+/g, "");

  const supportedSituations = ["출근", "데이트", "여행", "학교"];

  return (
    supportedSituations.find(function (situation) {
      return normalized.includes(situation);
    }) || null
  );
}

// 추천 결과와 오류 상태 숨기기
function clearRecommendationResult() {
  outfitResult.hidden = true;
  outfitNoResult.hidden = true;

  outfitResultTitle.textContent = "";
  resultTop.textContent = "";
  resultBottom.textContent = "";
  resultOuter.textContent = "";
  resultReason.textContent = "";
  noResultMessage.textContent = "";

  generateOutfitButton.hidden = false;
}

// 추천 코디 생성
function generateOutfitRecommendation() {
  const situation = findOutfitSituation(situationInput.value);
  const weather = outfitWeather.value;
  const style = outfitStyle.value;

  clearRecommendationResult();

  // 지원하지 않는 상황: 결과 없음 처리
  if (!situation) {
    outfitNoResult.hidden = false;

    noResultMessage.textContent =
      "현재는 출근, 데이트, 여행, 학교 상황을 지원합니다. " +
      "상황을 수정한 후 다시 추천받아 주세요.";

    generateOutfitButton.hidden = true;
    editOutfitConditions.focus();
    return;
  }

  const candidates = outfitRecommendations[situation][style];
  const weatherInfo = weatherRecommendations[weather];

  // 추천 데이터가 없는 경우
  if (!candidates || !weatherInfo || candidates.length === 0) {
    outfitNoResult.hidden = false;

    noResultMessage.textContent =
      "선택한 조건에 맞는 추천 정보가 없습니다. " +
      "조건을 수정한 후 다시 시도해 주세요.";

    generateOutfitButton.hidden = true;
    editOutfitConditions.focus();
    return;
  }

  const recommendationKey = situation + "|" + weather + "|" + style;

  // 조건이 달라지면 첫 번째 추천부터 시작
  if (previousRecommendationKey !== recommendationKey) {
    recommendationIndex = 0;
    previousRecommendationKey = recommendationKey;
  }

  const selected = candidates[recommendationIndex % candidates.length];

  recommendationIndex += 1;

  outfitResultTitle.textContent = situation + "을(를) 위한 " + style + " 코디";

  resultTop.textContent = selected.top;
  resultBottom.textContent = selected.bottom;
  resultOuter.textContent = weatherInfo.outer;

  resultReason.textContent =
    weatherInfo.reason +
    " " +
    situation +
    " 상황에 맞는 " +
    style +
    " 스타일을 기준으로 추천했습니다.";

  outfitResult.hidden = false;
  generateOutfitButton.hidden = true;

  regenerateOutfitButton.focus();
}

// 최초 추천 생성
generateOutfitButton.addEventListener("click", generateOutfitRecommendation);

// 다른 코디 추천
regenerateOutfitButton.addEventListener("click", generateOutfitRecommendation);

// 결과 없음 → 상황 입력 단계로 이동
editOutfitConditions.addEventListener("click", function () {
  clearRecommendationResult();
  showOutfitStep(1);
  situationInput.focus();
});

// 다시 시작: 모든 입력값 및 추천 상태 초기화
document.querySelector("#outfitRestart").addEventListener("click", function () {
  resetOutfitFlow();
  situationInput.focus();
});

// ========================================
// 9주차: 추가 요청사항 조건부 입력
// ========================================

const requestOption = document.querySelector("#requestOption");
const requestOptions = document.querySelector("#requestOptions");
const outfitRequest = document.querySelector("#outfitRequest");

const requestHelp = document.querySelector("#requestHelp");
const requestCount = document.querySelector("#requestCount");
const requestError = document.querySelector("#requestError");

const summaryRequest = document.querySelector("#summaryRequest");

// 체크박스 상태와 입력 활성화 상태를 함께 변경
function syncRequestFields() {
  const open = requestOption.checked;

  // 체크 여부에 따라 추가 요청사항 영역 표시/숨김
  requestOptions.hidden = !open;

  // 숨겨진 입력 요소 비활성화, 표시 시 활성화
  outfitRequest.disabled = !open;

  requestOption.setAttribute("aria-expanded", String(open));

  if (!open) {
    clearInputError(outfitRequest, requestOptions, requestError);
    requestOptions.classList.remove("is-valid");
  }

  updateRequestExperience();

  // 브라우저 콘솔에서 상태 확인
  console.log("체크 여부:", requestOption.checked);
  console.log("영역 숨김:", requestOptions.hidden);
  console.log("입력 비활성화:", outfitRequest.disabled);
}

requestOption.addEventListener("change", syncRequestFields);

// 요청사항 글자 수 및 상태
function updateRequestExperience() {
  const length = outfitRequest.value.length;
  const enough = outfitRequest.value.trim().length >= 2;

  requestCount.textContent = `${length} / 100자`;

  const invalid = outfitRequest.getAttribute("aria-invalid") === "true";

  requestOptions.classList.toggle(
    "is-valid",
    requestOption.checked && enough && !invalid,
  );

  if (!invalid) {
    requestHelp.textContent = enough
      ? "입력 조건을 충족했습니다."
      : "2~100자로 입력해 주세요.";
  }
}

// 요청사항 검증
function validateRequest() {
  if (!requestOption.checked) {
    return true;
  }

  const value = outfitRequest.value.trim();

  if (value === "") {
    return showInputError(
      outfitRequest,
      requestOptions,
      requestError,
      "추가 요청사항을 입력하거나 체크를 해제해 주세요.",
    );
  }

  if (value.length < 2) {
    return showInputError(
      outfitRequest,
      requestOptions,
      requestError,
      "추가 요청사항을 2자 이상 입력해 주세요.",
    );
  }

  clearInputError(outfitRequest, requestOptions, requestError);

  updateRequestExperience();
  return true;
}

outfitRequest.addEventListener("input", function () {
  if (outfitRequest.getAttribute("aria-invalid") === "true") {
    validateRequest();
  }

  updateRequestExperience();
});

syncRequestFields();
updateRequestExperience();

// ========================================
// 9주차: Enter 키 입력 처리
// ========================================

// 1단계에서 Enter 입력 시 다음 단계 버튼과 동일하게 처리
[situationInput, emailInput].forEach(function (input) {
  input.addEventListener("keydown", function (event) {
    if (event.key !== "Enter" || event.isComposing) {
      return;
    }

    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    document.querySelector("#outfitNext1").click();
  });
});
const navLinks = document.querySelectorAll(".site-nav a");

function updateCurrentNav() {
  const currentHash = window.location.hash;

  navLinks.forEach((link) => {
    const isCurrent = currentHash
      ? link.getAttribute("href") === currentHash
      : link === navLinks[0];

    link.classList.toggle("is-current", isCurrent);

    if (isCurrent) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

window.addEventListener("hashchange", updateCurrentNav);
updateCurrentNav();

// ========================================
// 10주차: 모바일 메뉴 열기·닫기
// ========================================

const menuToggle = document.querySelector("#menu-toggle");
const mainNav = document.querySelector("#main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");

    menuToggle.textContent = isOpen ? "메뉴 닫기" : "메뉴 열기";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // 메뉴 선택 시 자동 닫기
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuToggle.textContent = "메뉴 열기";
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ========================================
// 10주차: 코디 저장 목록 및 필터
// ========================================

// DOM 요소
const archiveList = document.querySelector("#archiveList");
const archiveEmpty = document.querySelector("#archiveEmpty");
const archiveEmptyTitle = document.querySelector("#archiveEmptyTitle");
const archiveEmptyDescription = document.querySelector(
  "#archiveEmptyDescription",
);
const archiveEmptyAction = document.querySelector("#archiveEmptyAction");
const archiveCount = document.querySelector("#archiveCount");
const archiveStatus = document.querySelector("#archiveStatus");

const filterButtons = document.querySelectorAll(".filter-button");
const saveOutfitButton = document.querySelector("#saveOutfit");
const saveOutfitStatus = document.querySelector("#saveOutfitStatus");

// 저장 데이터
const OUTFIT_ARCHIVE_KEY = "today-outfit-archive-v1";
let outfitArchive = [];
let currentFilter = "all";

// 기존 저장 기록 불러오기
try {
  const stored = JSON.parse(localStorage.getItem(OUTFIT_ARCHIVE_KEY) || "[]");

  if (Array.isArray(stored)) {
    outfitArchive = stored.filter(
      (item) =>
        item &&
        typeof item.id === "string" &&
        typeof item.title === "string" &&
        typeof item.cancelled === "boolean",
    );
  }
} catch (error) {
  archiveStatus.textContent = "저장 기록을 불러오지 못했습니다.";
}

// 저장 기록 유지
function persistOutfitArchive() {
  try {
    localStorage.setItem(OUTFIT_ARCHIVE_KEY, JSON.stringify(outfitArchive));
    return true;
  } catch (error) {
    archiveStatus.textContent = "저장 공간 오류가 발생했습니다.";
    return false;
  }
}

// 선택된 필터에 맞는 목록 조회
function getVisibleOutfits() {
  return outfitArchive.filter((item) => {
    if (currentFilter === "all") return true;
    if (currentFilter === "cancelled") return item.cancelled;
    return !item.cancelled;
  });
}

// DOM 생성 유틸리티
function createArchiveText(tag, value) {
  const element = document.createElement(tag);
  element.textContent = value;
  return element;
}

// 코디 기록 렌더링
function renderOutfitArchive() {
  const visible = getVisibleOutfits();

  archiveList.replaceChildren();

  archiveList.hidden = visible.length === 0;
  archiveEmpty.hidden = visible.length !== 0;
  archiveCount.textContent = `표시 중인 코디 ${visible.length}개`;

  if (visible.length === 0) {
    const filtered = currentFilter !== "all";

    archiveEmptyTitle.textContent = filtered
      ? "선택한 상태의 코디가 없습니다."
      : "아직 저장한 코디가 없습니다.";

    archiveEmptyDescription.textContent = filtered
      ? "다른 상태를 선택해 보세요."
      : "코디 추천을 받은 뒤 저장해 보세요.";

    archiveEmptyAction.hidden = filtered;
    return;
  }

  visible.forEach((item) => {
    const card = document.createElement("li");
    card.className = "archive-card";

    card.append(
      createArchiveText("h3", item.title),
      createArchiveText("p", item.cancelled ? "상태: 취소됨" : "상태: 저장됨"),
      createArchiveText("p", `상의: ${item.top} / 하의: ${item.bottom}`),
      createArchiveText("p", `겉옷: ${item.outer}`),
      createArchiveText("p", item.reason),
      createArchiveText("p", `저장 시각: ${item.savedAt}`),
    );

    const button = document.createElement("button");
    button.type = "button";
    button.className = "secondary-button";
    button.dataset.id = item.id;
    button.textContent = item.cancelled ? "저장 복구하기" : "저장 취소하기";

    card.append(button);
    archiveList.append(card);
  });
}

// 필터 버튼 클릭
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const active = item === button;

      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    renderOutfitArchive();
  });
});

// 추천 결과 저장
saveOutfitButton.addEventListener("click", () => {
  if (outfitResult.hidden) return;

  const item = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    title: outfitResultTitle.textContent,
    top: resultTop.textContent,
    bottom: resultBottom.textContent,
    outer: resultOuter.textContent,
    reason: resultReason.textContent,
    savedAt: new Date().toLocaleString("ko-KR"),
    cancelled: false,
  };

  outfitArchive.unshift(item);

  if (!persistOutfitArchive()) {
    outfitArchive.shift();
    saveOutfitStatus.textContent = "코디를 저장하지 못했습니다.";
    return;
  }

  saveOutfitStatus.textContent = "코디가 저장되었습니다.";
  archiveStatus.textContent = "코디가 저장되었습니다.";

  renderOutfitArchive();
});

// 저장 취소 및 복구
archiveList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-id]");

  if (!button || !archiveList.contains(button)) return;

  const item = outfitArchive.find((entry) => entry.id === button.dataset.id);

  if (!item) return;

  item.cancelled = !item.cancelled;

  if (!persistOutfitArchive()) {
    item.cancelled = !item.cancelled;
    return;
  }

  archiveStatus.textContent = item.cancelled
    ? "코디 저장을 취소했습니다."
    : "코디 저장을 복구했습니다.";

  renderOutfitArchive();
});

// 최초 렌더링
renderOutfitArchive();
