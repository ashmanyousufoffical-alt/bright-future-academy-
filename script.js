const admissionForm = document.getElementById("admissionForm");
const eligibilityResult = document.getElementById("eligibilityResult");
const feeForm = document.getElementById("feeForm");
const feeResult = document.getElementById("feeResult");

function formatRupees(amount) {
  return "Rs. " + amount.toLocaleString("en-PK");
}

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, function (character) {
    const entities = {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};
    return entities[character];
  });
}

admissionForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("studentName").value.trim();
  const marksInput = document.getElementById("marks");
  const marks = Number(marksInput.value);
  const course = document.getElementById("admissionCourse").value;

  if (name.length < 2 || name.length > 60 || marksInput.value.trim() === "" ||
      !Number.isFinite(marks) || marks < 0 || marks > 100 || course === "") {
    alert("Please enter valid student details.");
    return;
  }

  let status, message, resultClass;
  if (marks >= 70) {
    status = "Direct Admission";
    message = "You meet the marks criteria for direct admission.";
    resultClass = "direct";
  } else if (marks >= 50) {
    status = "Eligible — Counselling Recommended";
    message = "You are eligible. Please consult an admission counsellor.";
    resultClass = "counselling";
  } else {
    status = "Contact Admission Counsellor";
    message = "Please contact our admission counsellor for guidance.";
    resultClass = "contact";
  }

  eligibilityResult.className = "result " + resultClass;
  eligibilityResult.innerHTML = `<h3>Hello, ${escapeHTML(name)}!</h3>
    <p><strong>Course:</strong> ${escapeHTML(course)}</p>
    <p><strong>Your Marks:</strong> ${marks}%</p>
    <p><strong>Result:</strong> ${status}</p><p>${message}</p>
    <p><small>This is a preliminary check, not a confirmed admission.</small></p>`;
  eligibilityResult.hidden = false;
});

feeForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const monthlyFee = Number(document.getElementById("feeCourse").value);
  const months = Number(document.getElementById("months").value);

  if (!Number.isFinite(monthlyFee) || monthlyFee <= 0 ||
      !Number.isInteger(months) || months < 1 || months > 12) {
    alert("Please select a valid course and duration.");
    return;
  }

  const original = monthlyFee * months;
  let discountRate = 0;
  if (months >= 6) discountRate = 0.10;
  else if (months >= 3) discountRate = 0.05;

  const discountAmount = original * discountRate;
  const finalAmount = original - discountAmount;

  document.getElementById("originalFee").textContent = formatRupees(original);
  document.getElementById("discount").textContent = formatRupees(discountAmount);
  document.getElementById("finalFee").textContent = formatRupees(finalAmount);
  document.getElementById("discountMessage").textContent =
    discountRate === 0 ? "No discount for this duration." :
    `You received a ${discountRate * 100}% discount!`;
  feeResult.hidden = false;
});

const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", function () {
  const isDark = document.body.classList.toggle("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
});

document.getElementById("year").textContent = new Date().getFullYear();
