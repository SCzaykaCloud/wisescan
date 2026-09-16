import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProtocolScreen = () => {
  const [barcodeList, setBarcodeList] = useState<{ type: string; data: string; timestamp: string; id: string }[]>([]);
  const [apiKey, setApiKey] = useState<string>('');
  const [loading, setLoading] = useState(false);


  // Lade gespeicherte Barcodes aus AsyncStorage
  useEffect(() => {
    const loadBarcodeList = async () => {
      try {
        const storedBarcodes = await AsyncStorage.getItem('barcodeList');
        if (storedBarcodes !== null) {
          setBarcodeList(JSON.parse(storedBarcodes));
        }
      } catch (error) {
        Alert.alert('Fehler', 'Fehler beim Laden der gespeicherten Barcodes.');
      }
    };
    loadBarcodeList();
  }, []);

  //Ladet Api 
  useEffect(() => {
    const loadConfig = async () =>{
      try{
      const apiKey = await AsyncStorage.getItem('configApi');
      if (apiKey !== null) setApiKey(apiKey);
      }catch(error){
        Alert.alert('Fehler', 'Fehler beim Laden der gespeicherten Konfiguration');
      }
    };
    loadConfig();
  },[]);

  // Lösche einen Barcode aus der Liste,AsyncStorage und Datenbank
  const handleDelete = async (id: string) => {
    setLoading(true);
    try {

      const response = await fetch(`http://wisescan.ananas.codes/?apiKey=${apiKey}&resource=maintenance&objectID=${id}}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },  
    });
    console.log(response);
    if(!response.ok)
    {
      throw Error('Fehler beim Löschen des Barcodes');
    }
    const newList = barcodeList.filter(barcode => barcode.id !== id);
    setBarcodeList(newList);

    await AsyncStorage.setItem('barcodeList', JSON.stringify(newList));
    } catch (error) {
      Alert.alert('Fehler Löschen fehlgeschlagen');
      console.error('Fehler beim API-Aufruf:', error);
    }finally{
      setLoading(false);
    }
  }

  // Bestätigungsdialog für das Löschen
  const confirmDelete = (id: string) => {
    Alert.alert(
      'Löschen bestätigen',
      'Möchtest du diesen Barcode wirklich löschen?',
      [
        { text: 'Abbrechen', style: 'cancel' },
        { text: 'Löschen', onPress: () => handleDelete(id) },
      ]
    );
  };

  // Rendert die einzelnen Barcodes in der Liste
  const renderBarcode = ({ item, index }: { item: { type: string; data: string; timestamp: string; id: string }; index: number }) => (
    <View style={styles.barcodeContainer}>
      <Text style={styles.itemTitle}>Protokoll {index + 1}:</Text>
      <Text>ID: {item.id}</Text>
      <Text>Typ: {item.type}</Text>
      <Text>Daten: {item.data}</Text>
      <Text>Zeitstempel: { new Date(item.timestamp).toLocaleString()}</Text>
      <Button title="Löschen" onPress={() => confirmDelete(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Protokollseite</Text>
      <Text style={styles.subtitle}>Gesamtzahl gescannter Barcodes: {barcodeList.length}</Text>
      {barcodeList.length > 0 ? (
        <FlatList
          data={barcodeList}
          keyExtractor={item => item.id}
          renderItem={renderBarcode}
        />
      ) : (
        <Text>Keine gescannten Barcodes vorhanden.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
  },
  barcodeContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProtocolScreen;
