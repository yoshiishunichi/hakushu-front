<template>
  <div class="container">
    <h1>
      現在の白州18年の価格から<br />好きな年代の白州の値段を<br
        class="mobile-br"
      />捏造します
    </h1>
    <p class="current-price">現在の白州18年の価格: {{ price }}</p>
    <p v-if="existPrice && priceInt" class="palse-price">
      1年あたり: ￥{{ getPalsePrice() }}
    </p>
    <div v-if="existPrice && priceInt" class="user-container">
      <p class="brand">白州</p>
      <input v-model="year" type="number" class="price" />
      <p class="year">年:</p>
      <p :class="{ strong: isStrong }">￥{{ calc() }}</p>
    </div>
    <div v-if="!loaded" class="loading-container">
      <Loading />
    </div>
    <a
      v-if="existPrice && priceInt"
      class="tweet-button"
      :href="`http://twitter.com/share?url=https://hakushu-price-generator.herokuapp.com/&text=白州${getYear()}年%0a${calc()}円 @ganja_tuber%0a`"
      target="_blank"
      rel="noopener"
      >Tweet</a
    >
    <p class="attention">
      ※このwebアプリは、現在の白州18年の値段(おそらく最安値)を自動で取得しその価格を18で割った価格を1年分の値段として白州の値段を捏造します。
    </p>
    <p class="attention">
      ※ただし、処理できる桁数を超えた分は切り捨てられます。
    </p>
    <p class="attention">※もちろん白州18年の最安値を確認することもできます。</p>
    <p class="attention">
      開発者Twitter:
      <a
        class="developer-link"
        href="https://twitter.com/ganja_tuber"
        target="_blank"
        rel="noopener"
        >@ganja_tuber</a
      >
    </p>
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
      year: 18,
      loaded: false,
      isStrong: false,
    }
  },
  mounted() {
    axios
      .get('/api')
      .then((res) => {
        this.loaded = true
        this.price = res.data
        this.priceInt = parseInt(this.price.replace('¥', '').replace(/,/g, ''))
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
      if (this.year === 18) {
        this.isStrong = false
        return String(this.priceInt)
      }

      const resultNum: number = this.getPalsePrice() * this.year
      const resultStr: string = String(resultNum).toLowerCase()
      const splitResult = resultStr.split('e')

      if (splitResult.length === 1) {
        this.isStrong = false
        return resultStr
      }
      let resultLeft = splitResult[0].replace('.', '')
      const resultRight = parseInt(splitResult[1])
      if (resultRight > 0) {
        const zeroCount = resultRight - resultLeft.length
        for (let i = 0; i <= zeroCount; i++) {
          resultLeft += '0'
        }
        this.isStrong = true
        return resultLeft
      }
      const absRight = Math.abs(resultRight)
      let result = resultLeft
      for (let i = 0; i < absRight - 1; i++) {
        result = '0' + result
      }
      result = '0.' + result
      this.isStrong = false
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
  color: #333;
  font-family: '游ゴシック体', YuGothic, '游ゴシック Medium', 'Yu Gothic Medium',
    '游ゴシック', 'Yu Gothic', sans-serif;
}

.container {
  margin: 12px;
  padding: 15px;
  background: white;
  border-radius: 15px;
  z-index: 1;
  word-break: break-all;
}

h1 {
  font-size: 27px;
  margin-bottom: 48px;
}

a,
button {
  cursor: pointer;
}

.year,
.brand,
.price {
  display: inline-block;
  vertical-align: middle;
}

.price {
  outline: none;
  width: 90%;
  min-width: 141px;
  height: 42px;
  font-size: 18px;
  border: solid darkgray 0.3px;
  border-radius: 9px;
  padding-left: 3px;
}

.current-price,
.palse-price,
.user-container p {
  font-size: 21px;
}

.current-price,
.palse-price {
  margin-bottom: 12px;
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

.strong {
  font-size: 36px !important;
  font-weight: bold;
}

.mobile-br {
  display: none;
}

.user-container {
  margin-bottom: 27px;
}

.tweet-button {
  display: block;
  text-decoration: none;
  color: white;
  background-color: rgb(98, 198, 238);
  border: 1px solid gray;
  border-radius: 6px;
  padding: 3px 9px;
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  width: 75px;
  text-align: center;
  margin-bottom: 18px;
}

.tweet-button:hover {
  opacity: 0.6;
}

.developer-link {
  color: #333;
}

.developer-link:hover {
  opacity: 0.6;
}

.attention {
  font-size: 18px;
}

@media screen and (max-width: 900px) {
  .price {
    width: 80%;
    height: 39px;
  }
}

@media screen and (max-width: 600px) {
  .price {
    height: 36px;
  }

  h1 {
    font-size: 21px;
    margin-bottom: 36px;
  }

  .current-price,
  .palse-price,
  .user-container p {
    font-size: 18px;
  }

  .current-price,
  .palse-price {
    margin-bottom: 10.5px;
  }

  .user-container {
    margin-bottom: 24px;
  }

  .tweet-button {
    margin-bottom: 15px;
  }

  .attention {
    font-size: 15px;
  }
}

@media screen and (max-width: 350px) {
  .price {
    width: 70%;
    height: 33px;
    font-size: 15px;
  }

  h1 {
    font-size: 18px;
    margin-bottom: 30px;
  }

  .current-price,
  .palse-price,
  .user-container p {
    font-size: 15px;
  }

  .current-price,
  .palse-price {
    margin-bottom: 9px;
  }

  .user-container {
    margin-bottom: 21px;
  }

  .tweet-button {
    margin-bottom: 12px;
  }

  .mobile-br {
    display: block;
  }
}
</style>
