import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import { supabase } from './conexaoSupabase';

export default function App() {
  const [nomeDigitado, setNomeDigitado] = useState("");
  const [valorDigitado, setValorDigitado] = useState("");
  const [quantidadeDigitada, setQuantidadeDigitado] = useState("");
  const [dados, setDados] = useState([]);


  // função para consultar os dados no Banco de Dados
  const consultarDados  = async() =>{
    const{data, error} = await supabase.from('tb_lista_compras').select('*')

    if(error){
        alert('Falha ao consultar os dados!')
    }else{
        setDados(data);

    }
  }


  // Criar uma função para inserir no Banco de dados
  const cadastrarConta = async(desc, vl, qtd)=>{
    if(desc == '' || vl ==  '' || qtd == '' ){
        alert('Preeencha todos os campos')
    }else{

      const {error} = await supabase.from("tb_lista_compras")
      .insert({coluna_produto: desc, coluna_valor: vl, coluna_quantidade: qtd});

      if(error){
        alert("Falha ao cadastrar!")
      }else{
        alert("Cadastrado com sucesso!")
        consultarDados()
      }
  }

  }
  
  useEffect(() => {
    consultarDados();
  }, []);



  return (
    <View style={styles.container}>
      
      <Text style={{fontSize: 35, fontWeight: 700}}>Mercado</Text>
      <TextInput
        style={styles.caixaDeTexto}
        placeholder='Nome do produto'
        onChangeText={(texto)=>setNomeDigitado(texto)}
      />
      <TextInput
        style={styles.caixaDeTexto}
        placeholder='Valor do produto'
        onChangeText={(texto)=>setValorDigitado(texto)}
      />

        <TextInput
        style={styles.caixaDeTexto}
        placeholder='Quantidade do produto'
        onChangeText={(texto)=>setQuantidadeDigitado(texto)}
      />
      <Button
        title="Cadastrar"
        onPress={()=>{cadastrarConta(nomeDigitado, valorDigitado, quantidadeDigitada)}}
      />
      <ScrollView style={{width: "100%"}}>
        
          {dados.map((item)=>(
          <View style={styles.caixaContas}>
            <Text>Produto: {item.coluna_produto}</Text>
            <Text>Valor: R$ {item.coluna_valor}</Text>
            <Text>Quantidade: {item.coluna_quantidade}</Text>

          </View> 
          ))}
      </ScrollView>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  caixaDeTexto:{
    borderWidth: 1,
    width: "90%",
    padding: 10,
    margin: 15,
    borderRadius: 5
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 50
  },
  caixaContas:{
    width: '90%',
    minHeight: 70,
    borderWidth: 1,
    borderCoor: '#b2b2b2',
    droderRadius: 8,
    margin: 30,
    padding: 10


  }
});