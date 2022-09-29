import React from 'react';
import { View, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import logoImg from '../../assets/logo-nlw-esports.png';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { styles } from './styles';

import { Background } from '../../components/Background';
import { useNavigation } from '@react-navigation/native'

export function Home() {
  const [games, setGames] = React.useState<GameCardProps[]>([]);

  const navigation = useNavigation();

  const handleOpenGame = ({ id, title, bannerUrl }: any) => {
    navigation.navigate('game', { id, title, bannerUrl })
  }

  React.useEffect(() => {
    fetch('http://192.168.0.106:3333/games')
      .then(res => res.json())
      .then(data => setGames(data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image 
          source={logoImg}
          style={styles.logo}
        />

        <Heading 
          title="Encontre seu duo!"
          subtitle='Selecione o game que deseja jogar...'
        />

        <FlatList 
          data={games}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <GameCard 
              data={item}
              onPress={() => handleOpenGame(item)}
            />
          )}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}