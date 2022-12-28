import { StyleSheet, Text, View, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from "@react-navigation/native"
import { TextInput, Avatar, Button } from 'react-native-paper';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const TelaLogin = () => {
  const navigation = useNavigation()
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    verificarLogin()
  }, []);

  function logar() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        alert('Usuário logado');
        manterLogin();
        navigation.navigate('TelaInicial');
      })
      .catch(error => {
        alert(error);
      });
  }

  async function manterLogin() {
    try {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('senha', senha);
      alert('Guardei no local')
    } catch (error) {
      alert(error)
    }
  }

  async function verificarLogin() {
    try {
      const emailLocal = await AsyncStorage.getItem('email')
      const senhaLocal = await AsyncStorage.getItem('senha')
      if (emailLocal && senhaLocal) {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, emailLocal, senhaLocal)
          .then(()=> {
            alert('Seja bem vindo de volta!');
            navigation.navigate('TelaInicial');
          })
          .catch(error => {
            alert(error);
          })
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <View style={[styles.container, { width: screenWidth, height: screenHeight }]} >
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.imagem}>
            <View>
              <Avatar.Image style={{ backgroundColor: '#121212' }} size={200} source={require('../../../../assets/pyquiz.png')} />
            </View>
          </View>
          <View style={styles.container}>
            <Text style={styles.texto} >LOGIN </Text>
          </View >
          <View style={styles.container}>

            <TextInput
              style={styles.caixaTexto}
              label="Email"
              mode="outlined"
              onChangeText={setEmail}
              value={email}
              textColor={'#fff'}

            />

            <TextInput
              style={styles.caixaTexto}
              label="Senha"
              mode="outlined"
              onChangeText={setSenha}
              value={senha}
              textColor={'#fff'}
              secureTextEntry={true}
            />

          </View>
          <View style={{ marginTop: 25 }}>
            <Button style={styles.botaoEnviar} mode="contained" onPress={() => logar()}>Logar usuário</Button>
          </View>
          <View style={{ marginTop: 10 }}>
            <Button style={styles.botaoEnviar} mode="contained" onPress={() => navigation.navigate('TelaCriarUsuario')}>Criar nova conta</Button>
          </View>
          <Text />
          <Text />
          <Text />
          <Text />
          <Text />
          <Text />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default TelaLogin

const styles = StyleSheet.create({
  container: {
    marginBottom: 70,
    backgroundColor: '#121212'
  },
  texto: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontStyle: 'bold',


  },
  imagem: {
    alignItems: 'center',
  },
  caixaTexto: {
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#121212',
  },
  botaoEnviar: {
    marginLeft: 80,
    marginRight: 80,
  }
});



