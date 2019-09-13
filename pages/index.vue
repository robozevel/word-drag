<template>
  <main>
    <Autocomplete :search="search">
      <template #default="{ results }">
        <div v-for="result in results" :key="result" class="result" role="button" @click="addWord(result)">
          {{ result }}
        </div>
      </template>
    </Autocomplete>
    <div class="text">
      <template v-for="(word, i) in words">
        <span :key="i" class="word" role="button" @click="removeWord(i)">{{ word }} </span>
      </template>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import Autocomplete from '~/components/Autocomplete.vue'

export default {
  components: {
    Autocomplete
  },
  data () {
    return {
      words: []
    }
  },
  methods: {
    async search (q) {
      const params = { q }
      const { data: results } = await axios('/api', { params })
      return results
    },
    addWord (word) {
      this.$set(this.words, this.words.length, word)
    },
    removeWord (i) {
      const words = [...this.words]
      words.splice(i, 1)
      this.words = words
    }
  }
}
</script>

<style>
main {
  margin: 0 auto;
  height: 100vh;
  display: flex;
}

textarea {
  flex: 1;
}

.autocomplete {
  width: 16rem;
  padding: .5rem;
  overflow: auto;
}

.text {
  padding: 1rem;
  font-size: 150%;
  flex: 1;
}

.result {
  display: inline-block;
  padding: .25rem;
  margin: .25rem;
  background-color: #f0f0f0;
  border-radius: .25rem;
}

[role=button] {
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
</style>
