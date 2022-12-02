import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

import NumberFormat from 'react-number-format';
import cheerio from 'react-native-cheerio';

import logo from '../assets/remessaonline.png';

export default function transferwise(props) {
  const web_ref = 'https://apibsa.herokuapp.com/remessaonline';
  const [val, setVal] = useState();
  const [tarifa, setTarifa] = useState(0);
  const [newVal, setNewVal] = useState(0);

  async function get_val() {
    const res = await fetch(web_ref);
    const dt = await res.json();
    setVal(parseFloat(dt.value));
  }

  useEffect(() => {
    get_val();
    props.value > 2500 ? setTarifa(0) : setTarifa(5.9);
    const custo = 13;
    const iof = 11;
    setNewVal(props.value / ((props.value - tarifa - custo - iof) / val));
  }, [props.refresh, props.value, tarifa, val]);
  return (
    <View style={styles.container}>
      <Image source={logo} />
      <NumberFormat
        value={newVal / 1}
        prefix={'R$'}
        displayType={'text'}
        thousandSeparator={'.'}
        decimalSeparator={','}
        decimalScale={3}
        fixedDecimalScale={true}
        renderText={value => <Text style={styles.valor}>{value}</Text>}
      />
      <Text style={styles.text}>R$ {props.value}, mesmo fav.</Text>
      <Text style={styles.text}>(IOF-1.1%/CB-1.3%/Tx-R${tarifa})</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'rgb(0,116,192)',
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
