import React, { useState } from "react";
import axios from "axios";

const url = "https://reqres.in/api/users";
const initialData = {
  isim: "",
  eposta: "",
  şifre: "",
  şartlar: false,
};

const Form = (props) => {
  const [formData, setFormData] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(url,formData)
    .then (response=>{
        console.log(response)
        setFormData(initialData)
    })
    .catch(error => console.log(error))
  };
  const handleChange = (event) => {
    let { name, type, value, checked } = event.target; // eventten değerleri alıyoruz ilgili (amaç input alanının değerini güncellemek) event.target in içinden event,value type değerlerini alıyoruz
    value = type == "checkbox" ? checked : value; // formdata nın kopyasını alıp ilgili input alanının değeri ile güncellemem lazım.tek fark type ı checkbox olanlar bunların value su yok. o yüzden thornary yazdık.checked değerinin true ya da false olması kritik.
    setFormData({ ...formData, [name]: value }); // değişiklik yaptığım input alanında name ini form alanında güncelliyoruz
  }; //checkbox sa öyle kalsın değilse value olsun.
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="isim" value={formData.isim} />
        </label>

        <label>
          Eposta:
          <input
            type="email"
            name="eposta"
            value={formData.eposta}
            onChange={handleChange}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="şifre"
            value={formData.sifre}
            onChange={handleChange}
          />
        </label>

        <label>
          <input
            type="checkbox"
            name="sartlar"
            value={formData.sartlar}
            onChange={handleChange}
          />
          Şartları kabul ediyorum.
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};
export default Form;
