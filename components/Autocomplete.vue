<template>
  <div class="autocomplete">
    <input v-model.trim="query" type="search" autofocus>
    <div class="results">
      <slot v-bind="{ results }" />
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
        if (!query) {
          this.results = null
          return
        }
        this.loading = true
        const results = await this.search(query)
        if (query !== this.query) return
        this.results = results
      } catch (err) {
        console.error(err)
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
</style>
