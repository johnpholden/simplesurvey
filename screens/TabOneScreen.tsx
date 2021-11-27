import * as React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyleSheet, TextInput } from 'react-native'
import Survey from '../components/Survey'
import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'
import { parseSurvey, sampleSurvey } from '../functions/helperFunctions'

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  const [text, onChangeText] = React.useState(sampleSurvey)
  const [questionJSON, onUpdateQuestions] = React.useState([])

  React.useEffect(async () => {
    const value = await AsyncStorage.getItem('temp')
    onChangeText(value)
  }, [])

  React.useEffect(async () => {
    await AsyncStorage.setItem('temp', text)
    await onUpdateQuestions(await parseSurvey(text))
  }, [text])

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

        <Survey items={questionJSON}/>
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
