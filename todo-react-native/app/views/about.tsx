import { StackScreenProps } from '@react-navigation/stack';
import { View, Text, Button } from 'react-native';
import { RootStackParamList } from '../../App';

type AboutProps = StackScreenProps<RootStackParamList, 'About'>;

const About: React.FC<AboutProps> = ({ navigation }) => {
  return (
    <View>
        <Text>About Us</Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, eum officiis. Unde quod non sequi dignissimos obcaecati voluptas eveniet facilis amet corrupti dolor, beatae error porro vitae recusandae? Deserunt, consequatur.
        </Text>
        <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default About;
