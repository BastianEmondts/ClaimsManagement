const steps = [
  "Define claim intake workflow",
  "Add claims list and details views",
  "Integrate authentication and authorization",
];

const nextStepsList = document.getElementById("next-steps");

steps.forEach((step) => {
  const listItem = document.createElement("li");
  listItem.textContent = step;
  nextStepsList.appendChild(listItem);
});
