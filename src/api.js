export const loadUser = () =>
  fetch("https://random-data-api.com/api/users/random_user").then((r) =>
    r.json()
  );

export const loadBeer = () =>
  fetch("https://random-data-api.com/api/beer/random_beer").then((r) =>
    r.json()
  );

export const loadImage = (data) =>
  fetch(data)
    .then((r) => {
      if (r.status === 200) return r;
      else throw new Error(r);
    })
    .catch((err) => console.log(err));
