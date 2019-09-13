<template>
  <div class="autocomplete">
    <input v-model.trim="query" type="search" autofocus placeholder="Search word">
    <div class="results">
      <div v-if="err" class="error">
        {{ err.message }}
      </div>
      <slot v-else v-bind="{ results }" />
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'

export default {
  name: 'Autocomplete',
  props: {
    debounceWait: {
      type: Number,
      default: 150
    },
    search: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      err: null,
      query: null,
      results: null,
      loading: false
    }
  },
  computed: {
    debouncedAutocomplete () {
      return debounce(this.autocomplete, this.debounceWait)
    }
  },
  watch: {
    query: 'debouncedAutocomplete'
  },
  methods: {
    async autocomplete (query) {
      try {
        this.err = null
        if (!query) {
          this.results = null
          return
        }
        this.loading = true
        const results = await this.search(query)
        if (query !== this.query) return
        this.results = results
      } catch (err) {
        this.err = err
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>
input {
  width: 100%;
  padding: 1rem;
  font-size: inherit;
  border: none;
  border-bottom: 2px solid #f0f0f0;
  transition: all .15s ease;
  margin-bottom: .5rem;
}

input:focus {
  outline: none;
  border-color: #000;
}

.error {
  color: #ff0000;
  text-align: center;
}
</style>
