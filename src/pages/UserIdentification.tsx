import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';

import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function UserIdentification(){
  const [ isFocused, setIsFocused ] = useState(false);
  const [ isFalled, setIsFilled ] = useState(false);
  const [ name, setName ] = useState<string>();

  function handleInputBlur(){
    setIsFocused(false);
    setIsFilled(!!name);
  }

  function handleInputFocus(){
    setIsFocused(true);
  }

  function handleInputChange(value: string){
    setIsFilled(!!value);
    setName(value);
  }

  const navigation = useNavigation();

  async function handleSubmit(){
    if(!name)
    return Alert.alert('Digite um nome 😏');

    try{
      await AsyncStorage.setItem('@plantmanager:user', name);
      navigation.navigate('Confirmation', {
        title: 'Prontinho',
        subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
        buttonTitle: 'Começar',
        icon: 'smile',
        nextScreen: 'PlantSelect',
      });
    } catch {
      return Alert.alert('Erro ao salvar nome 😏');
    }

  }

  return (
    <SafeAreaView style = { styles.container }>
      <KeyboardAvoidingView
        style = { styles.container }
        behavior = { Platform.OS === 'ios' ? 'padding' : 'height' }
      >
        <TouchableWithoutFeedback onPress = { Keyboard.dismiss }>
          <View style = { styles.content }>
            <View style = { styles.form }>
              
              <View style = { styles.header }>
                <Text style = { styles.emoji }>
                  { isFalled ? '😄' : '😃' }
                </Text>
                
                <Text style = { styles.title }>
                  Como podemos { '\n' }
                  chamar você?
                </Text>
              </View>
              
              <TextInput
                style = {[
                  styles.input,
                  (isFocused || isFalled) && { borderColor: colors.green }
                ]}
                placeholder = "Digite seu nome"
                onBlur = { handleInputBlur }
                onFocus = { handleInputFocus }
                onChangeText = { handleInputChange }
              />

              <View style = { styles.footer }>
                <Button
                  title = "Confirmar"
                onPress = { handleSubmit }
                />
              </View>

            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width : '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  content: {
    flex: 1,
    width: '100%'
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center'
  },
  header: {
    alignItems: 'center'
  },
  emoji: {
    fontSize: 44
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center'
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 20
  },
  footer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20
  }
});