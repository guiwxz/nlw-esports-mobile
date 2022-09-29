import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { useRoute, useNavigation } from '@react-navigation/native'

import { styles } from './styles';
import { GameParams } from '../../@types/navigation';
import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons'
import { THEME } from '../../theme';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';

export function Game() {
  const [ads, setAds] = React.useState<DuoCardProps[]>([])
  const [discordSelected, setDiscordSelected] = React.useState('');

  const route = useRoute();
  const navigation = useNavigation();

  const game = route.params as GameParams;
  
  const handleGoBack = () => {
    navigation.goBack();
  }

  React.useEffect(() => {
    fetch(`http://192.168.0.106:3333/games/${game.id}/ads`)
      .then(res => res.json())
      .then(data => setAds(data));
  }, [])

  const getDiscordUser = async (adsId: string) => {
    fetch(`http://192.168.0.106:3333/ads/${adsId}/discord`)
      .then(res => res.json())
      .then(data => setDiscordSelected(data.discord))
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo 
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image 
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right} />
        </View>

        <Image 
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading
          title={game.title}
          subtitle="Conecte-se e comece a jogar!"
        />

        <FlatList 
          data={ads}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return <DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />
          }}
          horizontal
          contentContainerStyle={styles.contentList}
          style={styles.containerList}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyList}>
              Não há anúncios publicados para este jogo.
            </Text>
          )}
        />
        <DuoMatch 
          visible={discordSelected.length > 0}
          discord={discordSelected}
          onClose={() => setDiscordSelected('')}
        />
      </SafeAreaView>
    </Background>
  );
}