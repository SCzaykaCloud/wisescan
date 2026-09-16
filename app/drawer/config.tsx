import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConfigScreen = () => {
  const [configWorkerIdentifier, setConfigWorkerIdentifier] = useState('');
  const [storedWorkerIdentifier, setStoredWorkerIdentifier] = useState('');
  const [configApi, setConfigApi] = useState('');
  const [storedApi, setStoredApi] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const correctPassword = 'HooT'; // Vermeide hardcodierte Passwörter in der Produktion

  useEffect(() => {
    const loadStoredConfig = async () => {
      try {
        const workerIdentifier = await AsyncStorage.getItem('configWorkerIdentifier');
        const apiKey = await AsyncStorage.getItem('configApi');
        if (workerIdentifier !== null) setStoredWorkerIdentifier(workerIdentifier);
        if (apiKey !== null) setStoredApi(apiKey);
      } catch (error) {
        Alert.alert('Fehler', 'Fehler beim Laden der gespeicherten Konfiguration');
      }
    };

    loadStoredConfig();
  }, []);

  const saveConfig = async () => {
    try {
      await AsyncStorage.setItem('configWorkerIdentifier', configWorkerIdentifier);
      await AsyncStorage.setItem('configApi', configApi);
      setStoredWorkerIdentifier(configWorkerIdentifier);
      setStoredApi(configApi);
      Alert.alert('Erfolg', 'Konfiguration gespeichert!');
    } catch (error) {
      Alert.alert('Fehler', 'Fehler beim Speichern der Konfiguration');
    }
  };

  const handleLogin = () => {
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      Alert.alert('Fehler', 'Falsches Passwort');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      {isAuthenticated ? (
        <>
          <Text>Gespeicherte Kennung: {storedWorkerIdentifier}</Text>
          <TextInput
            placeholder="Neue Konfiguration eingeben"
            value={configWorkerIdentifier}
            onChangeText={setConfigWorkerIdentifier}
            style={{ borderBottomWidth: 1, marginBottom: 20 }}
          />
          <Text>Gespeicherter API-Key: {storedApi}</Text>
          <TextInput
            placeholder="Neuen API-Key eingeben"
            value={configApi}
            onChangeText={setConfigApi}
            style={{ borderBottomWidth: 1, marginBottom: 20 }}
          />
          <Button title="Speichern" onPress={saveConfig} />
        </>
      ) : (
        <>
          <TextInput
            placeholder="Passwort eingeben"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{ borderBottomWidth: 1, marginBottom: 20 }}
          />
          <Button title="Login" onPress={handleLogin} />
        </>
      )}
    </View>
  );
};

export default ConfigScreen;
