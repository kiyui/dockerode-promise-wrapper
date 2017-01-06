import test from 'ava'

const DockerPromise = require('./index')

const docker = new DockerPromise({
  socketPath: '/var/run/docker.sock'
})

const type = obj => Object.prototype.toString.call(obj)

test('list images', t => {
  return docker.listImages().then(result => {
    t.is(type(result), '[object Array]', 'docker.listContainers() returns Array')
  })
})

test('list containers', t => {
  return docker.listContainers().then(result => {
    t.is(type(result), '[object Array]', 'docker.listContainers() returns Array')
  })
})

test('get container', t => {
  t.plan(3)
  return new Promise((resolve, reject) => {
    if (!process.env.CONTAINER) {
      reject("No test container defined for 'get container' test")
    }
    const containerPromise = docker.getContainer(process.env.CONTAINER)
    t.is(type(containerPromise), '[object Promise]', 'docker.getContainer(:id) is a Promise')
    containerPromise.then(container => {
      const containerInspectPromise = container.inspect()
      t.is(type(containerInspectPromise), '[object Promise]', 'container.inspect() is a Promise')
      containerInspectPromise.then(inspect => {
        t.is(type(inspect), '[object Object]', 'container.inspect() returns Array')
        resolve(true)
      })
    })
  })
})
