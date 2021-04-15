document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  /**add js code here when deploying or running in a device**/
}

ons.ready(function () {
  if (isLoggedIn()) {
    myNavigator.pushPage("pages/login.html");
  } else {
    myNavigator.pushPage("pages/main.html");
  }
});

let login = (username, password) => {
  document.querySelector("#myNavigator").pushPage("pages/main.html");
};

let isLoggedIn = () => {
  return true;
};

let showModal = () => {
  let modal = document.querySelector("ons-modal");
  modal.show();
};

let closeModal = () => {
  let modal = document.querySelector("ons-modal");
  modal.hide();
};

/*document.addEventListener("init", function (event) {
  /*  let page = event.target;

  if (page.id === "main.html") {
    page.querySelector("#push-button").onclick = function () {
      document
        .querySelector("#myNavigator")
        .pushPage("pages/main.html", { data: { title: "Page 2" } });
    };
  } else if (page.id === "main.html") {
    page.querySelector("ons-toolbar .center").innerHTML = page.data.title;
  }
});*/
