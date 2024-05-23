<template>
  <nav>
    <ul class="flexbox">
      <router-link to="/">
        <li><img
            src="https://static.wixstatic.com/media/097ae0_85a141685b0e4436acb7aa14bba0a3c9~mv2.png/v1/crop/x_0,y_43,w_800,h_231/fill/w_242,h_70,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Logo_couleur_long_slogan.png"
            id="image-immoblade"></li>
      </router-link>

      <router-link to="/Campagnes_en_cours">
        <li>Campagnes en cours</li>
      </router-link>
      <router-link to="/Historique">
        <li>Historique</li>
      </router-link>
      <router-link to="/Alerte">
        <li>Alerte</li>
      </router-link>
      <router-link to="/Contact">
        <li>Contact</li>
      </router-link>
    </ul>
    <StoreDataFromSSE />
  </nav>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
  <!-- Ajout de la pop-up
   <div v-if="showPopup" class="popup" @click="closePopup">
    <p>{{ popupMessage }}</p>
  </div> -->
</template>

<script>
import StoreDataFromSSE from '@/components/StoreDataFromSSE.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    StoreDataFromSSE
  },
  computed: {
    ...mapGetters([
    // 'showPopup',
    // 'popupMessage'
    ])
  },
  mounted () {
    document.getElementById('app').classList.add('fade-in')
  }
}
</script>

<style>
/* Style général */
body {
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.5;
  background-image: url("/image/fondecran.jpg");
  background-size: 100% auto;
}

@keyframes scrollBackground {
  from {
    background-position: 0 -35%;
    /* Début en haut de l'écran */
  }

  to {
    background-position: 0 110%;
    /* Fin légèrement en dessous du bas de l'écran */
  }
}

#app {
  display: flex;
  margin: auto;
  flex-direction: column;
  height: max-content;
  opacity: 0;
}

.fade-in {
  animation: fadeIn 1.5s ease-in-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

nav {
  background: linear-gradient(to bottom, #ffffff, #888888);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.99);
  position: fixed;
  width: 100%;
  z-index: 1000;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav li {
  margin: 0 10px;
  font-size: 20px;
}

nav a {
  text-decoration: none;
  color: #000;
}

#image-immoblade {
  opacity: 1;
}

.flexbox {
  display: flex;
  align-items: center;
}

.logo {
  font-size: 32 px;
  font-weight: bold;
  color: #000;
}

/* Main content */
/* Le main est la partie principal du site */

article {
  flex-basis: 30%;
}

.container-block {
  display: flex;
  flex-wrap: wrap;
  box-decoration-break: slice;
  width: auto;
  justify-content: center;
}

.hautgauche {
  margin: 10px;
  padding: 5px;
  border: 1px solid #7a7777b1;
  background-color: azure;
  width: 30em;
}

.hautgauche:hover {
  box-shadow: 3px 3px 3px #9a9595;
  transform: scale(1.05);
  transition: 0.5s;
}

/* Progress Bar*/
.progress {
  flex: auto;
  width: 220px;
  height: 10px;
  border: 2px solid #000;
  background-color: #fff;
  border-radius: 15px;
}

.progress-bar {
  background-color: #fcba0d;
  border-radius: 15px;
  color: rgba(255, 255, 255, 0);
  height: 10px;
}

/* Footer */
/* Le footer est le pieds de page */
.pied-page {
  background-color: #f2f2f2;
  text-align: center;
  margin-top: 5%;
  position: absolute;
  bottom: 0;
  width: 100%;
}

/*--------- Page Température ---------*/
#tableau-temperature,
#tableau-luminosite {
  border: 2px solid #dddddd;
  border-radius: 3px;
  background-color: #fff;
  table-layout: auto;
  width: 30%;
  margin-bottom: 20px;
}

thead {
  background-color: #dddddd;
}

td {
  background-color: aliceblue;
  text-align: center;
}

.title {
  align-self: flex-start;
}

.temp-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#mise-a-jour {
  width: 20%;

}

/* other blocks */
.home {
  height: 100%;
}

/* CSS données */
.container-items {
  display: flex;
  width: auto;
  height: auto;
  border: 2px black;

}

.container-canvas {
  width: 100%;
  height: 100%;
}

nav {
  background: linear-gradient(to bottom, #ffffff, #888888);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.99);
  position: fixed;
  width: 100%;
  z-index: 1000;
}

.title {
  position: relative;
  padding: 20px;
  text-align: left;
  margin-top: 80px;
  color: black;
  text-shadow: -2px -2px 4px rgba(255, 255, 255, 0.5);
  background: linear-gradient(to bottom, rgba(182, 182, 182, 0), rgb(223, 223, 223));
  display: inline-block;
  z-index: 999;
  font-weight: normal;

}

#image-immoblade:hover {
  filter: brightness(1.2);
}

nav li:hover {
  color: #ffffff;

}
</style>
