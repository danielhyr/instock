import HeroHeader from "./components/HeroHeader/HeroHeader";
import Inventory from "./components/Inventory/Inventory";
import Warehouses from "./components/Warehouses/Warehouses";
import InventoryItemDetails from "./components/InventoryItemDetails/InventoryItemDetails";
import WarehouseDetails from "./components/WarehouseDetails/WarehouseDetails";
import EditWarehouse from "./components/EditWarehouse/EditWarehouse";
import HeroFooter from "./components/HeroFooter/HeroFooter";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddItem from './components/AddItem/AddItem'
import EditItem from './components/EditItem/EditItem'
import AddWarehouse from './components/AddWarehouse/AddWarehouse'
import React from "react";
import "./App.scss";


class App extends React.Component {

  state = {
    data: null,
    itemdata: null
  }


  onChangeHandler = (data) => {
      this.setState({
      data: data
      }) 
  }

  onChangeHandlerItem = (data) => {
    this.setState({
    itemdata: data
    }) 
}

  render() {
    return (
      <BrowserRouter>
        <HeroHeader />
        <Switch>

          <Route exact path="/warehouses" render = {(props) => <Warehouses {...props} data = {this.state.data}onChangeHandler = {this.onChangeHandler}/>} />

          <Route exact path="/inventory" render = {(props) => <Inventory {...props} onChangeHandler = {this.onChangeHandlerItem}/>} />

          <Route exact path="/" component={Warehouses} />

          <Route exact path="/warehouses/add" component={AddWarehouse} />

          <Route exact path="/warehouses/:id" render={(props) => <WarehouseDetails {...props} data = {this.state.data} onChangeHandler = {this.onChangeHandlerItem}/>} >

          </Route>
          <Route exact path="/inventory/add" component={AddItem} />
         

       
          <Route exact path="/inventory/edit/:id" render={(props) => <EditItem {...props} onChangeHandler = {this.onChangeHandlerItem}/>} />

          <Route exact path="/warehouses/:id/edit" render={(props) => <EditWarehouse {...props} onChangeHandler = {this.onChangeHandler}/>} />
          {/* <Route path='/inventory/:id' render={(props) => <InventoryItemDetails {...props} />} /> */}

          <Route path='/inventory/:id' render={(props) => <InventoryItemDetails {...props} datas = {this.state.itemdata}/>} ></Route>

        </Switch>
        <HeroFooter />
      </BrowserRouter>
    );
  }
}

export default App;

