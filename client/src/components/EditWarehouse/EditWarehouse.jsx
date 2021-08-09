import axios from "axios";
import React from "react";
import Error from '../../assets/icons/error-24px.svg'
import Arrow from '../../assets/icons/arrow_back-24px.svg'
import { API_URL } from "../../utils/utils";
import "./EditWarehouse.scss"
import { get } from 'lodash';
import { Link } from "react-router-dom";

class EditWarehouse extends React.Component {
  state = {
    editWarehouse:{},
    loaded: false,
    phoneInputValue: ""
  }
  
  componentDidMount() {
    let id = this.props.match.params.id;
    axios.get(`${API_URL}/warehouses/${id}/edit`)
    .then(res => {
      this.setState({
        editWarehouse: res.data,
        phoneInputValue: res.data.contact.phone,
        loaded:true,
      });
    })
    .catch(err => {
    console.log("error", err)
    })
  }
  
  onSaveEdits = (e) => {
    const { value, name } = e.target;
    e.preventDefault();
   
    if (name.includes("phone")) {
      const formattedPhoneNumber = this.formatPhoneNumber(e.target.value);
      this.setState({phoneInputValue:formattedPhoneNumber})
    }
   
    if (name.includes("contact")) {
      // Parse actual field name
      const contactFieldName = name.split('.')[1];
      this.setState({
        editWarehouse: {
          ...this.state.editWarehouse,
          contact: {
            ...this.state.editWarehouse.contact,
            [contactFieldName]: value,
          },
        },
      });
    } else {
      this.setState({
        editWarehouse: {
          ...this.state.editWarehouse,
          [name]: e.target.value,
        }
      });
    }
  }
  
  validateEmail = () => {
    let emailError = "";
    if (!this.state.editWarehouse.contact.email.includes("@")) {
      emailError = "invalid email";
      alert("please use @ in the email section in order to submit")
    }
    if (emailError) {
      this.setState({ emailError });
      return false
    }
    return true;
  }
  
