document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  /**add js code here when deploying or running in a device**/

  var user;
  var isDoctor_0_;
  ons.ready(function () {
    // Your web app's Firebase configuration

    const firebaseConfig = {
      apiKey: "AIzaSyCoI6y0GPNj9YVtCZ4kc74YrSqqa92IS_s",
      authDomain: "appoint-a8597.firebaseapp.com",
      projectId: "appoint-a8597",
      databaseURL:
        "https://appoint-a8597-default-rtdb.europe-west1.firebasedatabase.app",
      storageBucket: "appoint-a8597.appspot.com",
      messagingSenderId: "738783008369",
      appId: "1:738783008369:web:ab370c6682b8dea2a76dd0",
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();
    /**add js code here when deploying or running in a device**/
    /*if (isLoggedIn()) {
    myNavigator.pushPage("pages/main.html");
  } else {
    myNavigator.pushPage("pages/login.html");
  }*/
    firebase.auth().onAuthStateChanged((u) => {
      user = u;
      if (u === null) {
        myNavigator.pushPage("pages/login.html");
      } else {
        myNavigator.pushPage("pages/main.html");
        firebase
          .database()
          .ref(`${user.uid}/isDoctor`)
          .on("value", (snapshot) => {
            const data = snapshot.val();
            isDoctor_0_ = data;
            if (isDoctor_0_) {
              document.getElementById("fab").hide();
              firebase
                .database()
                .ref()
                .on("value", (snapshot) => {
                  const data = snapshot.val();
                  document.getElementById("lister").innerHTML = ``;
                  document.getElementById(
                    "lister"
                  ).innerHTML += `<ons-list-header style="
      padding-top: 20px;
      color:#0076ff;
    "><strong><b>Upcoming appointments</b></strong></ons-list-header>`;
                  for (const [key, value] of Object.entries(data)) {
                    if (value.isDoctor != true) {
                      for (const [key, v] of Object.entries(
                        value.appointments
                      )) {
                        let appointment = v;
                        let apDispaly = `  <ons-list-item class="space" expandable>
    <p class="for-doctor">Appointment with ${appointment.patient}</p>
    <div class="expandable-content">
            <ons-list>
        <ons-list-item><span>Location:  ${appointment.location}</span></ons-list-item>
        <ons-list-item><span>Date: ${appointment.date}</span></ons-list-item>
    </ons-list>
    </div>
  </ons-list-item>`;
                        document.getElementById(
                          "lister"
                        ).innerHTML += apDispaly;
                      }
                    }
                  }
                });
            } else {
              firebase
                .database()
                .ref(`${user.uid}/appointments`)
                .on("value", (snapshot) => {
                  const data = snapshot.val();
                  document.getElementById("lister").innerHTML = ``;
                  document.getElementById(
                    "lister"
                  ).innerHTML += `<ons-list-header style="
      padding-top: 20px;
      color:#0076ff;
    "><strong><b>Upcoming appointments</b></strong></ons-list-header>`;
                  for (const [key, value] of Object.entries(data)) {
                    let appointment = value;
                    let apDispaly = `  <ons-list-item class="space" expandable>
    <p class="for-doctor">Appointment with ${appointment.doctor}</p>
    <div class="expandable-content">
            <ons-list>
        <ons-list-item><span>Location:  ${appointment.location}</span></ons-list-item>
        <ons-list-item><span>Date: ${appointment.date}</span></ons-list-item>
        <ons-list-item><ons-button  onclick="deleteAP('${appointment.date}')"class="delete-ap-main">Archive</ons-button></ons-list-item>
    </ons-list>
    </div>
  </ons-list-item>`;
                    document.getElementById("lister").innerHTML += apDispaly;
                  }
                });
            }
          });
      }
    });

    ///event handler.........
    document.addEventListener("init", function (event) {
      let page = event.target;

      if (page.id === "main.html") {
        page.querySelector("ons-popover").onclick = function () {
          hidePopover();
        };
      } else if (page.id === "past.html") {
        if (isDoctor_0_) {
          firebase
            .database()
            .ref()
            .on("value", (snapshot) => {
              const data = snapshot.val();
              for (const [key, value] of Object.entries(data)) {
                if (value.isDoctor != true) {
                  for (const [key, v] of Object.entries(value.archive)) {
                    let appointment = v;
                    let apDispaly = `  <ons-list-item class="space" expandable>
    <p class="for-doctor">Appointment with ${appointment.patient}</p>
    <div class="expandable-content">
            <ons-list>
        <ons-list-item><span>Location:  ${appointment.location}</span></ons-list-item>
        <ons-list-item><span>Date: ${appointment.date}</span></ons-list-item>
    </ons-list>
    </div>
  </ons-list-item>`;
                    document.getElementById("lister_").innerHTML += apDispaly;
                  }
                }
              }
            });
        } else {
          firebase
            .database()
            .ref(`${user.uid}/archive`)
            .on("value", (snapshot) => {
              const data = snapshot.val();
              document.getElementById("lister_").innerHTML = ``;
              for (const [key, value] of Object.entries(data)) {
                let appointment = value;
                let apDispaly = `  <ons-list-item class="space" expandable>
    <p class="for-doctor">Appointment with ${appointment.doctor}</p>
    <div class="expandable-content">
            <ons-list>
        <ons-list-item><span>Location:  ${appointment.location}</span></ons-list-item>
        <ons-list-item><span>Date: ${appointment.date}</span></ons-list-item>
    </ons-list>
    </div>
  </ons-list-item>`;
                document.getElementById("lister_").innerHTML += apDispaly;
              }
            });
        }
      }
    });
  });
}

