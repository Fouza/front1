import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonProgressBar,
  IonCardTitle,
  IonText,
  IonSearchbar,
  IonDatetime,
  IonItem,
  IonLabel,
  IonAlert,
} from "@ionic/react";
import "./ExploreContainer.css";
import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import "./statistic.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Axios from "axios";

interface StatisticProps {
  name: string;
}

mobiscroll.settings = {
  theme: "ios",
  themeVariant: "dark",
};

const Statistic: React.FC<StatisticProps> = ({ name }) => {
  const [val, setVal] = useState<Date>(new Date());
  const [nbExo, setNbExo] = useState(0);
  const [time, setTime] = useState(0);
  const [calBrul, setCalBrul] = useState(0);
  const [calCons, setCalCons] = useState(0);

  async function getNbExo() {
    let config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await Axios.get(
      `http://localhost:888/api/service/user/${localStorage.getItem(
        "id"
      )}/getNbreOfExercisePerformedToday`,
      config
    ).then((res) => {
      setNbExo(res.data);
    });
  }

  async function getTimeDone() {
    let config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await Axios.get(
      `http://localhost:888/api/service/user/${localStorage.getItem(
        "id"
      )}/getTimeDoneExercisePerformedForCurrentUser`,
      config
    ).then((res) => {
      setTime(res.data);
    });
  }

  async function getCalCons() {
    let config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await Axios.get(
      `http://localhost:888/api/service/user/${localStorage.getItem(
        "id"
      )}/getCaloriesConsumedOfFoodEatenToday`,
      config
    ).then((res) => {
      setCalCons(res.data);
    });
  }

  async function getCalBrul() {
    let config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await Axios.get(
      `http://localhost:888/api/service/user/${localStorage.getItem(
        "id"
      )}/countCaloriesBurnedForCurrentUserToday`,
      config
    ).then((res) => {
      setCalBrul(res.data);
    });
  }

  useEffect(() => {
    if (localStorage.getItem("fitnessExist") == "true") {
      getNbExo();
      getTimeDone();
      getCalCons();
      getCalBrul();
    }
  }, []);
  // console.log(val.toLocaleDateString());
  const percentage = 66;
  if (localStorage.getItem("fitnessExist") == "true") {
    return (
      <IonContent>
        <IonGrid>
          <IonRow class="circle-row ion-justify-content-center ion-align-items-center">
            <IonCol sizeLg="4" sizeXs="10">
              <IonItem>
                <IonText>Calories Consommées : {calCons}</IonText>
              </IonItem>
              <br />
              <br />
              <IonItem>
                <IonText>Calories Brulées: {calBrul}</IonText>
              </IonItem>
            </IonCol>
            <IonCol sizeLg="4" sizeXs="6">
              <IonCard>
                <IonCardHeader>Avancement vers l'objectif</IonCardHeader>
                <IonCardContent>
                  <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                  />
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol sizeLg="4" sizeXs="6">
              <IonItem>
                <IonText>Nb. d'exercises : {nbExo}</IonText>
              </IonItem>
              <br />
              <br />
              <IonItem>
                <IonText>Temps exercés : {time}</IonText>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Date début</IonLabel>
                <IonDatetime displayFormat="YYYY-MM-DD"></IonDatetime>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel>Date fin</IonLabel>
                <IonDatetime displayFormat="YYYY-MM-DD"></IonDatetime>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonText class="cardTitle">Objectif à 34%</IonText> <br />
                  Vous êtes un peu loin ! Allez courage !
                </IonCardHeader>
                <br />
                <IonCardContent>
                  <IonProgressBar color="danger" value={0.3}></IonProgressBar>
                  <br />
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonText class="cardTitle">Calories brûlés à 56%</IonText>{" "}
                  <br />
                  Vous êtes à moitié de route ! Faites plus d'exercices
                  régulièrement
                </IonCardHeader>
                <br />
                <IonCardContent>
                  <IonProgressBar value={0.5}></IonProgressBar>
                  <br />
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    );
  } else {
  }
  return (
    <IonAlert
      isOpen={true}
      header={"Information !"}
      mode="ios"
      cssClass="alert-fitness"
      message={
        'Ajouter plus d\'information sur vous dans la page "Profil" pour pouvoir bien profiter de notre produit'
      }
    ></IonAlert>
  );
};

export default Statistic;
