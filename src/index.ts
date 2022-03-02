import { User } from './models/User';

const user = new User({name: 'Alex', age: 20});

user.set({ age: 35 })
console.log(user.get('name'));
console.log(user.get('age'));