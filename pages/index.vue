<template>
  <div class="container">
    <h1>
      現在amazonで販売されている白州18年の価格から<br />好きな年代の白州の値段を算出します
    </h1>
    <p class="current-price">現在の白州18年の価格: {{ price }}</p>
    <div v-if="existPrice && priceInt" class="user-container">
      <p v-if="priceInt">1年あたり: ￥{{ getPalsePrice() }}</p>
      <p class="brand">白州</p>
      <input v-model="year" type="number" class="price" />
      <p class="year">年:</p>
      <p>￥{{ calc() }}</p>
    </div>
    <div v-if="!loaded" class="loading-container">
      <Loading />
    </div>
    <a
      v-if="existPrice && priceInt"
      class="tweet-button"
      :href="`http://twitter.com/share?url=https://hakushu-price.herokuapp.com/&text=白州${getYear()}年
%0a${calc()}円
%0a`"
      target="_blank"
      >Tweet</a
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({
  data() {
    return {
      price: '読み込み中...',
      priceInt: 0,
      existPrice: false,
      year: 0,
      loaded: false,
    }
  },
  mounted() {
    axios
      .get('/api')
      .then((res) => {
        this.loaded = true
        this.price = res.data
        this.priceInt = parseInt(this.price.replace('￥', '').replace(/,/g, ''))
        this.existPrice = true
      })
      .catch((err) => {
        this.loaded = true
        this.price = `読み込み失敗: ${err}`
      })
  },
  methods: {
    getPalsePrice() {
      const palse = this.priceInt / 18
      return Math.floor(palse)
    },
    calc(): string {
      const resultNum: number = this.getPalsePrice() * this.year
      const resultStr: string = String(resultNum).toLowerCase()
      const splitResult = resultStr.split('e')

      if (splitResult.length === 1) {
        return resultStr
      }
      let resultLeft = splitResult[0].replace('.', '')
      const resultRight = parseInt(splitResult[1])
      if (resultRight > 0) {
        const zeroCount = resultRight - resultLeft.length
        for (let i = 0; i <= zeroCount; i++) {
          resultLeft += '0'
        }
        return resultLeft
      }
      const absRight = Math.abs(resultRight)
      let result = resultLeft
      for (let i = 0; i < absRight - 1; i++) {
        result = '0' + result
      }
      result = '0.' + result
      return result
    },
    getYear(): number {
      if (Math.abs(this.year)) {
        return this.year as number
      }
      return 0
    },
  },
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: rgb(47, 153, 20);
}

.container {
  margin: 12px;
  padding: 15px;
  background: white;
  border-radius: 15px;
  z-index: 1;
}

h1 {
  font-size: 27px;
}

a,
button {
  cursor: pointer;
}

.tweet-button {
  text-decoration: none;
  color: white;
  background-color: rgb(120, 201, 233);
  border: 1px solid gray;
  border-radius: 6px;
  padding: 3px 12px;
  font-weight: bold;
  font-size: 15px;
}

.year,
.brand,
.price {
  display: inline-block;
  vertical-align: middle;
}

.price {
  outline: none;
}

.user-container {
  margin-top: 30px;
}

.current-price,
.user-container p {
  font-size: 21px;
}

.loading-container {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: rgba(253, 253, 253, 0.8);
  top: 0;
  left: 0;
  z-index: 10;
  padding: auto;
}
</style>
