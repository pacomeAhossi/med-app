import React, { useState } from 'react';
import './Sign_Up.css';

const Sign_Up = () => {

    const [phone, setPhone] = useState('');

    const handlePhone = (e) => {
        const onlyNums = e.target.value.replace(/\D/g, ''); // Supprime tout sauf les chiffres
        setPhone(onlyNums.slice(0, 10)); // Limite à 10 chiffres
    };
    
    return (
        <div class="container" style={{marginTop: '5%' }}  >
            <div class="signup-grid"> 
                <div class="signup-text"> 
                    <h1>Sign Up</h1>
                </div>
                <div class="signup-text1" style={{textAlign: 'left'}}> 
                    Already a member? <span><a href="../Login/Login.html" style={{color: '#2190FF' }}> Login</a></span>
                </div>
                <div class="signup-form">
                    <form>

                        <div class="form-group"> 
                            <label for="name">Name</label> 
                            <input type="text" name="name" id="name" required class="form-control" placeholder="Enter your name" aria-describedby="helpId" />
                        </div>

                        <div class="form-group">
                            <label htmlFor="phone">Phone</label> 
                            <input 
                                type="tel" 
                                name="phone" 
                                id="phone" required 
                                maxLength={10}
                                value={phone}
                                onChange={handlePhone}
                                class="form-control" 
                                placeholder="Enter your phone number" 
                                aria-describedby="helpId" 
                            /> 
                        </div>

                        <div class="form-group">
                            <label for="email">Email</label> 
                            <input type="email" name="email" id="email" required class="form-control" placeholder="Enter your email" aria-describedby="helpId" /> 
                        </div>

                        <div class="form-group"> 
                            <label for="password">Password</label> 
                            <input name="password" id="password" required class="form-control" placeholder="Enter your password" aria-describedby="helpId" /> 
                        </div>

                        <div class="btn-group"> 
                            <button type="submit" class="btn btn-primary mb-2 mr-1 waves-effect waves-light">Submit</button> 
                            <button type="reset" class="btn btn-danger mb-2 waves-effect waves-light">Reset</button> 
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Sign_Up;