import React from 'react'
import Trash from "../../assets/icon/delete_outline-24px.svg"
import Edit from "../../assets/icon/edit-24px.svg"
import { API_URL } from '../../utils/utils.js';
import axios from 'axios'
import './WarehouseList.scss'
import { Link } from "react-router-dom";
import DelModal from "../DelModal/DelModal"
import Chevron from "../../assets/icon/chevron_right-24px.svg";
import { get } from 'lodash';

class WarehouseList extends React.Component {
  
  state = {
    allWarehouses:[],
    show: false,
    warehouseId: null,
    warehouseName: null
  }

  onCloseHandler = () => {
    this.setState({
      show: false
    })
    }
    onTrashHandler = (e) => {
    this.setState({
      show: true,
      warehouseId: e.target.id,
      warehouseName: e.target.name
    })
    }
    onDeleteHandler = (itemid) => {
    axios
      .delete(`${API_URL}/warehouses/${itemid}/warehouse`)
      .then((response) => {
      this.setState({
        allWarehouses: response.data,
        show: false
  
      });
      })
      .catch((err) => console.log("error!", err))
    }

  componentDidMount() {
    axios.get(`${API_URL}/warehouses`)
    .then(res => {
      this.setState({
        allWarehouses: res.data,
      })
    })
    .catch(err => {
      console.log("uh oh!", err)
    })
  }

  render() {
    return(
    <>
    {this.state.allWarehouses.map (warehouse => {
      return (
        <div key = {warehouse.id} className="warehouse__information">
          <div className="warehouse__information-data">
            <div className="warehouse__information-top">
              <div className="warehouse__information-location">
                <h4 className="warehouse__subheader">WAREHOUSE</h4>
                <Link onClick = {() => {this.props.onChangeHandler(warehouse)}} to = {`warehouses/${warehouse.id}`} className="warehouse__location"><p>{warehouse.name}</p><img
                        className="warehouse__chevron"
                        src={Chevron}
                        alt="trashcan"
                      /></Link> 
              </div>
              <div className="warehouse__information-address">
                <h4 className="warehouse__subheader">ADDRESS</h4>
                <p className="warehouse__address-details">{warehouse.address}, {warehouse.city}, {warehouse.country}</p>
              </div>
            </div>
            <div className="warehouse__information-bottom">
              <div className="warehouse__information-contact">
                <h4 className="warehouse__subheader">CONTACT NAME</h4>
                <p className="warehouse__contact-name">{`${get(warehouse, "contact.name")}`}</p>
              </div>
              <div className="warehouse__information-contact-information">
                <h4 className="warehouse__subheader">CONTACT INFORMATION</h4>
                <p className="warehouse__contact-number">{`${get(warehouse, "contact.phone")}`}</p>
                <p className="warehouse__contact-email">{`${get(warehouse, "contact.email")}`}</p>
              </div>
            </div>
          </div>
          <div className="warehouse__actions">
            <img name = {warehouse.name} id = {warehouse.id}  onClick={this.onTrashHandler} className ="warehouse__actions-trash" src={Trash} alt="trashcan"/>
            <Link  to = {`warehouses/${warehouse.id}/edit`}>
            <img className ="warehouse__actions-edit"src={Edit} alt="edit"/>
             </Link>
          </div>
        </div> 
      )
    })}
     <DelModal show = {this.state.show} onCloseHandler={this.onCloseHandler} onTrashHandler={this.onTrashHandler}
    onDeleteHandler={this.onDeleteHandler} itemId = {this.state.warehouseId} name = "Warehouse" itemName = {this.state.warehouseName}/>
    </>
    )
  }
}

export default WarehouseList;