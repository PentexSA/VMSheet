import React, {useState} from 'react';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import withObservables from '@nozbe/with-observables';
import {Text, View} from 'react-native';
import {IWeight, weightRepository} from './db/repositories/weight';
import {ISheet, sheetRepository} from './db/repositories/sheet';

import {TouchableOpacity, TextInput} from 'react-native-gesture-handler';

function HomeScreen() {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [weight, setWeight] = useState<string>('');
  const [note, setNote] = useState<string>('');

  const handleSavePress = async () => {
    setIsSaving(true);
    await weightRepository.save({weight, note});
    // hide modal
    await sheetRepository.save({
      name: 'Don Felipe',
      sheet: {
        beast: {
          fields: {
            title: 'Humanidade/Trilha',
            levels: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
          },
          will: {
            title: 'Humanidade/Trilha',
            levels: [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
          },
          blood: {
            title: 'Humanidade/Trilha',
            levels: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
          health: {
            title: 'Humanidade/Trilha',
            labels: [
              'Escoriado',
              'Machucado',
              'Ferido',
              'Ferido gravemente',
              'Espancado',
              'Aleijado',
              'Incapacitado',
            ],
            numberLabels: [0, -1, -1, -2, -2, -5, 0],
            levels: [0, 0, 0, 0, 0, 0, 0],
          },
        },
      },
    });
    // Clear out the inputs
    setWeight('');
    setNote('');
    // Make button active again
    setIsSaving(false);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {!isSaving && (
        <>
          <Text>Add your weight</Text>

          <TextInput
            placeholder="Your weight"
            keyboardType="decimal-pad"
            onChangeText={text => setWeight(text)}
            value={weight}
          />
          <TextInput
            placeholder="Additional note (optional)"
            onChangeText={text => setNote(text)}
            value={note}
          />
          <TouchableOpacity onPress={handleSavePress}>
            <Text>Save</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

function SettingsScreen({
  weights,
  sheets,
}: {
  weights: IWeight[];
  sheets: ISheet[];
}): JSX.Element {
  const a = async () => {
    const b = await sheetRepository.sheets.query().fetch();
    b.map(s => {
      console.log(s.name);
    });

    return b;
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
      {sheets.map(d => console.log(d))}
      {weights.map(a => console.log(a))}
      {console.log(a())}
    </View>
  );
}

const enhanceWithWeights = withObservables([], () => ({
  weights: weightRepository.observeWeights(),
  sheets: sheetRepository.observeSheets(),
}));

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen
          name="Settings"
          component={enhanceWithWeights(SettingsScreen)}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
