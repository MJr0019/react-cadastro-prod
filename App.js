import React from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

export default class App extends React.Component {

  state = {
    codigo: Number,
    descricao: "",
    preco: Number,
    quantidade: Number,
    inputCodigo: React.createRef(),
    inputDescricao: React.createRef(),
    inputPreco: React.createRef(),
    inputQuantidade: React.createRef(),
    
    lista: [],
  };

  chave = this.state.lista.length;
  
  addItem = this.addItem.bind(this)
  apagarItem = this.apagarItem.bind(this)
  editarItem = this.editarItem.bind(this)
  
  limparCampos(){
    this.state.codigo = '';
    this.state.descricao = '';
    this.state.preco = '';
    this.state.quantidade = '';
    this.state.inputCodigo.current.value = '';
    this.state.inputDescricao.current.value = '';
    this.state.inputPreco.current.value = '';
    this.state.inputQuantidade.current.value = '';
  }

  checarIndice(){
    const indice = this.state.lista.findIndex(
      item => (item.codigo == this.state.codigo)
    );

    if (indice == null) {
      this.indice = 0;
    }
    return indice;
  }

  addItem(){
    if (this.state.codigo == '' || this.state.descricao == '' ||
     this.state.preco == '' || this.state.quantidade == '' ) {return;}
    
    if (this.state.codigo == this.checarIndice()){return;}

    this.state.lista.push({codigo: this.state.codigo, descricao: this.state.descricao, 
    preco: Number(this.state.preco), quantidade: Number(this.state.quantidade)}); 

    this.setState(this.state)
    this.limparCampos();
  }

  apagarItem(){
    if (this.state.codigo != ''){
      const filtroCodigo = this.state.lista.filter(
        item => (item.codigo != this.state.codigo)
      );
      
      this.setState({lista: filtroCodigo});
      this.limparCampos();
    }
  }

  editarItem(){
    if (this.state.codigo != ''){
      const filtroCodigo = this.state.lista.filter(
        item => (item.codigo != this.state.codigo)
      );
        
        this.state.lista[this.checarIndice()].descricao = this.state.descricao;
        this.state.lista[this.checarIndice()].preco = this.state.preco;
        this.state.lista[this.checarIndice()].quantidade = this.state.quantidade;
        this.setState(this.state.lista);
        this.limparCampos();
    }
  }
  

  render(){
    return (
      <View style={styles.container}>
        <View>
          <TextInput
          style = {styles.entrada}
          placeholder = "Código"
          keyboardType="numeric"
          ref = {this.state.inputCodigo}
          onChangeText = {(codigo) => {this.setState({codigo})}} /* Pega o dado digitado no texto */
          />
          <TextInput 
          style = {styles.entrada}
          placeholder = "Descrição"
          ref = {this.state.inputDescricao}
          onChangeText = {(descricao) => {this.setState({descricao})}}
          />
          <TextInput 
          style = {styles.entrada}
          placeholder = "Preço"
          keyboardType = "numeric"
          ref = {this.state.inputPreco}
          onChangeText = {(preco) => {this.setState({preco})}}
          />
          <TextInput 
          style = {styles.entrada}
          placeholder = "Quantidade"
          keyboardType = "numeric"
          ref = {this.state.inputQuantidade}
          onChangeText = {(quantidade) => {this.setState({quantidade})}}
          />
        </View>

        <View style = {styles.divBotao}>
          <TouchableOpacity style = {styles.botao} onPress = {this.addItem}>
            <Text style = {styles.textoBotao}> Adicionar </Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.botao} onPress = {this.apagarItem}>
            <Text style = {styles.textoBotao}> Apagar </Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.botao} onPress = {this.editarItem}>
            <Text style = {styles.textoBotao}> Editar </Text>
          </TouchableOpacity>
        </View>
          <br />
          <br />
        <View>
          <FlatList 
            data = {this.state.lista}
            renderItem = {({item}) => (
              <Text style = {styles.item}> {'Codigo: ' + item.codigo + '\n Descrição: ' + item.descricao + '\n Preço: ' + item.preco + '\n Quantidade: ' + item.quantidade}
                  <br />
                    <div style={{ borderTop: "1px solid black"}}></div>
                  <br />
              </Text>
            )}
          />
          <br />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  entrada: {
    textAlign: 'center',
    fontSize: 20,
    borderWidth: 3,
    borderColor: 'black',
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    marginBottom: 20,
  },
  divBotao: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  botao: {
    borderColor: '#dea506',
    borderWidth: 5,
    borderStyle: 'double',
    backgroundColor: '#dea506',
    borderRadius: 30,
    padding: 10,
    margin: 'auto',
    fontSize: 25,
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
  },
  item: {
    marginBottom: 3, 
    fontSize: 20,
    color: 'gray',
    alignItems: 'center',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  }
});