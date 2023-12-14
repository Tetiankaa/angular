import {environment} from "../../environments/environment";

const {API} = environment;

const cars = `${API}/cars`;
const auth = `${API}/auth`;
const users = `${API}/users`

const urls = {
  auth:{
    login:auth,
    myData:`${auth}/me`,
    refresh:`${auth}/refresh`,
    register:users
  },
  cars:{
    base:cars,
    byId:(id:number):string=>`${cars}/${id}`
  },

}

export {
  urls
}
