import axios, { AxiosResponse } from "axios";

interface UserProps {
  id?: number; //user usually has a backend representation
  name?: string;
  age?: number;
}

// type alias for a function with no arguments and no return value
type Callback = () => void;

export class User {
  events: { [key: string]: Callback[] } = {};

  constructor(private data: UserProps){}

  get(propName: string): number | string {
    return this.data[propName];
  }

  set(update: UserProps): void {
    Object.assign(this.data, update);
  }

  on(eventName: string, callback: Callback):void {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
    //Callback [] or undefined when first creating a user
  }

  trigger(eventName:string): void {
    const handlers = this.events[eventName];

    if(!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach(callback => {
      callback();
    });
  }

  fetch(): void {
    axios.get(`http://localhost:3000/users/${this.get('id')}`)
    .then((response: AxiosResponse):void => {
      this.set(response.data);
    })
  }

  save(): void {
    // check if user has id then use put request, otherwise use post
    const id = this.get('id');
    if(id) {
      axios.put(`http://localhost:3000/users/${id}`, this.data);
    }else {
      axios.post(`http://localhost:3000/users`, this.data);
    }
  }
}