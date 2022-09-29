import React from 'react';
import { Modal, View, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import * as ClipBoard from 'expo-clipboard'

import { styles } from './styles';
import { THEME } from '../../theme';
import { CheckCircle } from 'phosphor-react-native';
import { Heading  } from '../Heading';

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {

  const [isCopping, setIsCopping] = React.useState(false);

  const handleCopyDiscordToClipboard = async () => {
    setIsCopping(true);
    await ClipBoard.setStringAsync(discord);

    Alert.alert('Discord copiado!')
    setIsCopping(false)
  }

  return (
    <Modal {...rest} transparent statusBarTranslucent animationType='fade'>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons 
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>

          <CheckCircle 
            size={64}
            color={THEME.COLORS.SUCCESS}
            weight='bold'
          />

          <Heading 
            title="Let's Play!"
            subtitle="Agora é só começar a jogar!"
            style={{ alignItems: 'center', marginTop: 24 }}
          />

          <Text style={styles.label}>
            Adicione no Discord
          </Text>

          <TouchableOpacity 
            style={styles.discordButton} 
            onPress={handleCopyDiscordToClipboard}
            disabled={isCopping}
          >
            <Text style={styles.discord}>
              {isCopping ? <ActivityIndicator /> : discord}
            </Text>
          </TouchableOpacity>

        </View>

      </View>
    </Modal>
  );
}