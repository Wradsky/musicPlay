import { getSongDetail, getSongLyric, getSongUrl } from '../api/index'

export default {
  callPlayShow ({ commit }, flag) {
    commit('changeShow', flag)
  },
  callMinPlayShow ({ commit }, flag) {
    commit('changeMinShow', flag)
  },
  callPlayer ({ commit }, flag) {
    commit('changePlayer', flag)
  },
  callMode ({ commit }, flag) {
    commit('changeMode', flag)
  },
  async callSongs ({ commit }, ids) {
    const list = []
    const detail = await getSongDetail({ ids: ids.join(',') })
    const urls = await getSongUrl({ id: ids.join(',') })
    const datas = detail.data.songs
    datas.forEach(function (value) {
      if (value.id === undefined) return
      const obj = {}
      for (let i = 0; i < urls.data.data.length; i++) {
        if (value.id === urls.data.data[i].id) {
          obj.url = urls.data.data[i].url
        }
      }
      obj.name = value.name
      let singer = ''
      value.ar.forEach(function (item, index) {
        if (index === 0) {
          singer = item.name
        } else {
          singer += '/' + item.name
        }
      })
      obj.id = value.id
      obj.picUrl = value.al.picUrl
      obj.singer = singer
      list.push(obj)
    })
    console.log(list)
    commit('changeSongs', list)
  },
  async callLyric ({ commit }, id) {
    const data = await getSongLyric({ id: id })
    if (data.data.lrc === undefined) return
    const lyricDate = data.data.lrc.lyric
    const lyric = parseLyric(lyricDate)
    commit('changeLyric', lyric)
  },
  callDelSongs ({ commit }, index) {
    commit('delSongs', index)
  },
  callCurrentIndex ({ commit }, index) {
    commit('changeCurrentIndex', index)
  },
  callCurrentTime ({ commit }, time) {
    commit('changeCurrentTime', time)
  },
  callCollectFlag ({ commit }, [song, index]) {
    commit('changeCollectFlag', [song, index])
  },
  callCollectIndex ({ commit }, [song, index]) {
    commit('changeCollectIndex', [song, index])
  },
  callSetCollectFlag ({ commit }, list) {
    commit('setCollectFlag', list)
  },
  callSetKey ({ commit }, index) {
    commit('changeKey', index)
  },
  callSetCollectIndex ({ commit }, obj) {
    commit('setCollectIndex', obj)
  },
  // callCollectIndex ({ commit }, [song, index]) {
  //   commit('changeCollectIndex', [song, index])
  // },
  callDelFavorite ({ commit }, index) {
    commit('delFavorite', index)
  },
  callDelThis ({ commit }, i) {
    commit('delThis', i)
  },
  callTest ({ commit }) {
    commit('setTest')
  },
  callHistoryList ({ commit }, list) {
    commit('changeHistory', list)
  },
  callDelHistory ({ commit }, index) {
    commit('delHistory', index)
  },
  callCurrentSong ({ commit }, obj) {
    commit('changeCurrentSong', obj)
  }
}
function parseLyric (lrc) {
  const lyric = lrc.split('\n')
  // console.log(lyric)
  const reg1 = /\[\d*:\d*.\d*]/g
  const reg2 = /\[\d*/i
  const reg3 = /\:\d*/i
  const objLyric = {}
  lyric.forEach(function (value) {
    const times = value.match(reg1)
    if (!times) return
    // 提取分钟
    const minute = times[0].match(reg2)[0].substr(1)
    // // 提取秒钟
    const second = times[0].match(reg3)[0].substr(1)
    // 合并时间
    const num = parseInt(minute) * 60 + parseInt(second)
    // 处理文字
    const text = value.replace(reg1, '').trim().replace(/[ ]/g, '')
    if (!text) {
      return
    }
    objLyric[num] = text
  })
  return objLyric
}
/* function parseLyric (lrc) {
  const lyrics = lrc.split('\n')
  // [00:00.000] 作曲 : 林俊杰
  // 1.定义正则表达式提取[00:00.000]
  const reg1 = /\[\d*:\d*\.\d*\]/g
  // 2.定义正则表达式提取 [00
  const reg2 = /\[\d*!/i
  // // 3.定义正则表达式提取 :00
  const reg3 = /\\:\d*!/i
  // // 4.定义对象保存处理好的歌词
  const lyricObj = {}
  lyrics.forEach(function (lyric) {
    // 1.提取时间
    let timeStr = lyric.match(reg1)
    if (!timeStr) { return }
    timeStr = timeStr[0]
    // 2.提取分钟
    const minStr = timeStr.match(reg2)[0].substr(1)
    console.log(minStr)
    // // 3.提取秒钟
    const secondStr = timeStr.match(reg3)[0].substr(1)
    console.log(secondStr)
    // 4.合并时间, 将分钟和秒钟都合并为秒钟
    const time = parseInt(minStr) * 60 + parseInt(secondStr)
    // // 5.处理歌词
    const text = lyric.replace(reg1, '').trim()
    // // 6.保存数据
    lyricObj[time] = text
  })
  return lyricObj
} */
