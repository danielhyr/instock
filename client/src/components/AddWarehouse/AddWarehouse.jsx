import axios from "axios";
import React from "react";
import Error from '../../assets/icons/error-24px.svg'
import Arrow from '../../assets/icons/arrow_back-24px.svg'
import { API_URL } from "../../utils/utils";
import "./AddWarehouse.scss"
import { get } from 'lodash';
import { Link } from "react-router-dom";
const { v4: uuidv4 } = require('uuid');

class AddWarehouse extends React.Component {

  state = {
    addWarehouse:{},
    loaded: false,
    inputValue: ""
  }

  onSaveEdits = (e) => {
    const { value, name } = e.target;
    e.preventDefault();

    if (name.includes("contactNumber")) {
      const formattedPhoneNumber = this.formatPhoneNumber(e.target.value);
      this.setState({inputValue:formattedPhoneNumber})
    }

    if (name.includes("contact")) {
      // Parse actual field name
      const contactFieldName = name.split('.')[1];
      this.setState({
        addWarehouse: {
          ...this.state.addWarehouse,
          contact: {
            ...this.state.addWarehouse.contact,
            [contactFieldName]: value,
          },
        },
      });
    } else {
      this.setState({
        addWarehouse: {
          ...this.state.addWarehouse,
          [name]: e.target.value,
        }
      });
    }
  }

  validateEmail = (e) => {
    let emailError = "";
  
    if (!e.target.email.value.includes("@")) {
      emailError = "invalid email";
      alert("please use @ in the email section in order to submit")
    }

    if (emailError) {
      this.setState({ emailError });
      return false
    } 
    return true;
  }


  
  validateInputs = (e) => {
    if(e.target.name.value !== "" && e.target.address.value !== "" && e.target.city.value !== "" && e.target.country.value !== "" && e.target.contactName.value !== "" && e.target.contactPosition.value !== "" && e.target.contactNumber.value !== ""  && e.target.email.value !== "") {
    } else {
      alert("All fields must be filled to save")
      return false;
    }
    return true;
  }

  formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    
    if (!value) {
      return value
    }

