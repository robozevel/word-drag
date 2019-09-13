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
    <a href="https://github.com/robozevel/word-drag" rel="noopener" target="_blank" title="Github" class="github">
      <svg class="icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>GitHub</title>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    </a>
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

a.github {
  transition: transform .4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  color: #000;
  display: block;
  height: 36px;
  width: 36px;
  position: absolute;
  bottom: 12px;
  right: 12px;
}

a:hover {
  transform: scale(1.25);
}
</style>
