const api = `https://api.spacexdata.com/v4`

export function fetchRockets () {
  return fetch(`${api}/rockets/`)
    .then((res) => res.json())
}

export function fetchLaunches () {
  return fetch(`${api}/launches/`)
    .then((res) => res.json())
}

export function fetchInitialData() {
  return Promise.all([fetchRockets()]).then(([rockets]) => ({
    rockets,
  }))
}
