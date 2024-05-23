



//------------- Home Page ----------------
const HomePage = {
    template: "#home",
    name: 'HomePage',
    data: ()=> {
        return {
            test: [1,2,3],
            progress: 0,
            salleEquipeTemperature: 0,
            salleTemoinTemperature:0,
            salleEquipeLuminosite:0,
            salleTemoinLuminosite:0,
            salleEquipeFluxSolaire:0,
            salleTemoinFluxSolaire:0,
        }
    },
    methods: {
        startProgress() {
            setInterval(() => {
                if (this.progress < 100) {
                    this.progress++;
                }
            }, 100);
        },
        addTemperature(data) {

        }
        
    },
    mounted() {

        let self = this;
        self.startProgress();
        const sse = new EventSource('/events');
        sse.addEventListener("message", function(e){
            const json = JSON.parse(e.data);
            
            self.addTemperature(json);

        })
    }
}


//------------- Campagnes ----------------
const Campagnes = {
    template: "#campagnes",
    name: 'Campagnes'
}


// ----------- Test du tableau pour le formulaire ----------
var listCampagne = [
    {
        adresse: "adresse bidon de mathis",
        entreprise: "mathis"
    },
    {
        adresse: "test de la nouvelle adresse",
        entreprise: "Lycée victor hugo"
    }
];

const AjoutCampagne = {
    template: "#ajtCamp",
    name: 'AjoutCampagne',
    data: () => {
        return {
            listCampagne: window.listCampagne,
            errors: [],
            newCampagne: {
                adresse: "",
                entreprise: ""
            }
        }
    },
    methods: {
        addCampagne() {
            this.errors = [];
            if (!this.newCampagne.adresse) {
                this.errors.push('Adresse Manquante.');
            }
            if (!this.newCampagne.entreprise) {
                this.errors.push("Nom de l'entreprise manquant.");
            }

            if (this.errors.length) {
                return false;
            }
            this.listCampagne.push(newCampagne);
            this.errors =[];
            this.newCampagne ={};
        }
    }
}

const LaCampagne = {
    template: "#lacampagne",
    name:'LaCampagne'
}


//----------------- Capteurs -------------------
const Capteurs = {
    template: "#capteurs",
    name: "Capteurs",
    data: () => {  
        return{
            donnees: [{
                test:'',
                test1: ['test']
            }]
        }
    },
    mounted() {
        axios.get('/api/valeurs')
            .then(rep => {
                this.donnees = rep.data.data;
            })
            .catch(error => {
                console.error(error);
        });
    }
}


//------------------ Temperature et Tests de la relation des données --------------  


const Temperature = {
    name: "Temperature",
    data: () => {
      return {
        search: "",
        colonnes: ["Date","Salle Témoin", "Salle Équipée"],
        donnees: []
        } 
    },
    methods: {
        addDonnees(data) {
            console.log(data);
            this.donnees.push(data);
            console.log(this.donnees);
            if (this.donnees.length >= 10) {
                this.donnees.shift();
            }
        }
    },
    mounted() {
        let self = this;
        const sse = new EventSource('/events');
        sse.addEventListener("message", function(e){
            const json = JSON.parse(e.data);
            self.addDonnees(json);
        })
    }
}



//---------- Routage du site ------------


const router = new VueRouter({
    routes: [
        { path: '/', component: HomePage },
        { path: '/Temperature', component: Temperature },
        { path: '/Capteurs', component: Capteurs},
        { path: '/Campagnes', component: Campagnes},
        { path: '/Campagnes/AjoutCampagne', component: AjoutCampagne},
        { path: '/LaCampagne', component: LaCampagne}
    ]
})



const vue = new Vue({
    router
}).$mount('#app');