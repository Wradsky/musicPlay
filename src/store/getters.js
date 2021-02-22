export default {
  getPlayShow (state) {
    return state.isPlayShow
  },
  getMinPlayShow (state) {
    return state.isMinPlayShow
  },
  // state 可以理解成一个对象来保持共享数据中state保存的数据（state：{ isPlayShow: false,
  //   isMinPlayShow: false,
  //   // 播放按钮数据
  //   isPlayer: false}）
  getPlayer (obj) {
    return obj.isPlayer
  },
  getMode (state) {
    return state.modeType
  },
  // // 获取全部歌曲
  getSongs (state) {
    return state.currentSongs
  },
  // // // 获取一首单曲
  songs (state) {
    const obj = {
      name: '',
      picUrl: null,
      singer: '',
      uri: null
    }
    if (state.songs.length === 1) {
      state.currentSongs = state.songs[0]
      return state.currentSongs
    } else if (state.songs.length >= 1) {
      state.currentSongs = state.songs[state.currentIndex]
      return state.currentSongs
    } else {
      return obj
    }
  },
  getLyric (state) {
    return state.lyric
  },
  currentIndex (state) {
    return state.currentIndex
  },
  getCurrentTime (state) {
    return state.currentTime
  },
  getCollectFlag (state) {
    return state.collectFlag
  },
  getFavoriteIndex (state) {
    return state.favoriteIndex
  },
  getFavoriteFlag (state) {
    return state.favoriteFlag
  },
  getKey (state) {
    return state.key
  },
  getTest (state) {
    return state.test
  },
  getHistoryList (state) {
    return state.historyList
  }
}
