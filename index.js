const Docker = require('dockerode')

// Get functions in a prototype
const getFunctions = object => Object.keys(Object.getPrototypeOf(object))

// Functionally similar to DockerPromise, but for wrapping 'get' objects instead
// Read explanaition below
function DockerPromiseObject (object) {
  getFunctions(object).map(functionName => {
    this[functionName] = (...args) => new Promise((resolve, reject) => {
      object[functionName](...args, (err, data) => {
        err ? reject(err) : resolve(data)
      })
    })
  })
}

function DockerPromise (config) {
  // Get dockerode Docker object
  const docker = new Docker(config)

  // Wrap docker instance functions
  getFunctions(docker).map(functionName => {
    // Every function returns a promise
    this[functionName] = (...args) => new Promise((resolve, reject) => {
      // dockerode functions all share the same convention meaning wrapping
      // it is as simple as passing all the arguments, followed by a callback
      // We accomplish this by wrapping it in a function that returns a promise
      // instead by handling the (err, data) in every callback using resolve, reject
      // get functions however return objects and do not accept callbacks
      // Instead we will wrap those objects functions in Promises
      if (functionName.substr(0, 3) === 'get') {
        try {
          const object = docker[functionName](...args)
          resolve(new DockerPromiseObject(object))
        } catch (err) {
          reject(err)
        }
      } else {
        // Wrap non-get functions
        docker[functionName](...args, (err, data) => {
          err ? reject(err) : resolve(data)
        })
      }
    })
  })
}

module.exports = DockerPromise
