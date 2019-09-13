import { URLSearchParams } from 'url'
import { run } from 'micro'
import wordlist from 'wordlist-english'
import Fuse from 'fuse.js'

const MAX_RESULTS = 100

const fuse = new Fuse(wordlist.english, {
  threshold: 0.3,
  location: 0,
  distance: 10,
  findAllMatches: true,
  maxPatternLength: 32,
  minMatchCharLength: 1
})

function handler (req, res) {
  const query = new URLSearchParams(req.url.slice(1)).get('q')
  const results = query ? fuse.search(query).slice(0, MAX_RESULTS) : []
  return results.map(i => wordlist.english[i])
}

export default (req, res) => run(req, res, handler)
