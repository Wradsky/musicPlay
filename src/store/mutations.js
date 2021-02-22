export default {
  changeShow (state, flag) {
    state.isPlayShow = flag
  },
  changeMinShow (state, flag) {
    state.isMinPlayShow = flag
  },
  changePlayer (state, flag) {
    state.isPlayer = flag
  },
  changeMode (state, flag) {
    state.modeType = flag
  },
  changeSongs (state, list) {
    state.songs = list
  },
  changeLyric (state, list) {
    state.lyric = list
  },
  delSongs (state, index) {
    if (index !== undefined) {
      state.songs.splice(index, 1)
    }
    // } else {
    //   state.songs = []
    // }
    if (index < state.currentIndex) {
      state.currentIndex = state.currentIndex - 1
    }
    if (state.songs.length === 0) {
      state.isMinPlayShow = false
      state.isPlayShow = false
    }
  },
  changeCurrentIndex (state, index) {
    state.currentIndex = index
    // if (index < 0) {
    //   index = state.songs.length - 1
    // } else if (index > state.songs.length - 1) {
    //   index = 0
    // }
    // state.currentIndex = index
  },
  changeCurrentTime (state, time) {
    state.currentTime = time
  },
  changeCollectFlag (state, [song, index]) {
    const result = state.collectFlag.find(function (currentValue) {
      return currentValue.id === song.id
    })
    if (result === undefined) {
      state.favoriteFlag = true
      // state.key++
      // state.favoriteIndex[index] = state.key
      return state.collectFlag.push(song)
    } else {
      state.favoriteFlag = false
    }
  },
  changeCollectIndex (state, [song, index]) {
    const result = state.collectFlag.find(function (currentValue) {
      return currentValue.id === song.id
    })
    if (result === undefined) {
      state.key = song.id
      state.favoriteIndex[index] = state.key
      // 创建一个新的对象，将state.favoriteIndex对象复制到新对象中
      const data = Object.assign({}, state.favoriteIndex)
      // 将state.favoriteIndex指向新对象的引用地址
      state.favoriteIndex = data
    }
  },
  changeKey (state, index) {
    state.key = index
  },
  setCollectFlag (state, list) {
    state.collectFlag = list
  },
  setCollectIndex (state, obj) {
    state.favoriteIndex = obj
  },
  delFavorite (state, index) {
    state.collectFlag.splice(index, 1)
  },
  delThis (state, i) {
    for (const key in state.favoriteIndex) {
      if (i === key) {
        delete state.favoriteIndex[key]
        // 创建一个新的对象，将state.favoriteIndex对象复制到新对象中
        const data = Object.assign({}, state.favoriteIndex)
        // 将state.favoriteIndex指向新对象的引用地址
        state.favoriteIndex = data
      }
    }
  },
  setTest (state) {
    state.test = !state.test
  },
  changeHistory (state, list) {
    const result = state.historyList.find(function (currentValue) {
      return currentValue.id === list.id
    })
    if (result === undefined) {
      return state.historyList.push(list)
    }
  },
  delHistory (state, index) {
    state.historyList.splice(index, 1)
  },
  changeCurrentSong (state, obj) {
    state.currentSongs = obj
  }
}
