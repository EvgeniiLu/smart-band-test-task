export const loadUser = () =>
  fetch("https://random-data-api.com/api/users/random_user").then((r) =>
    r.json()
  );

export const loadBeer = () =>
  fetch("https://random-data-api.com/api/beer/random_beer").then((r) =>
    r.json()
  );
