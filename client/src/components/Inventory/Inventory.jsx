import "./Inventory.scss";
import DelModal from "../DelModal/DelModal"
import search from "../../assets/icons/search-24px.svg";
import Trash from "../../assets/icon/delete_outline-24px.svg";
import Edit from "../../assets/icon/edit-24px.svg";
import Chevron from "../../assets/icon/chevron_right-24px.svg";
import Sort from "../../assets/icon/sort-24px.svg"
import React from "react";
import axios from "axios"; 
import { Link } from "react-router-dom";

import { API_URL } from "../../utils/utils";

class Inventory extends React.Component {
  state = {
    inventory: null,
    loaded: false,
    show: false,
    itemId: null,
    itemName: null
  };
    clickHandler = (id) => {
      this.props.history.push(`/inventory/edit/${id}`)
    }
    addHandler = (e) => {
      e.preventDefault()
      this.props.history.push(`/inventory/add`)
    }
    onCloseHandler = () => {
      this.setState({
        show: false
      })
    }
    onTrashHandler = (e) => {
      this.setState({
        show: true,
        itemId: e.target.id,
        itemName: e.target.name
      })

  }
  onDeleteHandler = (itemid) => {
    axios
    .delete(`${API_URL}/inventory/${itemid}/item`)
    .then((response) => {
      this.setState({
      inventory: response.data,
      loaded: true,
      show: false
      });
    })
    .catch((err) => console.log("error!", err))
  }
  componentDidMount() {
    axios
    .get(`${API_URL}/inventory`)
    .then((response) => {
      this.setState({
      inventory: response.data,
      loaded: true,
      });
    })
    .catch((err) => console.log("error!", err));
  }
  render ( ) {
    let stockDecide
    if (this.state.loaded === false) {
    return <main className="load-screen">Loading...</main>;
    }
  return (
  <section className="inventory">
    <div className="inventory__nav">
    <h1 className="inventory__title">Inventory</h1>
    <form className="inventory__form">
      <label className="inventory__form-label" htmlFor="text"></label>
      <input
      className="inventory__form-search"
      placeholder="Search..."
      name="text"
      />
      <img
      className="inventory__form-search-icon"
      src={search}
      alt="search-icon"
      />
          <button onClick = {this.addHandler} className="inventory__button" type="submit">
      <h3 className="inventory__button-text">+ Add New Item</h3>
    </button>
    </form>
    </div>
    <ul className="inventory-topbar">
      <li className="inventory-topbar__inventory">INVENTORY ITEM<img className="inventory-topbar__sort"src = {Sort} alt="up arrow and down arrow"/></li>
      <li className="inventory-topbar__category">CATEGORY <img className="inventory-topbar__sort"src = {Sort} alt="up arrow and down arrow"/></li>
      <li className="inventory-topbar__status">STATUS <img className="inventory-topbar__sort"src = {Sort} alt="up arrow and down arrow"/></li>
      <li className="inventory-topbar__qty"> QTY <img className=" inventory-topbar__sort"src = {Sort} alt="up arrow and down arrow"/></li>
      <li className="inventory-topbar__warehouse">WAREHOUSE <img className="inventory-topbar__sort"src = {Sort} alt="up arrow and down arrow"/></li>
      <li className="inventory-topbar__actions">ACTIONS <img className="inventory-topbar__sort"src = {Sort} alt="up arrow and down arrow"/></li>
      </ul>
      {this.state.inventory.map((item) => {
        if(item.status === "Out of Stock") {
            stockDecide = "inventory__warehouse-status inventory__warehouse-status--outstock"
        } else {
            stockDecide = "inventory__warehouse-status inventory__warehouse-status--instock"
        }
        return (
          <div key = {item.id}>
            <div className="inventory__information">
              <div className="inventory__information-data">
                <div className="inventory__information-top">
                  <div className="inventory__information-item">
                    <h4 className="inventory__subheader">INVENTORY ITEM</h4>
                    <Link onClick = {() => {this.props.onChangeHandler(item)}}to = {`inventory/${item.id}`} className="inventory__itemname"><p>{item.itemName}</p>     <img
                        className="inventory__chevron"
                        src={Chevron}
                        alt="trashcan"
                      /></Link> 
                  </div>
                  <div className="inventory__information-category">
                    <h4 className="inventory__subheader">CATEGORY</h4>
                    <p className="inventory__category-details">
                      {item.category}
                    </p>
                  </div>
                </div>
                <div className="inventory__information-bottom">
                  <div className="inventory__information-status">
                    <h4 className="inventory__subheader">STATUS</h4>
                    <p className={stockDecide} > {item.status}</p>
                  </div>
                  <div className="inventory__information-quantity-information">
                    <h4 className="inventory__subheader">
                      QTY
                    </h4>
                    <p className="inventory__warehouse-info">{item.quantity}</p>
                  </div>
                  <div className="inventory__information-warehouse-information">
                    <h4 className="inventory__subheader">WAREHOUSE</h4>
                    <p className="inventory__warehouse-info">{item.warehouseName}</p>
                  </div>
                </div>
              </div>
              <div className="inventory__actions">
                <img
                 id = {item.id}
                 name = {item.itemName}
                  className="inventory__action-trash"
                  src={Trash}
                  alt="trashcan"
                  onClick = {this.onTrashHandler}
                />
                <img
                  className="inventory__action-edit"
                  src={Edit}
                  alt="editing pencil"
                  onClick={() => this.clickHandler(item.id)}
                />
              </div>
            </div>
          </div>
    );
    })}
    <DelModal show = {this.state.show} onCloseHandler={this.onCloseHandler} onTrashHandler={this.onTrashHandler}
    onDeleteHandler={this.onDeleteHandler} itemId = {this.state.itemId} name = "Inventory" itemName = {this.state.itemName}/>
  </section>
  );}
};
export default Inventory;