  validateInputs = () => {
    if(this.state.editWarehouse.name !== "" && this.state.editWarehouse.address !== "" && this.state.editWarehouse.city !== "" && this.state.editWarehouse.country !== "" && this.state.editWarehouse.contact.name !== "" && this.state.editWarehouse.contact.position !== "" && this.state.editWarehouse.contact.phone !== ""  && this.state.editWarehouse.contact.email !== "") {
    } else {
      alert("All fields must be filled to save")
      return false;
    }
    if(this.state.editWarehouse.contact.phone !== "" ) {
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
    
    let id = this.props.match.params.id;
    // Check that all fields are valid
    const isValidEmail = this.validateEmail();
    const isValidInputs = this.validateInputs();

    if (isValidEmail && isValidInputs) {
      axios.put(`${API_URL}/warehouses/edit/${id}`, {
        name: this.state.editWarehouse.name,
        address: this.state.editWarehouse.address,
        city: this.state.editWarehouse.city,
        country: this.state.editWarehouse.country,
        contact: {
          name: this.state.editWarehouse.contact.name,
          position: this.state.editWarehouse.contact.position,
          phone: this.state.editWarehouse.contact.phone,
          email: this.state.editWarehouse.contact.email,
        }
      })
      .then (res => {
        this.props.history.push(`/warehouses/${id}`)
        return this.props.onChangeHandler(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    } 
  }


render() {
    if (this.state.editWarehouse !== {}) {
      return (
        <section className="editwarehouse">
          <div className="editwarehouse__nav">
            <Link to ={`/warehouses/${this.state.editWarehouse.id}`}>
            <img className="editwarehouse__image" src={Arrow} alt="go back to warehouse details"/>
            </Link>
            <h1 className="editwarehouse__title">Edit Warehouse</h1>
          </div>
          <form className="editwarehouse__form" onSubmit={(e) => this.handleSubmit(e)}>
            <div className="top-section">
          <div className="editwarehouse__details">
            <h1 className="editwarehouse__details-title">Warehouse Details</h1>
            <div className="editwarehouse__details-top">
              <h1 className="editwarehouse__details-name">Warehouse Name</h1>
              <label className="editwarehouse__details-label" htmlFor="name"/>
              <input className={`editwarehouse__details-name-input ${this.state.editWarehouse.name === ""  ? "editwarehouse__details-name-error": " "}`} name="name" defaultValue={get(this.state.editWarehouse, "name")} onChange={this.onSaveEdits}/>
              <div className={`editwarehouse__wrapper ${this.state.editWarehouse.name === ""  ? "editwarehouse__wrapper-error" : " "}`}>
                  <img className="editwarehouse__wrapper-image" src={Error} alt="error alert"/>
                  <p className="editwarehouse__wrapper-text">This field is required</p>
              </div>
            </div>
            <div className="editwarehouse__details-mid">
              <h1 className="editwarehouse__details-address">Street Address</h1>
              <label className="editwarehouse__details-label" htmlFor="address"/>
              <input className={`editwarehouse__details-address-input ${this.state.editWarehouse.address === "" ? "editwarehouse__details-address-error": " "}`} name="address" defaultValue={get(this.state.editWarehouse, "address")} onChange={this.onSaveEdits}/>
              <div className={`editwarehouse__wrapper ${this.state.editWarehouse.address === "" ? "editwarehouse__wrapper-error" : " "}`}>
                  <img className="editwarehouse__wrapper-image" src={Error} alt="error alert"/>
                  <p className="editwarehouse__wrapper-text">This field is required</p>
              </div>
            </div>
            <div className="editwarehouse__details-mid">
              <h1 className="editwarehouse__details-city">City</h1>
              <label className="editwarehouse__details-label" htmlFor="city"/>
              <input className={`editwarehouse__details-city-input ${this.state.editWarehouse.city === "" ? "editwarehouse__details-city-error" : " "}`} name="city" defaultValue={get(this.state.editWarehouse, "city")} onChange={this.onSaveEdits}/>
              <div className={`editwarehouse__wrapper ${this.state.editWarehouse.city === "" ? "editwarehouse__wrapper-error" : " "}`}>
                  <img className="editwarehouse__wrapper-image" src={Error} alt="error alert"/>
                  <p className="editwarehouse__wrapper-text">This field is required</p>
              </div>
            </div>
            <div className="editwarehouse__details-bottom">
              <h1 className="editwarehouse__details-country">Country</h1>
              <label className="editwarehouse__details-label" htmlFor="country"/>
              <input className={`editwarehouse__details-country-input ${this.state.editWarehouse.country === "" ? "editwarehouse__details-country-error" : " "}`} name="country" defaultValue={get(this.state.editWarehouse, "country")} onChange={this.onSaveEdits}/>
              <div className={`editwarehouse__wrapper ${this.state.editWarehouse.country === ""? "editwarehouse__wrapper-error" : " "}`}>
                  <img className="editwarehouse__wrapper-image" src={Error} alt="error alert"/>
                  <p className="editwarehouse__wrapper-text">This field is required</p>
              </div>
            </div>
          </div>
          <div className="editwarehouse__contact-details">
              <h1 className="editwarehouse__contact-details-title">Contact Details</h1>
              <div className="editwarehouse__contact-top">
                <h1 className="editwarehouse__contact-name">Contact Name</h1>
                <label className="editwarehouse__contact-label" htmlFor="contact.name"/>
                <input className={`editwarehouse__contact-name-input ${get(this.state.editWarehouse, "contact.name") === "" ? "editwarehouse__contact-name-error" : " "}`} name="contact.name" defaultValue={get(this.state.editWarehouse, "contact.name")} onChange={this.onSaveEdits}/>
                <div className={`editwarehouse__wrapper ${get(this.state.editWarehouse, "contact.name") === "" ? "editwarehouse__wrapper-error" : " "}`}>
                  <img className="editwarehouse__wrapper-image" src={Error} alt="error alert"/>
                  <p className="editwarehouse__wrapper-text">This field is required</p>
                </div>
              </div>
              <div className="editwarehouse__contact-mid">
                <h1 className="editwarehouse__contact-position">Position</h1>
                <label className="editwarehouse__contact-label" htmlFor="contact.position"/>
                <input className={`editwarehouse__contact-position-input ${get(this.state.editWarehouse, "contact.position") === "" ? "editwarehouse__contact-position-error" : " "}`} name="contact.position" defaultValue={get(this.state.editWarehouse, "contact.position")} onChange={this.onSaveEdits}/>
                <div className={`editwarehouse__wrapper ${get(this.state.editWarehouse, "contact.position") === "" ? "editwarehouse__wrapper-error" : " "}`}>
                  <img className="editwarehouse__wrapper-image" src={Error} alt="error alert"/>
                  <p className="editwarehouse__wrapper-text">This field is required</p>
                </div>
              </div>
              <div className="editwarehouse__contact-mid">
                <h1 className="editwarehouse__contact-number">Phone Number</h1>
                <label className="editwarehouse__contact-label" htmlFor="contact.phone"/>
                <input className={`editwarehouse__contact-number-input ${get(this.state.editWarehouse, "contact.phone") === "" ? "editwarehouse__contact-number-error" : " "}`} name="contact.phone" onChange={(e) => this.onSaveEdits(e)} value={this.state.phoneInputValue}/>
                <div className={`editwarehouse__wrapper ${get(this.state.editWarehouse, "contact.phone") === "" ? "editwarehouse__wrapper-error" : " "}`}>
                  <img className="editwarehouse__wrapper-image" src={Error} alt="error alert"/>
                  <p className="editwarehouse__wrapper-text">This field is required</p>
                </div>
              </div>
              <div className="editwarehouse__contact-bottom">
                <h1 className="editwarehouse__contact-email">Email</h1>
                <label className="editwarehouse__contact-label" htmlFor="contact.email"/>
                <input className={`editwarehouse__contact-email-input ${get(this.state.editWarehouse, "contact.email") === "" ? "editwarehouse__contact-email-error" : " "}`} name="contact.email" defaultValue={get(this.state.editWarehouse, "contact.email")} onChange={this.onSaveEdits}/>
                <div className={`editwarehouse__wrapper ${get(this.state.editWarehouse, "contact.email") === "" ? "editwarehouse__wrapper-error" : " "}`}>
                  <img className="editwarehouse__wrapper-image" src={Error} alt="error alert"/>
                  <p className="editwarehouse__wrapper-text">This field is required</p>
              </div>
              </div>
            </div>
            </div>
            <div className="bottom-section">
              <div className="editwarehouse__button-section">
                <button className="editwarehouse__cancel-button"> CANCEL </button>
                <button className="editwarehouse__save-button"> SAVE </button>
              </div>
            </div>
          </form>
        </section>
      )
    }
  }
}
export default EditWarehouse;