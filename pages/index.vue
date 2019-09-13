<template>
  <main>
    <Autocomplete :search="search">
      <template #default="{ results }">
        <draggable
          v-model="results"
          v-bind="draggableOptions"
          :sort="false"
        >
          <div v-for="result in results" :key="result" class="result" role="button" @click="addWord(result)">
            {{ result }}
          </div>
        </draggable>
      </template>
    </Autocomplete>
    <draggable
      v-model="words"
      class="text"
      tag="div"
      v-bind="draggableOptions"
    >
      <template v-for="(word, i) in words">
        <span :key="i" class="word" role="button" @click="removeWord(i)">{{ word }}</span>
      </template>
    </draggable>
  </main>
</template>

<script>
import axios from 'axios'
import draggable from 'vuedraggable'
import Autocomplete from '~/components/Autocomplete.vue'

export default {
  components: {
    draggable,
    Autocomplete
  },
  data () {
    return {
      words: []
    }
  },
  computed: {
    draggableOptions () {
      return {
        group: 'words',
        animation: 150
      }
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

.autocomplete .result {
  padding: .25rem;
  margin: .25rem;
  background-color: #f0f0f0;
  border-radius: .25rem;
}

.text {
  padding: 1rem;
  font-size: 150%;
  flex: 1;
}

.word,
.result {
  display: inline-block;
}

.text > *::after {
  content: '\a0'
}

[role=button] {
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
</style>
