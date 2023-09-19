const req = fetch('https://api.mcsrvstat.us/3/mcfkg.eu');

req.then(res => {
  if (!res.ok)
    return;

  res.json().then(async (/** @type unknown */json) => {
    if (!(
      json != null && typeof json === 'object' &&
      'online' in json && 'players' in json
    )) return;

    const { online, players } = json;

    if (!(typeof online === 'boolean' && online))
      return;
    if (!(Array.isArray(players)))
      return;
  });
});