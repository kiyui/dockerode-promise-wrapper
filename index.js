const Docker = require('dockerode')

function DockerPromise (config) {
  const docker = new Docker(config)
  Object.keys(Object.getPrototypeOf(docker)).map(functionName => {
    this[functionName] = (...args) => new Promise((resolve, reject) => {
      docker[functionName](...args, (err, data) => {
        err ? reject(err) : resolve(data)
      })
    })
  })
}

module.exports = DockerPromise
