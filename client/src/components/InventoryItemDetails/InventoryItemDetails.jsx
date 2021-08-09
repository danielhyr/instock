import React, { Component } from "react";
import { API_URL } from "../../utils/utils";
import Edit from "../../assets/icon/edit-24px.svg";
import Back from "../../assets/icon/arrow_back-24px.svg";
import axios from "axios";
import "./InventoryItemDetails.scss";
import { Link } from "react-router-dom";

class InventoryItemDetails extends Component {
    state = {
        item: {},
    };

    clickHandler = (id) => {
        this.props.history.push(`/inventory/edit/${id}`)
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
            .get(`${API_URL}/inventory/${this.props.match.params.id}`)
            .then((response) => {
                this.setState({
                    item: response.data,
                });
            })
            .catch((err) => console.log("error!", err));
    }

    componentDidUpdate(prevProps, prevState) {
    
        const prevItem = prevState.item
        if (this.props.datas !== this.state.item && this.props.datas !== null  ) {
            this.setState({
              item: this.props.datas
            })
          } 
  
    }

    render() {
        let stockDecide
        const { item } = this.state;
        if(item.status === "Out of Stock") {
            stockDecide = "itemDetails-status itemDetails-status--outstock"
        } else {
            stockDecide = "itemDetails-status itemDetails-status--instock"
        }
        return (
            <div className='itemDetails'>
                <div className='itemDetails__header'>
                <Link to="/inventory" className='itemDetails__header--back'>
                    <img src={Back} alt="back" />
                    </Link>
                    <h1 className='itemDetails__header--name'>
                        {item.itemName}
                    </h1>
                    <img
                        className='itemDetails__header--edit'
                        src={Edit}
                        alt='edit'
                        onClick={() => this.clickHandler(item.id)}
                    />
                </div>
                <div className='itemDetails__info'>
                    <div className='itemDetails__info--first-half'>
                        <h3 className='itemDetails__info--header'>
                            ITEM DESCRIPTION
                        </h3>
                        <p className='itemDetails__info--text'>
                            {item.description}
                        </p>
                        <h3 className='itemDetails__info--header'>CATEGORY</h3>
                        <p className='itemDetails__info--text'>
                            {item.category}
                        </p>
                    </div>
                    <div className='itemDetails__info--second-half'>
                        <div className='itemDetails__stock-container'>
                            <div class='itemDetails__status'>
                                <h3 className='itemDetails__info--header'>
                                    STATUS
                                </h3>
                                <p className={stockDecide}>
                                    {item.status}
                                </p>
                            </div>
                            <div className='itemDetails__quantity'>
                                <h3 className='itemDetails__info--header'>
                                    QUANTITY
                                </h3>
                                <p className='itemDetails__info--text'>
                                    {item.quantity}
                                </p>
                            </div>
                        </div>
                        <h3 className='itemDetails__info--header'>WAREHOUSE</h3>
                        <p className='itemDetails__info--text'>
                            {item.warehouseName}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default InventoryItemDetails;

