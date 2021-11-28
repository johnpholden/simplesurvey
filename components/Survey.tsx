import React from 'react'
import { Text } from 'react-native'

export default function Survey({ items }: { items: any }) {
  return (
    <div>
      {items.map((item) => (
        <form>
          <Text>{item.prompt}</Text>
          {item.mcAnswers &&
            item.mcAnswers.map((a,y) => (
              <div>
              <input type="radio" id={y} name={y} value={a}></input>
              <label for={y}>{a}</label>
              </div>
            ))}

          {item.sAnswers &&
            item.sAnswers.map((a,y) => (
              <div>
              <label for={y}>{a}</label>
              <input type="text" id={y} name={a}></input>
              </div>
            ))}
        </form>
      ))}
</div>
  )
}
