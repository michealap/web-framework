import { User } from './models/User'

// const user = new User({ id: 1 });
// user.set({ name: 'George', age: 10 });

const user = new User({ name: 'Julia', age: 20 });

user.save();