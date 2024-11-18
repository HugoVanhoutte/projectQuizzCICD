<template>
  <Header/>
  <router-view/>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "vuex";
import Header from "./components/_partials/Header.vue";
const store = useStore()
const localToken = localStorage.getItem("token")


//Automatically stores token from local storage to store on component 'loading'
onMounted(() => {
  if (localToken) {
    store.commit('setToken', localToken)
    store.commit('setUser', JSON.parse(atob(localToken.split(".")[1])))
  }
})


</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Graduate&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
@import '../src/assets/_variables.scss';

/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
/* ////////////FIN RESET CSS */


body {
  background-color: $bg-color;
}
/////////////////////////////////////////////BUTTONS
button {
  font-family: $text-font;
  font-weight: bold;
  font-size: 16px;
  border: none;
  border-radius: 9999px;
  padding: 10px 30px;
  transition: 0.3s;
}
button.primary {
  background-color: $primary-color;
  color: $bg-color;
  box-shadow:0 3px 2px 1px $secondary-color;
}

button.secondary {
  background-color: $secondary-color;
  color: black;
  box-shadow:0 3px 2px 1px $primary-color;
}
button.edition {
  background-color: orange;
  color: black;
  box-shadow: 0 3px 2px 1px darkgoldenrod;
}

button.deletion {
  background-color: crimson;
  color: white;
  box-shadow: 0 3px 2px 1px darkred;
}

button.creation {
  background-color: lightgreen;
  color: black;
  box-shadow: 0 3px 2px 1px green;
}

button:disabled {
  background-color: lightgray;
  color: black;
  box-shadow: 0 3px 2px 1px gray;
}

button:disabled:hover {
  cursor: not-allowed;
  transform: unset;
  box-shadow: 0 3px 2px 1px gray;
}

button:hover {
  cursor: pointer;
  transform: translateY(4px);
  box-shadow: 0 0 0 0 transparent;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////NAV
header {
  display: flex;
  flex-direction: row;
  height: 5rem;
  width: 100%;
  background-color: $secondary-color;
  justify-content: space-between;
  h1 {
    font-family: $title-font;
    font-size: 26px;
    align-self: center;
    /* TODO: propre */
    position: relative;
    left: 1rem;
  }
  nav {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 50%;
    justify-content: space-between;
    font-family: $text-font;
    font-size: 22px;
    align-items: center;
    /* TODO: propre */
    position: relative;
    right: 2rem;
    a { /*router-link*/
      color: $primary-color;
      text-decoration: underline 0.15rem rgba(0,0,0,0);
      transition: .5s text-decoration-color;
    }
    a:hover {
      text-decoration-color: $primary-color;
    }
  }

  .clickable:hover {
    cursor: pointer;
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////TABLE
table {
  width: 100%;
  font-family: $text-font;
  font-size: 16px;
  thead {
    background-color: $primary-color;
    color: white;
    tr {
      font-size: 20px;
      th {
        vertical-align: middle;
      }
    }
    tr:hover {
      background-color: inherit;
    }
  }
  tr {
    height: 30px;
    transition: 0.3s;
  }
  tr:nth-child(even) {
    background-color: lightgray
  }
  tr:hover {
    background-color: $secondary-color;
  }
  td {
    text-align: center;
    vertical-align: middle;
    border: 1px dashed $primary-color;
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////FORMS

label {
  font-family: $text-font;
  font-size: 24px;
}
input {
  font-family: $text-font;
  font-weight: bold;
  font-size: 16px;
  border: solid 2px $primary-color;
  border-radius: 9999px;
  padding: 10px 30px;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////CARDS
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid $secondary-color;
  border-radius: 25px;
  box-shadow: 0 3px 2px 1px lightgray;
  margin: 25px;
  font-family: $text-font;
  font-size: 16px;
  background-color: $bg-color;
  .card-header {
    width: 100%;
    text-align: center;
    border-radius: 25px 25px 0 0;
    background-color: $secondary-color;
    margin-bottom: 15px;
    padding: 10px 0;
    label, p, h1, h2, h3, h4, h5, h6 {
      font-family: $title-font;
      font-size: 22px;
    }
  }
  button, input {
    width: 80%;
    margin: 10px 0;
  }
  section {
    width: 100%;
    header {
      color: white;
      background-color: $primary-color;
      width: 100%;
      text-align: center;
      justify-content: center;
    }
    main {
      width: 100%;
      text-align: center;
      margin: 1rem;
    }
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////**MODALS**
.modal-box {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////PROGRESS
progress {
  width: 80%;
  appearance: none;
}

progress::-webkit-progress-bar {
  background-color: $bg-color;
  border-radius: 9999px;
  border: 1px solid black;
}

progress::-webkit-progress-value {
  background-color: $primary-color;
  border-radius: 9999px;
}
</style>
