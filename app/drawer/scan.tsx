import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, Modal, StyleSheet, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarCodeScanner } from 'expo-barcode-scanner';

const ScanScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [barcodeData, setBarcodeData] = useState<{ type: string; data: string; timestamp: string } | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [configWorkerIdentifier, setStoredWorkerIdentifier] = useState('');
  const [barcodeList, setBarcodeList] = useState<Array<{ id: string; type: string; data: string; timestamp: string }>>([]);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const workerIdentifier = await AsyncStorage.getItem('configWorkerIdentifier');
        const apiKey = await AsyncStorage.getItem('configApi');
        const storedBarcodeList = await AsyncStorage.getItem('barcodeList');

        if (workerIdentifier !== null) setStoredWorkerIdentifier(workerIdentifier);
        if (apiKey !== null) setApiKey(apiKey);
        if (storedBarcodeList !== null) setBarcodeList(JSON.parse(storedBarcodeList));
      } catch (error) {
        Alert.alert('Fehler', 'Fehler beim Laden der gespeicherten Konfiguration');
      }
    };
    loadConfig();
  }, []);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    const timestamp = new Date().toISOString();
    setBarcodeData({ type, data, timestamp });
  };

  const handleObjectInTheDatabase = async (data :string)=>{

     return true; 
  }

  const handleScan = async () => {
   
    try {
      if (barcodeData !== null) { 
        if(await handleObjectInTheDatabase(barcodeData.data)){
        const response = await fetch(`http://wisescan.ananas.codes/?apiKey=${apiKey}&resource=maintenance&workerIdentifier=${configWorkerIdentifier}&timestamp=${barcodeData.timestamp}&objectIdentifierType=${barcodeData.type}&objectIdentifier=${barcodeData.data}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({ barcodeData }),
        });

        const responseText = await response.text();
        const result = JSON.parse(responseText);
        Alert.alert('Erfolg', responseText);

        const { id } = result; 

        const barcodeWithId = {
          ...barcodeData,  
          id,              
        };

        const newList = [...barcodeList, barcodeWithId];
        setBarcodeList(newList);

        await AsyncStorage.setItem('barcodeList', JSON.stringify(newList));

        setBarcodeData(null);  }
      } else {
        Alert.alert('Fehler', 'Kein gültiger Barcode gescannt');
      }
    } catch (error) {
      console.error('Fehler beim API-Aufruf:', error);
      Alert.alert('Fehler', 'Scan fehlgeschlagen.');
    } finally {
      setScanned(false);
    }
  };

  const handleScanAgain = async () =>{
    setBarcodeData(null);
    setScanned(false);
  }

//Kamera zugriff
  if (hasPermission === null) {
    return <Text>Ermittle Berechtigungen...</Text>;
  }

  if (hasPermission === false) {
    return <Text>Keine Berechtigung für Kamerazugriff!</Text>;
  }
//Aussehen
  return (
    <View style={styles.container}>
      <BarCodeScanner
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />

      {barcodeData && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={!!barcodeData}
          onRequestClose={() => setBarcodeData(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Barcode gescannt:</Text> 
              <Text>{barcodeData.data} 
              </Text>
              <Text> um { new Date(barcodeData.timestamp).toLocaleString()} </Text>
              <View style={styles.buttonContainer}>
                <Button title="Speichern" onPress={handleScan} />
                <Button title="Nochmal scannen" onPress={() => handleScanAgain} />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    minHeight: 350,
    width: 400,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  Button:{
    borderRadius: 10,
    backgroundColor: 'green',
  }
});

export default ScanScreen;
