const { use } = require("react");

const user = {
  name: "Nadeen",
  role: "FrontEnd Developer",
  company: "TAG",
};

function greetUser() {
  return `Hello ${user.name} - you are ${user.role} at ${user.company}.`;
}

console.log(greetUser(user));
