
const HomePage = {
    template: "#home",
    name: 'HomePage'
}

const Temperature = {

    template: "#temperature",
    name: "Temperature",
    data: () => {
      return {
        date: 0,
        temp:0
      }
    },
    mounted() {
        axios
            .get('http://localhost:8080/temperature')
            .then(response => {
                this.date = response.data.date;
                this.temp = response.data.temperature;
            })
            .catch(error => {
                console.error(error);
        });
    }
}
const router = new VueRouter({
    routes: [
        { path: '/', component: HomePage },
        { path: '/Temperature', component: Temperature }
    ]
})

const vue = new Vue({
    el: "#app",
    router
})

