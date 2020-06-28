import React, { useState } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonHeader,
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonItemDivider,
  IonInput,
  IonList,
  IonButton,
  IonRouterOutlet,
  IonApp,
  IonImg,
  IonNav,
  IonText,
  IonAlert,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";
import Register from "./Register";
import logo from "../assets/logo.png";
import "./ExploreContainer.css";
import axios from "axios";
import { register } from "../serviceWorker";
import { connect } from "http2";
import { createHashHistory } from "history";
import { withRouter } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState<String>();
  const [username, setUsername] = useState<String>();
  const [usernameReg, setUsernameReg] = useState<String>();
  const [pwd, setPwd] = useState<String>();
  const [pwdReg, setPwdReg] = useState<String>();
  const [change, setChange] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("Inscription avec succès");
  //const history = createHashHistory();

  function cnx() {
    setChange(false);
  }
  function inscr() {
    setChange(true);
  }

  async function hasProfile(id: BigInteger, token: String) {
    let config = {
      headers: {
        //Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        //"Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
        /*"Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type, Accept",*/
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await axios
      .get(`http://127.0.0.1:888/api/service/user/hasProfile/${id}`, config)
      .then((res) => {
        if (res.data) {
          localStorage.setItem("fitnessExist", "true");
          window.location.replace("/page/Accueil");
        } else {
          localStorage.setItem("fitnessExist", "false");
          window.location.replace("/page/Profile");
        }
      });
  }

  async function connectRequest() {
    await axios
      .post(
        "http://127.0.0.1:888/api/auth/signin",
        {
          username: username,
          password: pwd,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        if (res.data.id) {
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("roles", JSON.stringify(res.data.roles));
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("connected", "true");
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("email", res.data.email);
          hasProfile(res.data.id, res.data.accessToken);
        }
      })
      .catch((err) => {
        // console.log(err.response.data.message);
        setMessage(err.response.data.message);
        setAlert(true);
      });
  }

  async function registerRequest() {
    await axios
      .post(
        "http://127.0.0.1:888/api/auth/signup",
        {
          username: usernameReg,
          password: pwdReg,
          email: email,
          role: ["ROLE_USER"],
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
            "Content-type": "application/json",
          },
        }
      )
      .then((res) => {
        //console.log("registered successfully");
        //setChange(false);
        setMessage("Inscription avec succès");
        setAlert(true);
        //window.location.reload();
      })
      .catch((err) => {
        //console.log(err.response.data.errors[0].defaultMessage);
        setMessage(err.response.data.errors[0].defaultMessage);
        setAlert(true);
      });
  }

  function connect() {
    connectRequest();
  }

  function register() {
    registerRequest();
  }

  if (change) {
    return (
      <IonContent class="content">
        <IonAlert
          isOpen={alert}
          onDidDismiss={() => setAlert(false)}
          header={"Alert"}
          //ubHeader={"Inscription avec succès"}
          message={message}
          buttons={["OK"]}
        />
        <IonGrid class="form">
          <IonRow class="ion-justify-content-center ion-align-items-center form">
            <IonCol
              sizeXs="10"
              sizeSm="10"
              sizeMd="6"
              sizeLg="6"
              class="login-col"
            >
              <IonCard>
                <IonCardHeader>
                  <IonText class="textHeader ">
                    <strong>
                      L'appli bien-être qui vous aide à manger sainement pour
                      atteindre vos objectifs santé et perte de poids.
                    </strong>
                  </IonText>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      <IonInput
                        placeholder="Username"
                        onIonChange={(e) => setUsernameReg(e.detail.value!)}
                      ></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonInput
                        type="email"
                        placeholder="E-mail"
                        onIonChange={(e) => setEmail(e.detail.value!)}
                      ></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonInput
                        type="password"
                        placeholder="Mot de passe"
                        onIonChange={(e) => setPwdReg(e.detail.value!)}
                      ></IonInput>
                    </IonItem>
                    <IonRow class="ion-justify-content-center">
                      <IonButton
                        class="btn"
                        color="tertiary"
                        onClick={() => register()}
                      >
                        Inscrivez-vous
                      </IonButton>
                    </IonRow>
                    <IonRow>
                      <IonCol>
                        <IonButton
                          class="btn"
                          color="primary"
                          expand="block"
                          fill="clear"
                          onClick={() => cnx()}
                        >
                          Connexion
                        </IonButton>
                      </IonCol>
                      <IonCol>
                        <IonButton
                          class="btn"
                          color="success"
                          expand="block"
                          fill="clear"
                          onClick={() => inscr()}
                        >
                          Inscription
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    );
  } else {
    return (
      <IonContent class="content">
        <IonAlert
          isOpen={alert}
          onDidDismiss={() => setAlert(false)}
          header={"Alert"}
          //ubHeader={"Inscription avec succès"}
          message={message}
          buttons={["OK"]}
        />
        <IonGrid class="form">
          <IonRow class="ion-justify-content-center ion-align-items-center form">
            <IonCol
              sizeXs="10"
              sizeSm="10"
              sizeMd="6"
              sizeLg="6"
              class="login-col"
            >
              <IonCard>
                <IonCardHeader>
                  <IonText class="textHeader ">
                    <strong>
                      Connectez-vous pour un mode de vie sain. En toute
                      simplicité.
                    </strong>
                  </IonText>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      <IonInput
                        placeholder="Username"
                        onIonChange={(e) => setUsername(e.detail.value!)}
                      ></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonInput
                        type="password"
                        placeholder="Mot de passe"
                        onIonChange={(e) => setPwd(e.detail.value!)}
                      ></IonInput>
                    </IonItem>
                    <IonRow class="ion-justify-content-center">
                      <IonButton
                        class="btn"
                        color="tertiary"
                        onClick={() => connect()}
                      >
                        Connectez-vous
                      </IonButton>
                    </IonRow>
                    <IonRow>
                      <IonCol>
                        <IonButton
                          class="btn"
                          color="success"
                          expand="block"
                          fill="clear"
                          onClick={() => cnx()}
                        >
                          Connexion
                        </IonButton>
                      </IonCol>
                      <IonCol>
                        <IonButton
                          class="btn"
                          color="primary"
                          expand="block"
                          fill="clear"
                          onClick={() => inscr()}
                        >
                          Inscription
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    );
  }
};

export default Login;
