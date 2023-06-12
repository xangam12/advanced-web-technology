const button = document.querySelector("#btn");
const container = document.querySelector(".container");

const makeRequest = (url) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4 && request.status === 200) {
        resolve(request);
      }
      if (request.status === 404) {
        reject("Unable to Fetch User Information");
      }
    });
    request.send();
  });
};

button.addEventListener("click", () => {
  makeRequest("https://reqres.in/api/users/2")
    .then((response) => {
      // console.log("this is first then")
      return JSON.parse(response.responseText);

    })
    .then((data) => {
      document.getElementById("fnameInput").value = data.data.first_name;
      document.getElementById("lnameInput").value = data.data.last_name;
      document.getElementById("emailInput").value = data.data.email;

      const avatar = document.querySelector(".avatar");
      const img = document.createElement("img");
      img.src = data.data.avatar;
      avatar.appendChild(img);

    })
    .catch((error) => {
      container.innerHTML = `<h1>Oopse!${error}</h1>`;
    });
});
