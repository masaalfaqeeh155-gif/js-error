const params = new URLSearchParams(location.search);
const index = params.get("ID");

const sites = JSON.parse(localStorage.getItem("sites"));

console.log(sites[index]);

document.querySelector(".siteName").textContent = sites[index].name;
document.querySelector(".siteUrl").textContent = sites[index].url;
document.querySelector(".email").textContent = sites[index].email;
document.querySelector(".password").textContent = sites[index].password;
