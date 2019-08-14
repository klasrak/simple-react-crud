import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'React CRUD',
      act: 0,
      index: '',
      datas: []
    }
  }

  componentDidMount() {
    this.refs.name.focus()
  }

  fSubmit = (e) => {
    e.preventDefault()
    console.log('Cadastrando')

    let datas = this.state.datas
    let name = this.refs.name.value
    let address = [this.refs.address.value]

    if (this.state.act === 0) {
      let data = {
        name, address
      }
      datas.push(data)
    } else {
      let index = this.state.index
      datas[index].name = name
      datas[index].address = address
    }

    this.setState({
      datas: datas,
      act: 0
    })

    this.refs.myForm.reset()
    this.refs.name.focus()
    console.log(datas)
  }

  fRemove = (i) => {
    let datas = this.state.datas
    datas.splice(i, 1)
    this.setState({
      datas: datas
    })
    this.refs.myForm.reset()
    this.refs.name.focus()
  }

  fEdit = (i) => {
    let data = this.state.datas[i]
    this.refs.name.value = data.name
    this.refs.address.value = data.address

    this.setState({
      act: [i],
      index: [i]
    })
    this.refs.name.focus()
  }

  fAddAddress = (i) => {
    let data = this.state.datas[i]
    let newAddress = this.refs.address.value
    data.address.push(newAddress)
    this.setState({
      act: [i],
      index: [i]
    })
    this.refs.name.focus()
  }

  render() {
    let datas = this.state.datas
    return (
      <div className='App'>
        <h2>{this.state.title}</h2>
        <form ref='myForm' className='myForm' id='box-form-create'>
          <input type='text' ref='name' placeholder='Digite seu nome' className='formField' />
          <input type='text' ref='address' placeholder='Digite seu endereço' className='formField' />
          {/* <input id='addAddressForm' type='text' ref='addAddress' placeholder='Adicionar endereço' className='formField' /> */}
          <button onClick={(e) => this.fSubmit(e)} className='myButton'>Cadastrar</button>
        </form>
        <pre id='clientList'>
          {datas.map((data, i) =>
            <li key={i} className='myList'>
              {i + 1}. {data.name}, {data.address}
              <button onClick={() => this.fRemove(i)} className='myListButton'>Remover</button>
              <button onClick={() => this.fEdit(i)} className='myListButton'>Editar</button>
              <button onClick={() => this.fAddAddress(i)} className='myListButton'>Adicionar endereço</button>
            </li>
          )}
        </pre>
      </div>
    )
  }
}

export default App;
