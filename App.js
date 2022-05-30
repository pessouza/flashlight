import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = () => {
  //para podermos mudar nossa tela, devemos importar o useState, dentro de um array teremos o nome da variável e a função set
  const [toggle, setToggle] = useState(false);
  // esta constante é uma função que muda o estado do toggle
  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    // Liga flash do celular
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    //Usando toggle quando chacoalhar
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle);
    });

    // Essa função vai ser chamada quando o componete For ser desmontado
    return () => subscription.remove();
  }, []);
//touchableOpacity nos permite pressionar algum elemento, dando um efeito de opacidade
  return (
    <View style={toggle ? style.containerLight : style.container}>
      <TouchableOpacity onPress={handleChangeToggle}>
        <Image
          style={toggle ? style.lightingOn : style.lightingOff}
          source={
            toggle
              ? require('./assets/icons/incandescent-light-bulb.png')
              : require('./assets/icons/incandescent-light-bulb.png')
          }
        />
        <Image
          style={style.olho}
          source={
            toggle
              ? require('./assets/icons/aberto.png')
              : require('./assets/icons/fechado.png')
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  //definição dos estilos da light bulb: suas dimensões, alinhamento e etc.

  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 300,
    height: 300,
  },
  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 300,
    height: 300,
  },

  //definição do ícone do olho
  olho: {
    marginTop:200,
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 50,
    height: 50,
  },
});