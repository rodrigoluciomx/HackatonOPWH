// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view, Vector} from 'near-sdk-js';
import {Topic} from './model';

@NearBindgen({})
class Votacion{
  id: number = 0;
  message: string = "Hello";
  topics: Vector<Topic> = new Vector<Topic>("t");

  @call({ payableFunction: true })
  add_topic({ topic }: { topic: string }) {
    // Recuperamos la cuenta que firma la transacción
    const creator = near.predecessorAccountId();

    // Creamos una constante con su valor
    const id = this.id+1;
    const noVotes = 0;
    const yesVotes = 0;
    const newTopic: Topic = {id, topic, creator, yesVotes, noVotes};

    // Agregamos el tema al vector
    this.topics.push(newTopic);
    this.id++;
  }

  @view({})
  get_topics({ from_index = 0, limit = 10 }: { from_index: number, limit: number }): Topic[] {
    // Recuperamos los temas en el segmento solicitado
    return this.topics.toArray().slice(from_index, from_index + limit);
  }

  @call({ payableFunction: true })
  vote_topic({ topic, option }: { topic: number, option: string }) {  
    // Buscamos el tema en el vector de temas
    for (let i = 0; i < this.topics.length; i++) {
      near.log(this.topics.toArray()[i]);
      if (this.topics.toArray()[i].id == topic) {
        const topicToUpdate = this.topics.toArray()[i];
        if (option == "yes") {
          topicToUpdate.yesVotes += 1;
        } else if (option == "no") {
          topicToUpdate.noVotes += 1;
        }
        this.topics.replace(i, topicToUpdate);
        return;
      }
    }
  }
  
