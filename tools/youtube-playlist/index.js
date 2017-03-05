const cheerio = require('cheerio');
const request = require('request-promise');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function parseContents($) {
  let contents = [];
  const list = $('.pl-video');
  list.each(function() {
    const stars = Math.floor(Math.random() * 100);
    contents.push({
      url: $(this).data('video-id'),
      stars: { count: stars },
      views: { count: Math.floor(stars * (Math.random() * 5 + 5)) }
    });
  });
  return contents;
}

function saveContents(content) {
  let data = { videos: content };
  fs.writeFile(`result.json`, JSON.stringify(data, null, 2), { flag: 'w' },(err) => {
    if (err) throw err;
    console.log(`재생 목록 저장 완료`);
  })
}

const rp = request.defaults({
  jar: true,
  rejectUnauthorized: false, 
  followAllRedirects: true,
  transform: function (body) {
    return cheerio.load(body);
  },
});

rl.question('재생 목록 키를 입력해주세요: ', (url) => {
  rp({ url: `https://www.youtube.com/playlist?list=${url}` })
    .then(parseContents)
    .then(contents => saveContents(contents))
    .catch(e => console.log(e));
  rl.close();
});
