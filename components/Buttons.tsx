import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';

export default function CreateSurveyButton({ title }: { title: string }) {
  return (
      <Button
        title={title}
        onPress={() => Alert.alert('Simple Button pressed')}
      />
  );
}
