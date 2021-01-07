<template>
  <div id="app">
    <v-app>
      <v-banner
        v-model="this.$store.getters.getNoConnection"
        single-line
        transition="slide-y-transition"
        color="red"
        class="error-banner"
        dark
      >
        <v-avatar
          slot="icon"
          color="white"
          size="40"
        >
          <v-icon
            icon="mdi-wifi-off"
            color="red"
          >
            mdi-wifi-off
          </v-icon>
        </v-avatar>
          Brak połączenia z serwerem. Sprawdź swoje połączenie internetowe.
      </v-banner>
      <v-banner
        v-model="this.$store.getters.getReconnected"
        single-line
        transition="slide-y-transition"
        color="green"
        class="error-banner"
        dark
      >
        <v-avatar
          slot="icon"
          color="white"
          size="40"
        >
          <v-icon
            icon="mdi-wifi"
            color="green"
          >
            mdi-wifi
          </v-icon>
        </v-avatar>
          Odzyskano połączenie z serwerem.
      </v-banner>
      <router-view/>
    </v-app>
  </div>
</template>

<style>

  body{
    width: 100%;
    height: 100vh;
    margin: 0;
    /* background-color: aquamarine; */
  }

  #app {
    width: 100%;
    min-height: 100%;
  }

  .error-banner{
    color: white;
  }

</style>