# dockerode-promise-wrapper
Generic wrapper for [dockerode](https://github.com/apocas/dockerode) using ES6 promises. I did not like how other libraries that attempted to achieve the same thing were overly-complicated and had hard-coded values.
```
npm install --save dockerode-promise-wrapper
```

## api
The API is 100% the same as `dockerode`, minus the `(err, data)` callback which is handled by `.then(...).catch(...)` using promises instead.

## example
```
const DockerPromise = require('./index')

const docker = new DockerPromise({
  socketPath: '/var/run/docker.sock'
})

docker.listContainers()
  .then(containers => {
    console.log(containers)
  })
  .catch(err => {
    console.error(err)
  })

docker.listImages()
  .then(images => {
    console.log(images)
  })
  .catch(err => {
    console.error(err)
  })
```
