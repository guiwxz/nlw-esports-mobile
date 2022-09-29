import React from 'react';
import { StatusBar, View } from 'react-native';
import { Background } from './src/components/Background';

import { 
  useFonts, 
  Inter_400Regular, 
  Inter_600SemiBold, 
  Inter_700Bold, 
  Inter_900Black,
} from '@expo-google-fonts/inter'
import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';

import './src/services/notificationConfigs';
import { getPushNotificationToken } from './src/services/getPushNotificationToken';
import { Subscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';


export default function App() {
  
  const [fontsLoaded] = useFonts({
    Inter_400Regular, 
    Inter_600SemiBold, 
    Inter_700Bold, 
    Inter_900Black
  })

  const getNotificationListener = React.useRef<Subscription>();
  const responseNotificationListener = React.useRef<Subscription>();

  React.useEffect(() => {
    getPushNotificationToken();
  })

  React.useEffect(() => {
    getNotificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    })

    responseNotificationListener.current = 
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
        
      })

    return () => {
      if (getNotificationListener.current && responseNotificationListener.current) {
        Notifications.removeNotificationSubscription(getNotificationListener.current);
        Notifications.removeNotificationSubscription(responseNotificationListener.current);
      }
    }

  }, [])
  
  return (
    <Background>
      <StatusBar 
        barStyle={'light-content'}
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}
