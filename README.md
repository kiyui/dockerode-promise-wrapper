# dockerode-promise-wrapper
Generic wrapper for [dockerode](https://github.com/apocas/dockerode) using ES6 promises. I did not like how other libraries that attempted to achieve the same thing were overly-complicated and had hard-coded values.
```
npm install --save dockerode-promise-wrapper
```

## api
The API is 100% the same as `dockerode`, minus the `(err, data)` callback which is handled by `.then(...).catch(...)` using promises instead.
Objects returned by `get` functions are also wrapped in promises, ie. `getContainer(:id).inspect()` is `[object Promise]`.

## example
```
const DockerPromise = require('dockerode-promise-wrapper')

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

## streaming
The `modem` from the `docker` instance is available should you wish to stream a process.
```
docker.pull('ubuntu:latest')
  .then(stream => {
    docker.modem.followProgress(stream, onFinished, onProgress) // View dockerode documentation
  })
```

## notes
This wrapper has not been 100% tested. Please report bugs and issues, or send a PR if an issue is found.
