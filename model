// Estructura para almacenar los temas y votos
class Topic {
  topic: string;
  option: string;
  yesVotes: number;
  noVotes: number;

  constructor(topic: string, option: string) {
    this.topic = topic;
    this.option = option;
    this.yesVotes = 0;
    this.noVotes = 0;
  }
}

// ...

@call({ payableFunction: true })
vote_topic({ topic, option }: { topic: string, option: string }) {
  // Recuperamos la cuenta que firma la transacción
  const sender = near.predecessorAccountId();

  // Buscamos el tema en el vector de temas
  for (let i = 0; i < this.topics.length; i++) {
    if (this.topics[i].topic == topic) {
      // Verificamos que el remitente no haya votado previamente por este tema
      if (this.topics[i].yesVotes.indexOf(sender) >= 0 || this.topics[i].noVotes.indexOf(sender) >= 0) {
        // El remitente ya ha votado por este tema
        return;
      }

      // Agregamos el voto al tema correspondiente
      if (option == "yes") {
        this.topics[i].yesVotes.push(sender);
        this.topics[i].yesVotes += 1;
      } else if (option == "no") {
        this.topics[i].noVotes.push(sender);
        this.topics[i].noVotes += 1;
      }
      return;
    }
  }
}
