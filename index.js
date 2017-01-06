const Docker = require('dockerode')

function DockerPromise (config) {
  // Get dockerode Docker object
  const docker = new Docker(config)
  // Get the name of all functions that dockerode uses
  Object.keys(Object.getPrototypeOf(docker)).map(functionName => {
    // dockerode functions all share the same convention meaning wrapping
    // it is as simple as passing all the arguments, followed by a callback
    // We accomplish this by wrapping it in a function that returns a promise
    // instead by handling the (err, data) in every callback using resolve, reject
    this[functionName] = (...args) => new Promise((resolve, reject) => {
      docker[functionName](...args, (err, data) => {
        err ? reject(err) : resolve(data)
      })
    })
  })
}

module.exports = DockerPromise
