import React from 'react';
import './Auth.css'
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const SignUp = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data)
        const userData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            userName: data.userName,
            password: data.password,
        };
        console.log(userData);
        console.log(JSON.stringify(userData));
        fetch("http://localhost:9000/api/signUp", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    };
    return (
        <>
            <div class="form-container sign-up-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Create Account</h1>
                    <div class="social-container">
                        {/* <a href="#" class="social"><i class="fa fa-facebook"></i></a>
                        <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                        <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a> */}
                    </div>
                    {/* <span>or use your email for registration</span> */}
                    <input {...register("firstName", { required: true })} type="text" placeholder="firstName" />
                    {errors.firstName && <span>This field is required</span>}
                    <input {...register("lastName", { required: true })} type="text" placeholder="lastName" />
                    {errors.lastName && <span>This field is required</span>}
                    <input {...register("userName", { required: true, maxLength: 4 }, { pattern: /^[A-Za-z]+$/i })} type="text" placeholder="userName" />
                    {errors.userName && <span>Minimum four characters, at least one uppercase letter,at least one number :</span>}
                    <input {...register("email", { required: true })} type="email" placeholder="Email" />
                    {errors.email && <span>This field is required</span>}
                    <input {...register("password", { required: true })} type="password" placeholder="Password" />
                    {errors.password && <span>This field is required</span>}
                    {/* <button >Sign Up</button> */}
                    <input className="button" type="submit" />
                    {/* <Link to="login"><input className="button" type="submit" /></Link> */}
                </form>
            </div>
        </>
    );
};

export default SignUp;