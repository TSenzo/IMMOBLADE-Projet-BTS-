class Dispatcher {
    constructor (data, clientId, newClient,newFact) {
        this.clients= [];
        this.facts = [];
        this.data=data;
        this.clientId=clientId;
        this.newClient=newClient;
        this.newFact=newFact;      
    }

    ajouterClient(newClient) {
        this.clients.push(newClient);
    }

    getClients() {
        return this.clients;
    }

    getFacts() {
      return this.facts;
    }

    eventsHandler(request, response) {
        const headers = {
          'Content-Type': 'text/event-stream',
          'Connection': 'keep-alive',
          'Cache-Control': 'no-cache'
        };
        response.writeHead(200, headers);

        this.clientId = Date.now();
      
        this.newClient = {
          id: this.clientId,
          response
        };
      
        this.clients.push(this.newClient);
        
        request.on('close', () => {
          console.log(`${this.clientId} Connection closed`);
          this.clients = this.clients.filter(client => client.id !== this.clientId);
        });
      }

    sendEventsToAll(newFact) {
        this.clients.forEach(client => client.response.write(`data: ${JSON.stringify(newFact)}\n\n`));
    }

    addFact(mesure) {
        this.newFact = mesure;
        return this.sendEventsToAll(this.newFact);
    }
}

module.exports.Dispatcher = Dispatcher;