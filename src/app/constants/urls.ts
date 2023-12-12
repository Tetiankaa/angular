const baseURL = 'https://jsonplaceholder.typicode.com';

const users =`${baseURL}/users`;

const urls = {
  users:{
    base:users,
    byId:(id:number):string=>`${users}/${id}`
  },
  posts:{
    base:`${baseURL}/posts`,
    byPostId:(id:number):string=>`${baseURL}/posts/${id}`
  }
}

export {
  urls
}
