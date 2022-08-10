// syncronous & asynocronous practices
/* 
//callbacks
// promises
// async-await
*/

// console.log("before");
// getUser(1, (user) => {
//   console.table(user);
//   // repositories callback
//   getRepositories("name", (repo) => {
//     console.log(repo);
//   });
// });
// console.log("after");

/* getUser(1)
  .then((user) => getRepositories(user.gitHubUserName))
  .then((data) => console.log(data))
  .catch((error) => console.log("error")); */

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("reading user from database");
      resolve({ id: id, gitHubUserName: "jo" });
    }, 0);
  });
}

function getRepositories(userName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["repo1", "repo2", "repo3"]);
    }, 0);
  });
}

// const promise = new Promise((resolve, reject) => {
//   resolve("promise resolved");
// });

// promise.then((data) => console.log(data));

// const p = Promise.reject(new Error("reason for rejection"));
// p.catch((error) => console.log(error));
/* 
  promise.all([p1,p2]).then(result => console.log(result)).then(err => console.log(error))
  if any promise returns error promise.all will retur error
  
  */
/* 
  Promise.race([p1,p2])
  
  executes the promise when the first promise is resoled
  */

/* Async & Await */
async function getUserRepositories() {
  try {
    const user = await getUser(1);
    const userRepo = await getRepositories(user.name);
    console.log(userRepo);
  } catch (error) {
    console.log(error);
  }
}

getUserRepositories();
