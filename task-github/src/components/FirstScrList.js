import React from 'react'
import { ScreenItem } from './ScreenItem'

export default function FirstScrList({ items }) {
  return (
    <div>
      hello from first list screen ...try to find a user
      {items?.map((item) => (
        <ScreenItem item={item} key={item.id} />
      ))}
    </div>
  )
}
