window.addEventListener("DOMContentLoaded", () => {
  // all DOM elements loaded.
  const inputField = document.getElementById("input-field");
  const contentEl = document.getElementById("content");

  if (inputField) {
    inputField.addEventListener("input", () => {
      function reqListener() {
        console.log(this);
        console.log(this.responseText);
        console.log(this.responseStatus);
      }

      console.log("hey");

      var oReq = new XMLHttpRequest();
      oReq.addEventListener("load", reqListener);
      oReq.open("GET", "http://www.google.com", true);
      oReq.send();

      // on field change.
      const value = inputField.value;

      console.log(value);

      if (contentEl) {
        contentEl.innerHTML = contentEl.innerText.replace(
          new RegExp(value, "g"),
          '<div style="background-color: red; display: inline;">' +
            value +
            "</div>"
        );
      }

      //       if (contentEl) {
      //         const contentValue = contentEl.innerText;
      //         const contentArr = contentValue.split(" ");
      //         const modifiedContentArr = contentArr.map((word) => {
      //           if (word === value) {
      //             return (
      //               '<div style="background-color: red; display: inline;">' +
      //               word +
      //               "</div>"
      //             );
      //           }

      //           return word;
      //         });

      //         contentEl.innerHTML = modifiedContentArr.join(" ");
      //       }
    });
  }
});
