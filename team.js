// team.js - Dynamically loads team data from team.json

document.addEventListener("DOMContentLoaded", function () {
  fetch("team.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Failed to load team data.");
      }
      return response.json();
    })
    .then(function (data) {
      renderLeadership(data.leadership);
      renderDepartments(data.departments);
    })
    .catch(function (error) {
      console.error("Error loading team data:", error);
      document.getElementById("leadership-grid").innerHTML =
        "<p style='color:red;'>Could not load team data. Please try again.</p>";
    });
});

// Renders the leadership team cards
function renderLeadership(leaders) {
  var container = document.getElementById("leadership-grid");
  container.innerHTML = "";

  leaders.forEach(function (member, index) {
    var expertiseTags = member.expertise
      .map(function (tag) {
        return '<span class="expertise-tag">' + tag + "</span>";
      })
      .join("");

    var initials = member.name
      .split(" ")
      .map(function (n) {
        return n[0];
      })
      .slice(0, 2)
      .join("");

    var card = document.createElement("div");
    card.className = "team-card";
    card.style.animationDelay = index * 0.1 + "s";

    card.innerHTML =
      '<div class="card-avatar">' +
        '<div class="avatar-circle">' + initials + "</div>" +
      "</div>" +
      '<div class="card-body">' +
        '<h3 class="member-name">' + member.name + "</h3>" +
        '<p class="member-role">' + member.role + "</p>" +
        '<p class="member-bio">' + member.bio + "</p>" +
        '<div class="expertise-tags">' + expertiseTags + "</div>" +
      "</div>";

    container.appendChild(card);
  });
}

// Renders the department/specialist team cards
function renderDepartments(departments) {
  var container = document.getElementById("departments-grid");
  container.innerHTML = "";

  departments.forEach(function (dept, index) {
    var card = document.createElement("div");
    card.className = "dept-card";
    card.style.animationDelay = index * 0.1 + "s";

    card.innerHTML =
      '<div class="dept-icon">' + dept.icon + "</div>" +
      '<h3 class="dept-name">' + dept.name + "</h3>" +
      '<p class="dept-desc">' + dept.description + "</p>";

    container.appendChild(card);
  });
}
