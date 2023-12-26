import {environment} from "../../environments/environment";

const {API} = environment;

const cars = `${API}/cars`;
const users = `${API}/users`;
const auth = `${API}/auth`;

const urls = {
  cars:{
    base:cars,
    byId:(id:number):string=>`${cars}/${id}`,
    addPhoto:(id:number):string=>`${cars}/${id}/photo`
  },
  auth:{
    register:users,
    login:auth,
    getUserData:`${auth}/me`,
    refresh:`${auth}/refresh`
  }
}

export {
  urls
}
