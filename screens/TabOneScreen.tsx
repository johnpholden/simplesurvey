import * as React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyleSheet, TextInput, SectionList } from 'react-native'
import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'

let sampleSurvey =
  'MC\nWhat is the best pizza topping?\n1. Pepperoni\n2. Cheese\n3. Pineapple\n2'


function parseSurvey(surveyText) {
  return [{"test":"asdf"}]
// let formattedQuestions = []

//   let rawQuestions = surveyText.split('\n\n')

//   rawQuestions.map((q, i) => {
//     let qPrompt = q.match(/^(.*\?$)/gim, '$1')[0]
//     formattedQuestions.push({ prompt: qPrompt })

//     let mcAnswers = []
//     mcAnswers = q.match(/^.*\[\].*$/gim)
//     mcAnswers = mcAnswers.map((a) => a.replace(/^\[\] (.*$)/gim, '$1'))

//     formattedQuestions[i]['mcAnswers'] = mcAnswers
//   })
//   return formattedQuestions
}

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  const [text, onChangeText] = React.useState(sampleSurvey)
  const [questions, onUpdateQuestions] = React.useState([])

  React.useEffect(async () => {
    const value = await AsyncStorage.getItem('temp')
    onChangeText(value)
  }, [])

  React.useEffect(async () => {
    const timer = setTimeout(async () => {
      try {
        // await AsyncStorage.setItem('temp', text)
        onUpdateQuestions(parseSurvey(text))
        console.log(text)
      } catch (e) {}
    }, 1000)
    return () => clearTimeout(timer)
  }, [text])

  const _renderItem = ({ item, index }) => {
    console.log(item)
    return (
      <View>
        <Text style={styles.question} key={index}>
          {item.prompt}
          {item.mcAnswers.map((a) => (
            <Text style={styles.answer}>{a}</Text>
          ))}
        </Text>
      </View>
    )
  }

  const Item = ({ title }) => <Text style={styles.answer}>{title}</Text>

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Survey</Text>
      <TextInput
        multiline
        numberOfLines={5}
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <Text style={styles.title}>Preview Survey</Text>

      {questions.length > 1 && (
        <SectionList
          sections={questions}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Item title={item} />}
          renderSectionHeader={({ section: { question } }) => (
            <Text style={styles.question}>{question}</Text>
          )}
        />
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '100%',
  },
  question: {
    marginVertical: 10,
    fontSize: 20,
  },
  answer: {
    fontSize: 10,
  },
  input: {
    fontFamily: 'monospace',
    padding: 10,
    marginVertical: 5,
    fontSize: 12,
    width: '100%',
    maxHeight: '30%',
    backgroundColor: '#c4c4c4dd',
  },
})
