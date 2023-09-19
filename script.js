const req = fetch('https://api.mcsrvstat.us/3/mcfkg.eu');

req.then(res => {
  if (!res.ok)
    return;

  res.json()
    .then(async json => {
      const playerList = json?.players?.list || [];

      if (playerList.length > 0) {
        const tablist = document.createElement('tablist');

        const header = document.createElement('div'),
          headerText = document.createElement('p');
        headerText.innerText = playerList.length + ' spelare online nu';

        header.append(headerText);
        tablist.append(header);

        for (const player of playerList) {
          if (!(
            'name' in player && 'uuid' in player
          )) continue;

          const div = document.createElement('div');
          tablist.append(div);

          const p = document.createElement('p');
          p.innerText = player.name;

          const img = document.createElement('img');
          img.src = `https://mc-heads.net/avatar/${player.uuid}/20`;

          div.append(img, p);
        }

        document.body.append(tablist);
      }
      console.log(json)
    });
});