///////////////////functions///////////////
let login = () => {
  let email = document.getElementById("email__").value;
  let pass = document.getElementById("password__").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, pass)
    .then((userCredential) => {
      // Signed in
      user = userCredential.user;
      // ...
    })
    .catch((error) => {
      ons.notification.toast(error.message, {
        timeout: 2000,
        animation: "fall",
      });
    });
};
let signUp = () => {
  let name =
    document.getElementById("firstname").value +
    " " +
    document.getElementById("lastname").value;
  let email = document.getElementById("email_").value;
  let birthdate = document.getElementById("birthdate").value;
  let gender = document.getElementById("choose-gender").value;
  let pass = document.getElementById("password_").value;
  let doctor = document.getElementById("isDoctor_");
  if (
    (name != "") &
    (email != "") &
    (birthdate != "") &
    (gender != "") &
    (pass != "")
  ) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then((userCredential) => {
        // Signed in
        user = userCredential.user;
        var us = firebase.auth().currentUser;

        us.updateProfile({
          displayName: name,
        })
          .then(function () {
            firebase.database().ref(`${user.uid}`).set({
              isDoctor: doctor.checked,
            });
            ons.notification.toast("Registration successful", {
              timeout: 2000,
              animation: "fall",
            });
          })
          .catch(function (error) {
            ons.notification.toast(error.message, {
              timeout: 2000,
              animation: "fall",
            });
          });
      })
      .catch((error) => {
        ons.notification.toast(error.message, {
          timeout: 2000,
          animation: "fall",
        });
        // ..
      });
  } else {
    ons.notification.toast("All feilds need to be filled", {
      timeout: 2000,
      animation: "fall",
    });
  }
};

let logOut = () => {
  firebase.auth().signOut();
};

let showModal = () => {
  let modal = document.querySelector("ons-modal");
  modal.show();
};

let closeModal = () => {
  let modal = document.querySelector("ons-modal");
  modal.hide();
};

let showPopover = (target) => {
  document.getElementById("popover").show(target);
};

let hidePopover = () => {
  document.getElementById("popover").hide();
};

let schedule = () => {
  let date = document.getElementById("appoint").value;
  if (date != "") {
    ///fake add appointment
    let locations = ["Online", "Home", "Clinic", "Online", "Home", "Clinic"];
    let doctors = [
      "Dr Gure",
      "Dr Mike",
      "Dr Risky",
      "Dr Chops",
      "Dr Gure",
      "Dr Mike",
      "Dr Risky",
      "Dr Chops",
    ];

    firebase
      .database()
      .ref(`${user.uid}/appointments/${date}`)
      .set({
        location: locations[Math.floor(Math.random() * locations.length)],
        date: date,
        doctor: doctors[Math.floor(Math.random() * doctors.length)],
        patient: user.displayName,
      })
      .then(() => {
        closeModal();
        ons.notification.toast("Appointment set", {
          timeout: 2000,
          animation: "fall",
        });
      });
  } else {
    ons.notification.toast("Preffered date cant be empty", {
      timeout: 2000,
      animation: "fall",
    });
  }
};

let deleteAP = (date) => {
  firebase
    .database()
    .ref(`${user.uid}/appointments/${date}`)
    .on("value", (snapshot) => {
      const data = snapshot.val();
      firebase
        .database()
        .ref(`${user.uid}/archive/${date}`)
        .set({
          location: data.location,
          date: data.date,
          doctor: data.doctor,
          patient: data.patient,
        })
        .then(() => {
          firebase.database().ref(`${user.uid}/appointments/${date}`).remove();
        });
    });
};
