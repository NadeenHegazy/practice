const { use } = require("react");

const user = {
  name: "Nadeen",
  role: "FrontEnd Developer",
  company: "TAG",
};

function greetUser(user) {
  return `Hello ${user.name}, welcome to your dashboard!`;
}

console.log(greetUser(user));
