import Api from './networks'

// 这里就相当于获取数据的函数
export const getBanner = () => Api.get('banner?type=2')
export const getPlayList = () => Api.get('personalized?limit=6')
export const getAlbums = () => Api.get('album/newest')
export const getNewMusic = () => Api.get('personalized/newsong')
export const getMusicDetail = (data) => Api.get('playlist/detail', data)
export const getAlbumDetail = (data) => Api.get('album', data)
export const getSongDetail = (data) => Api.get('song/detail', data)
export const getSongLyric = (data) => Api.get('lyric', data)
export const getSongUrl = (data) => Api.get('song/url', data)
export const getArtistSong = (data) => Api.get('artists', data)
export const getSinger = () => Api.get('top/artists?offset=0&limit=5')
export const getArtist = (letter) => Api.get(`/artist/list?offset=0&limit=5&type=-1&area=7&initial=${letter}`)
// export const getArtist = function (letter) {
//   return new Promise(function (resolve, reject) {
//     Api.all(list).then(function (value) {
//       resolve(value)
//     }).catch(function (err) {
//       reject(err)
//     })
//   })
// }
export const getAllArtist = () => {
  return new Promise(function (resolve, reject) {
    const keys = ['热']
    const list = [getSinger()]
    const dataArray = []
    for (let i = 65; i < 91; i++) {
      const key = String.fromCharCode(i)
      keys.push(key)
      list.push(getArtist(key))
    }
    Api.all(list).then(function (...data) {
      data[0].forEach(function (value) {
        dataArray.push(value.data.artists)
      })
      const obj = {}
      obj.keys = keys
      obj.list = dataArray
      resolve(obj)
    }).catch(function (err) {
      reject(err)
    })
  })
}
export const getRank = () => Api.get('toplist/detail')
export const getAllRank = () => {
  return new Promise(function (resolve, reject) {
    const category = {
      officialList: [
        { name: '飙升榜', id: 3 },
        { name: '新歌榜', id: 0 },
        { name: '原创榜', id: 2 },
        { name: '热歌榜', id: 1 }
      ],
      recList: [
        { name: '云音乐说唱榜', id: 23 },
        { name: '云音乐电音榜', id: 25 },
        { name: '云音乐欧美新歌榜', id: 32 },
        { name: '云音乐ACG榜', id: 26 },
        { name: '云音乐国电榜', id: 22 },
        { name: '云音乐古典榜', id: 24 }
      ],
      globalList: [
        { name: '美国Billboard榜', id: 6 },
        { name: 'UK排行榜周榜', id: 5 },
        { name: 'Beatport全球电子舞曲榜', id: 21 },
        { name: '日本Oricon榜', id: 10 },
        { name: 'iTunes榜', id: 8 },
        { name: '云音乐欧美热歌榜', id: 29 }
      ],
      otherList: [
        { name: 'KTV唛榜', id: 7 },
        { name: '法国 NRJ Vos Hits 周榜', id: 19 },
        { name: '云音乐ACG动画榜', id: 27 },
        { name: '云音乐古风榜', id: 28 },
        { name: '潜力爆款榜', id: 30 },
        { name: '云音乐民谣榜', id: 31 }
      ],
      titles: { officialList: '官方榜', recList: '推荐榜', globalList: '全球榜', otherList: '更多榜单' }
    }
    getRank().then(function (data) {
      data.data.list.forEach(function (value) {
        for (const key in category) {
          for (let j = 0; j < category[key].length; j++) {
            if (category[key][j].name === value.name) {
              category[key][j].rank = value
              break
            }
          }
        }
      })
      resolve(category)
    }).catch(function (err) {
      reject(err)
    })
  })
}
export const getSearch = (data) => Api.get('search?type=1', data)
export const getSearchHot = () => Api.get('search/hot')
