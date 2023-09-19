const req = fetch('https://api.mcsrvstat.us/3/mcfkg.eu');

req.then(res => {
  if (!res.ok)
    return;

  res.json()
    .then(async json => {
      if (!json?.online)
        return;

      const playerList = json?.players?.list || [];

      const tablist = document.createElement('tablist');
      document.body.append(tablist);

      const header = document.createElement('div'),
        headerText = document.createElement('p');
      header.append(headerText);
      tablist.append(header);

      if (playerList.length === 0) {
        headerText.innerText = 'Serverstatus: online';
      } else {
        headerText.innerText = playerList.length + ' spelare online nu';

        for (const player of playerList) {
          if (!(
            'name' in player && 'uuid' in player
          )) continue;

          const div = document.createElement('div');
          tablist.append(div);

          const p = document.createElement('p');
          p.innerText = player.name;

          const img = document.createElement('img');
          img.src = `https://mc-heads.net/avatar/${player.uuid}/64`;

          div.append(img, p);
        }
      }
    });
});
