import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';

export default function IndexScreen() {

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: 'white', dark: '##000000' }}
      headerImage={
        <Image
          source={require('@/assets/images/ananas_codes.png')}
          style={styles.reactLogo}
        />
      }>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Impressum</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Kontakte</ThemedText>
        <ThemedText>Tim Jaszdziewski</ThemedText>
        <ThemedText type='defaultSemiBold'>Lindenstraße 8</ThemedText>
        <ThemedText type='defaultSemiBold'>23558 Lübeck</ThemedText>
        <ThemedText type='defaultSemiBold'>Telefon: 0451 160 894 30 </ThemedText>
        <ThemedText type='defaultSemiBold'>E-Mail: me@ananas.codes</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Umsatzsteuer</ThemedText>
        <ThemedText type='defaultSemiBold'>Umsatzsteuer-Identifikationsnummer </ThemedText>
        <ThemedText type='defaultSemiBold'>gemäß §27 a Umsatzsteuergesetz: DE318885553</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 220,
    width: 270,
    bottom: 0,

    position: 'absolute',

    left: '50%',
    transform: [{ translateX: -145 }],
  },

});
