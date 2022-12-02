import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, Text, ScrollView, RefreshControl, View} from 'react-native';

import NumberFormat from 'react-number-format';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import TransferWise from './src/pages/transferwise';
import RemessaOnline from './src/pages/remessaonline';

export default function App() {
  const [cadVal, setCadVal] = useState('-');
  const [cadValAnt, setCadValAnt] = useState('-');
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState('****-**-** **:**:**');

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    get_cad().then(() => setRefreshing(false));
  }, []);

  async function get_cad() {
    const res = await fetch(
      'https://economia.awesomeapi.com.br/json/list/CAD-BRL/2',
    );
    const dt = await res.json();
    setData(dt[0].create_date);
    setCadVal(dt[0].bid);
    setCadValAnt(dt[1].bid);
  }
  useEffect(() => {
    get_cad();
  });

  return (
    <ScrollView
      style={styles.content}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Text style={styles.title}>CAD $</Text>
      <View style={styles.valores}>
        <NumberFormat
          value={cadValAnt / 1}
          prefix={'R$'}
          displayType={'text'}
          thousandSeparator={'.'}
          decimalSeparator={','}
          decimalScale={3}
          fixedDecimalScale={true}
          renderText={value => (
            <Text style={styles.valorAnterior}>{value}</Text>
          )}
        />
        <NumberFormat
          value={cadVal / 1}
          prefix={'R$'}
          displayType={'text'}
          thousandSeparator={'.'}
          decimalSeparator={','}
          decimalScale={3}
          fixedDecimalScale={true}
          renderText={value => <Text style={styles.valor}>{value}</Text>}
        />
        {cadValAnt < cadVal ? (
          <Text style={styles.subiu}>▲</Text>
        ) : (
          <Text style={styles.desceu}>▼</Text>
        )}
      </View>
      <Text style={styles.date}>{data}</Text>
      <TransferWise refresh={refreshing} value={3000} />
      <RemessaOnline refresh={refreshing} value={3000} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: Colors.lighter,
    paddingTop: 25,
    paddingBottom: 25,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 70,
    color: 'rgb(190, 40, 40)',
    alignSelf: 'center',
  },
  valores: {
    flexDirection: 'row',
    flex: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  valorAnterior: {
    fontSize: 20,
    color: 'rgb(210, 210, 210)',
  },
  valor: {
    paddingBottom: 10,
    fontSize: 50,
    color: 'rgb(100, 200, 60)',
  },
  subiu: {
    fontSize: 65,
    color: 'rgb(250, 0, 0)',
  },
  desceu: {
    fontSize: 80,
    color: 'rgb(0, 250, 0)',
  },
  date: {
    alignSelf: 'center',
  },
  button: {
    padding: 15,
    backgroundColor: 'rgb(190, 40, 40)',
    borderRadius: 15,
    margin: 30,
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.lighter,
    alignSelf: 'center',
  },
});
