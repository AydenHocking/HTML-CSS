window.addEventListener("load", chainPromises);

async function chainPromises() {
  try {
    await func1();
    await func2();
    await func3();
  } catch (err) {
    console.log(err.message);
  }
}

// function chainPromises() {
//   func1()
//     .then(func2)
//     .then(func3)
//     .catch(err => console.log(err.message));
// }

function func1() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log('Time flies like an arrow.');
      resolve();
    }, 1000);
  });
}

function func2() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log('Fruit flies like?');
      resolve();
    }, 1000);
  });
}

function func3() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log('A banana!');
      resolve();
    }, 2000);
  });
}