    if (phoneNumberLength < 4) {
      return phoneNumber;
    }

    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }

    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // Check that all fields are valid
    const isValidEmail = this.validateEmail(e);
    const isValidInputs = this.validateInputs(e);

    if (isValidEmail && isValidInputs) {
      axios.post(`${API_URL}/warehouses/add`, {
        id:  uuidv4(),
        name: e.target.name.value,
        address: e.target.address.value,
        city:  e.target.city.value,
        country: e.target.country.value,
        contact: {
          name: e.target.contactName.value,
          position:e.target.contactPosition.value,
          phone: e.target.contactNumber.value,
          email: e.target.email.value,
        }
      })
      .then (res => {
        this.props.history.push(`/warehouses`)
      })
      .catch(err => {
        console.log(err)
      })
    } 
  }

  render() {
    if (this.state.addWarehouse !== {}) {
      return (
        <section className="addwarehouse">
          <div className="addwarehouse__nav">
            <Link to ={`/warehouses`}>
            <img className="addwarehouse__image" src={Arrow} alt="go back to warehouse details"/>
            </Link>
            <h1 className="addwarehouse__title">Add New Warehouse</h1>
          </div>
          <form className="addwarehouse__form" onSubmit={(e) => this.handleSubmit(e)}>
            <div className="top-section">
          <div className="addwarehouse__details">
            <h1 className="addwarehouse__details-title">Warehouse Details</h1>
            <div className="addwarehouse__details-top">
              <h1 className="addwarehouse__details-name">Warehouse Name</h1>
              <label className="addwarehouse__details-label" htmlFor="name"/>
              <input className={`addwarehouse__details-name-input ${this.state.addWarehouse.name === ""  ? "addwarehouse__details-name-error": " "}`} name="name" placeholder={"Warehouse Name"} onChange={this.onSaveEdits}/>
              <div className={`addwarehouse__wrapper ${this.state.addWarehouse.name === ""  ? "addwarehouse__wrapper-error" : " "}`}>
                  <img className="addwarehouse__wrapper-image" src={Error} alt="error alert"/>
                  <p className="addwarehouse__wrapper-text">This field is required</p>
              </div>
            </div>
            <div className="addwarehouse__details-mid">
              <h1 className="addwarehouse__details-address">Street Address</h1>
              <label className="addwarehouse__details-label" htmlFor="address"/>
              <input className={`addwarehouse__details-address-input ${this.state.addWarehouse.address === "" ? "addwarehouse__details-address-error": " "}`} name="address" placeholder={"Street Address"} onChange={this.onSaveEdits}/>
              <div className={`addwarehouse__wrapper ${this.state.addWarehouse.address === "" ? "addwarehouse__wrapper-error" : " "}`}>
                  <img className="addwarehouse__wrapper-image" src={Error} alt="error alert"/>
                  <p className="addwarehouse__wrapper-text">This field is required</p>
              </div>
            </div>
            <div className="addwarehouse__details-mid">
              <h1 className="addwarehouse__details-city">City</h1>
              <label className="addwarehouse__details-label" htmlFor="city"/>
              <input className={`addwarehouse__details-city-input ${this.state.addWarehouse.city === "" ? "addwarehouse__details-city-error" : " "}`} name="city" placeholder={"City"} onChange={this.onSaveEdits}/>
              <div className={`addwarehouse__wrapper ${this.state.addWarehouse.city === "" ? "addwarehouse__wrapper-error" : " "}`}>
                  <img className="addwarehouse__wrapper-image" src={Error} alt="error alert"/>
                  <p className="addwarehouse__wrapper-text">This field is required</p>
              </div>
            </div>
            <div className="addwarehouse__details-bottom">
              <h1 className="addwarehouse__details-country">Country</h1>
              <label className="addwarehouse__details-label" htmlFor="country"/>
              <input className={`addwarehouse__details-country-input ${this.state.addWarehouse.country === "" ? "addwarehouse__details-country-error" : " "}`} name="country" placeholder={"Country"} onChange={this.onSaveEdits}/>
              <div className={`addwarehouse__wrapper ${this.state.addWarehouse.country === ""? "addwarehouse__wrapper-error" : " "}`}>
                  <img className="addwarehouse__wrapper-image" src={Error} alt="error alert"/>
                  <p className="addwarehouse__wrapper-text">This field is required</p>
              </div>
            </div>
          </div>
          <div className="addwarehouse__contact-details">
              <h1 className="addwarehouse__contact-details-title">Contact Details</h1>
              <div className="addwarehouse__contact-top">
                <h1 className="addwarehouse__contact-name">Contact Name</h1>
                <label className="addwarehouse__contact-label" htmlFor="contact.name"/>
                <input className={`addwarehouse__contact-name-input ${get(this.state.addWarehouse, "contact.name") === "" ? "addwarehouse__contact-name-error" : " "}`} name="contactName" placeholder={"Contact Name"} onChange={this.onSaveEdits}/>
                <div className={`addwarehouse__wrapper ${get(this.state.addWarehouse, "contact.name") === "" ? "addwarehouse__wrapper-error" : " "}`}>
                  <img className="addwarehouse__wrapper-image" src={Error} alt="error alert"/>
                  <p className="addwarehouse__wrapper-text">This field is required</p>
                </div>
              </div>
              <div className="addwarehouse__contact-mid">
                <h1 className="addwarehouse__contact-position">Position</h1>
                <label className="addwarehouse__contact-label" htmlFor="contact.position"/>
                <input className={`addwarehouse__contact-position-input ${get(this.state.addWarehouse, "contact.position") === "" ? "addwarehouse__contact-position-error" : " "}`} name="contactPosition" placeholder={"Contact Position"} onChange={this.onSaveEdits}/>
                <div className={`addwarehouse__wrapper ${get(this.state.addWarehouse, "contact.position") === "" ? "addwarehouse__wrapper-error" : " "}`}>
                  <img className="addwarehouse__wrapper-image" src={Error} alt="error alert"/>
                  <p className="addwarehouse__wrapper-text">This field is required</p>
                </div>
              </div>
              <div className="addwarehouse__contact-mid">
                <h1 className="addwarehouse__contact-number">Phone Number</h1>
                <label className="addwarehouse__contact-label" htmlFor="contact.number"/>
                <input className={`addwarehouse__contact-number-input ${get(this.state.addWarehouse, "contact.number") === "" ? "addwarehouse__contact-number-error" : " "}`} name="contactNumber" placeholder={"Phone Number"} onChange={(e) => this.onSaveEdits(e)} value={this.state.inputValue}/>
                <div className={`addwarehouse__wrapper ${get(this.state.addWarehouse, "contact.number") === "" ? "addwarehouse__wrapper-error" : " "}`}>
                  <img className="addwarehouse__wrapper-image" src={Error} alt="error alert"/>
                  <p className="addwarehouse__wrapper-text">This field is required</p>
                </div>
              </div>
              <div className="addwarehouse__contact-bottom">
                <h1 className="addwarehouse__contact-email">Email</h1>
                <label className="addwarehouse__contact-label" htmlFor="contact.email"/>
                <input className={`addwarehouse__contact-email-input ${get(this.state.addWarehouse, "contact.email") === "" ? "addwarehouse__contact-email-error" : " "}`} name="email" placeholder={"Contact Email"}onChange={this.onSaveEdits}/>
                <div className={`addwarehouse__wrapper ${get(this.state.addWarehouse, "contact.email") === "" ? "addwarehouse__wrapper-error" : " "}`}>
                  <img className="addwarehouse__wrapper-image" src={Error} alt="error alert"/>
                  <p className="addwarehouse__wrapper-text">This field is required</p>
              </div>
              </div>
            </div>
            </div>
            <div className="bottom-section">
              <div className="addwarehouse__button-section">
                <Link to="/" style={{textDecoration: 'none'}}>
                  <button className="addwarehouse__cancel-button"> CANCEL </button>
                </Link>
                <button className="addwarehouse__save-button"> SAVE </button>
              </div>
            </div>
          </form>
        </section>
      )
    }
  }
}
export default AddWarehouse;





