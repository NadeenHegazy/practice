const user = {
  name: "Nadeen",
  role: "Senior Frontend Developer",
  company: "TAG",
};

function greetUser(user) {
  return `Hello ${user.name}, welcome to your dashboard!`;
}
console.log(greetUser(user));
