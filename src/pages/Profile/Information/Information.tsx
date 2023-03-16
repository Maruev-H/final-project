import React from "react";
import { useAppSelector } from "../../../hooks/hooks";
import { userApi } from "../../../store/reducers/servise/userServise";
import "./Information.scss";
import { IUserEdit } from "../../../types/IUser";
import { useForm } from "react-hook-form";

const Information = () => {

  const { role } = useAppSelector((state) => state.user.currentUser);
  const { error, data } = userApi.useGetUserQuery(role);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<IUserEdit>();

  const onSubmit = (data: IUserEdit) => {
    console.log(data)
    alert(data);
    // reset();
  };

  return (
    <div className="left-profile">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          1.Название организации
          <input {...register("name")} />
        </label>
        <label>
          2.Изменить логотип
          <input type='file' {...register("image")} />
        </label>
        <label>
          3.Телефон
          <input {...register("phone")} />
        </label>
        <label>
          4.Email
          <input {...register("mail")} />
        </label>
        <label>
          5.Адрес организации
          <input {...register("address")} />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
};

export default Information;