import * as React from 'react'
import { useState, useEffect } from 'react'
import { AutoComplete } from 'antd'
import { useDebounce } from 'use-debounce'

import { searchForRepo } from '../lib/github'

export const RepositorySelector = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const debouncedSearchTerm = useDebounce(searchTerm, 250)

  useEffect(
    () => {
      if (!debouncedSearchTerm) {
        return
      }
      searchForRepo(debouncedSearchTerm).then((results) => {
        // tslint:disable-next-line:no-console
        setSearchResults(results.data.items.map((d) => d.full_name))
        // console.log(results)
      })
    },
    [debouncedSearchTerm]
  )

  return (
    <div style={{ height: '30px' }}>
      <AutoComplete
        value={searchTerm}
        dataSource={searchResults}
        onSearch={setSearchTerm}
        // tslint:disable-next-line:jsx-no-multiline-js
        onSelect={(value, options) => {
          // tslint:disable-next-line:no-console
          console.log('selected', value, options)
          setSearchResults([])
          setSearchTerm('')
        }}
      />
    </div>
  )
}
