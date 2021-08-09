import React, { Component } from 'react';
import Back from '../../assets/icons/arrow_back-24px.svg';
import axios from 'axios';
import { API_URL } from "../../utils/utils";
import './ItemForm.scss'
import error from '../../assets/icons/error-24px.svg'
class ItemForm extends Component {
    state={
        warehouses: [],
        itemName: "",
        description: "",
        category: "N/A",
        status: null,
        quantity: 0,
        warehouse: "N/A",
        nameError:"",
        desError:"",
        categoryError:"",
        statusError: "",
        quantityError: "",
        warehouseError: "",

        ...this.props.initialFormData,

    }
    

    validate = () => {
    const errorMessage = "This field is required"
    const formError = { }


    if (!this.state.itemName){
        formError.nameError = errorMessage;
        
    }
    if (!this.state.description){
        formError.desError = errorMessage;
        
    }
    if (!this.state.category || this.state.category==="N/A"){
        formError.categoryError = errorMessage;
        
    }
    if (!this.state.status){
        formError.statusError = errorMessage;
        
    }
    if ((this.state.status==="In Stock" || !this.state.status) && !this.state.quantity){
        formError.quantityError = errorMessage;
        
    }
    if (!this.state.warehouse || this.state.warehouse==="N/A"){
        formError.warehouseError = errorMessage;
        
    }
    this.setState(formError)

    const hasErrors = Object.keys(formError).length

    return Boolean(hasErrors)
    
    

    }

    submitHandler = (e) =>{
        e.preventDefault();
        const isValid = this.validate();
        if (!isValid) {
            const foundWarehouse = this.state.warehouses.find((warehouse) =>{
                return this.state.warehouse === warehouse.id
            })
            const warehouseName = foundWarehouse.name
            this.props.handleSubmit({...this.state , warehouseName})
        }
        
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    
    componentDidMount() {
        axios
        .get(`${API_URL}/warehouses`)
        .then((response) => {
            this.setState({
            warehouses: response.data,
            });
        })
        .catch((err) => console.log("error!", err));
    }

    render() {
        let stockDecide;
        if (this.state.status === "Out of Stock"){
            stockDecide = "itemForm__quantity-container--hide";
        } else {
            stockDecide = "itemForm__quantity-container";
        }
        return (
            <div className="addItem">
                <div className="itemForm__header">
                <div onClick = {this.props.backClick}className="itemForm__header--back">
                    <img src={Back} alt="back" />
                    </div>
                    <h1 className="itemForm__header--title">{this.props.title}</h1>
                </div>
                <form className="itemForm__form" onSubmit={this.submitHandler}>
                    <div className="itemForm__form-container">
                        <div className="itemForm__itemDetails">
                            <h2 className="itemForm__form--title">Item Detailss</h2>
                            <label className="itemForm__form--label" htmlFor="itemName">Item Name</label>
                            <input className="itemForm__form--input"
                                type="text"
                                name="itemName"
                                id="itemName"
                                placeholder="Item Name"
                                value={this.state.itemName}
                                onChange={this.changeHandler}
                            />
                            {this.state.nameError ? <div className="itemForm__error">
                                <img className="itemForm__error--image" src={error} alt="error"/>
                                <p className="itemForm__error--text" >{this.state.nameError}</p>
                                </div> : null}

                            <label className="itemForm__form--label" htmlFor="itemDescription">Description</label>
                            <textarea className="itemForm__form--input"
                                type="text"
                                name="description"
                                id="description"
                                placeholder="Please enter a brief item description..."
                                rows="5"
                                value={this.state.description}
                                onChange={this.changeHandler}
                            />
                            {this.state.desError ? <div className="itemForm__error">
                                <img className="itemForm__error--image" src={error} alt="error"/>
                                <p className="itemForm__error--text" >{this.state.desError}</p>
                                </div> : null}

                            <label className="itemForm__form--label" htmlFor="category">Category</label>
                            <select className="itemForm__form--select" id="category" name="category" value={this.state.category} onChange={this.changeHandler} >
                                <option className="itemForm__form--option" hidden disabled value="N/A">Please Select</option>
                                <option className="itemForm__form--option" value="Electronics">Electronics</option>
                                <option className="itemForm__form--option" value="Apparel">Apparel</option>
                                <option className="itemForm__form--option" value="Gear">Gear</option>
                                <option className="itemForm__form--option" value="Accessories">Accessories</option>
                                <option className="itemForm__form--option" value="Health">Health</option>
                            </select>
                            {this.state.categoryError ? <div className="itemForm__error">
                                <img className="itemForm__error--image" src={error} alt="error"/>
                                <p className="itemForm__error--text">{this.state.categoryError}</p>
                                </div> : null}
                        </div>
                        <div className="itemForm__availability">
                            <h2 className="itemForm__form--title">Item Availability</h2>
                            <label className="itemForm__form--label" htmlFor="status">Status</label>
                            <div className="itemForm__radio">
                                <div className="itemForm__radio--left">
                                    <input className="itemForm__radio--select" type="radio" name="status" id="status" value="In Stock" checked={this.state.status==="In Stock"} onChange={this.changeHandler}/>
                                    <p className="itemForm__radio--text">In Stock</p>
                                </div>
                                <div className="itemForm__radio--right">
                                    <input className="itemForm__radio--select" type="radio" name="status" id="status" value="Out of Stock" checked={this.state.status==="Out of Stock"} onChange={this.changeHandler} />
                                    <p className="itemForm__radio--text">Out of Stock</p>
                                </div>
                            </div>
                            {this.state.statusError ? <div className="itemForm__error">
                                <img className="itemForm__error--image" src={error} alt="error"/>
                                <p className="itemForm__error--text">{this.state.statusError}</p>
                                </div> : null}
                            <div className={stockDecide}>
                                <label className="itemForm__form--label" htmlFor="quantity">Quantity</label>
                                <input className={"itemForm__form--input itemForm__form--quantity"}
                                type="number"
                                step="1"
                                name="quantity"
                                id="quantity"
                                placeholder="0"
                                value={this.state.quantity}
                                onChange={this.changeHandler}
                                />
                                {this.state.quantityError ? <div className="itemForm__error">
                                <img className="itemForm__error--image" src={error} alt="error"/>
                                <p className="itemForm__error--text">{this.state.quantityError}</p>
                                </div> : null}
                            </div>
                            <label className="itemForm__form--label" htmlFor="warehouse">Warehouse</label>
                            <select className="itemForm__form--select" id="warehouse" name="warehouse" value={this.state.warehouse} onChange={this.changeHandler} >
                            <option className="itemForm__form--option" disabled hidden value="N/A"  >Please Select</option>
                                {this.state.warehouses
                                .map((warehouse) => {
                                    return (
                                        <option key={warehouse.id}className="itemForm__form--option" value={warehouse.id} >{warehouse.name}</option>
                                    )
                                })}
                            </select>
                            {this.state.warehouseError ? <div className="itemForm__error">
                                <img className="itemForm__error--image" src={error} alt="error"/>
                                <p className="itemForm__error--text">{this.state.warehouseError}</p>
                                </div> : null}
                        </div>
                    </div>
                    <div className="itemForm__buttons">
                        <button type = "button" onClick = {this.props.handleClick}
className="itemForm__cancel-button">Cancel</button>
                        <button className="itemForm__add-button">{this.props.button}</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default ItemForm
