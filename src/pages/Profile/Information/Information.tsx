import React, {useState} from "react";
import { NavLink, useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks";
import { userApi } from "../../../store/reducers/servise/userServise";
import "./Information.scss";
import { updateFood } from "../../../store/reducers/food/foodActions";
import { IFood } from "../../../types/IFood";

const Information = () => {
  // const { _id } = useParams<{ _id: string }>();
  const { role } = useAppSelector((state) => state.user.currentUser);
  const { error, data } = userApi.useGetUserQuery(role);
  
  console.log(data?._id);

  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [phone, setPhone] = useState("");
  const [mail, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [menu, setMenu] = useState("");
  const dispatch = useAppDispatch();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleMenuChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMenu(event.target.value);
  };

  const handleSubmit = async (_id: string, event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("image", image);
    }
    formData.append("phone", phone);
    formData.append("mail", mail);
    formData.append("address", address);
    formData.append("menu", menu);

    try {
      const updatedFood: IFood = {
        _id: data?._id || "",
        name: String(formData.get("name") || ""),
        image: String(formData.get("image") as File || null),
        mail: String(formData.get("mail") || ""),
        phone: String(formData.get("phone") || ""),
        city: String(formData.get("city") || ""),
        address: String(formData.get("address") || ""),
        menu: [],
      };
      const response = await dispatch(updateFood({ _id, food: updatedFood }));
      console.log(response);
      // Do something with the response if needed
    } catch (error) {
      console.log(error);
    }
  };

  return (
        <div className="left-profile">

          <form  action="">
            <label className="first-label" htmlFor="name">
              1.Название организации
            </label>
            <input
              className="first-input"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleNameChange}
            />
            <label htmlFor="logo">2.Изменить логотип</label>
            <input className="fix-none" id="logo" type="file" onChange={handleLogoChange} />
            <label htmlFor="phone">3.Телефон</label>
            <input
              type="number"
              id="phone"
              name="phone"
              value={phone}
              onChange={handlePhoneChange}
            />
            <label htmlFor="email">4.Email</label>
            <input
              type="mail"
              id="email"
              name="email"
              value={mail}
              onChange={handleEmailChange}
            />
            <label htmlFor="address">5.Адрес организации</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={handleAddressChange}
            />
            <label htmlFor="additional-info">6.Доп.информация</label>
            <input
              type="text"
              id="additional-info"
              name="additional-info"
              value={menu}
              onChange={handleMenuChange}
            />
          <button onClick={(event) => data?._id && handleSubmit(data?._id, event)} className="save greenBack" type="submit">Сохранить изменения</button>
          </form>


        </div>
  );
};

export default Information;