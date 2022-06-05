window.addEventListener("DOMContentLoaded", () => {
  // all DOM elements loaded.
  const inputField = document.getElementById("input-field");

  if (inputField) {
    inputField.addEventListener("input", () => {
      function reqListener() {
        console.log(this);
        console.log(this.responseText);
        console.log(this.responseStatus);
      }

      var oReq = new XMLHttpRequest();
      oReq.addEventListener("load", reqListener);
      oReq.open("GET", "http://www.google.com", true);
      oReq.send();
    });
  }
});
