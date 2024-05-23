import {reactive} from './vue.js'

export const store = reactive({
    mesures: [],
    sse() {
        const sse = new EventSource('/events');
        sse.addEventListener("message", function (e) {
            const json = JSON.parse(e.data);
            mesures.push(json);
        })
    }
})

