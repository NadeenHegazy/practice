const { use } = require("react");

const user = {
  name: "Nadeen",
  role: "FrontEnd Developer",
};

function greetUser() {
  return `Hello ${user.name} - you are ${user.role}`;
}

console.log(greetUser(user));
