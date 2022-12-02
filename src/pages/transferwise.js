import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

import NumberFormat from 'react-number-format';

import logo from '../assets/transferwise.png';

export default function transferwise(props) {
  const [val, setVal] = useState();
  //const [url, setUrl] = useState('');

  useEffect(() => {
    async function get_data() {
      let page =
        'https://api.sandbox.transferwise.tech/v1/quotes?source=BRL&target=CAD&sourceAmount=' +
        props.value +
        '&rateType=FIXED';
      const res = await fetch(page);
      const dt = await res.json();
      setVal(props.value / dt.targetAmount);
    }
    get_data();
  }, [props.refresh, props.value]);

  return (
    <View style={styles.container}>
      <Image source={logo} />
      <NumberFormat
        value={val}
        prefix={'R$'}
        displayType={'text'}
        thousandSeparator={'.'}
        decimalSeparator={','}
        decimalScale={3}
        fixedDecimalScale={true}
        renderText={value => <Text style={styles.valor}>{value}</Text>}
      />
      <Text style={styles.text}> remessa de R$ {props.value} </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'rgb(30,46,73)',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 1,
      height: 5,
    },
    alignItems: 'center',
  },
  text: {
    color: 'rgb(180,180,180)',
  },
  valor: {
    color: 'rgb(220,220,220)',
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 15,
  },
});
