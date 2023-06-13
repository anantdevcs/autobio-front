import { useState } from 'react';
import Navbar from '../CommonComponents/Navbar';
import './Configure.css'
import { backendUrl } from '../urlResolver';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Configure = () => {
    const { state } = useLocation();
    const [option, SetOption] = useState('');
    const setSelected = (option) => SetOption(option);
    const navigator = useNavigate();
    const handleAgeChange = (event) => {
        setAge(event.target.value);
    };
    const [age, setAge] = useState(0);

    const addConfisToBioAndgotoEditor = async () => {
        // const autobioid = 
        const email = localStorage.getItem("email");
        const autobioid = state.autobioid;
                const usercreds = JSON.parse(localStorage.getItem("usercreds"));
                const response = await fetch(backendUrl + '/acceptCofigs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 'tokenId': usercreds, 'email': email, 'chosen_length':option, 'autobioid' : autobioid, "age":age }),
                });
                const jsonData = await response.json();
                debugger;
                if (response.status === 401) {
                   
                      navigator('/');
                      
                } 
                if (response.ok)
                    navigator('/editor',  { state: { autobioid: autobioid }})

                
               
             
    }
    return (
        <div className='home-screen-configure'>
            <Navbar />
            <div className='card-showoptions'>
                <div className='subtitle'>Choose you length</div>
                <div className='option-box'>
                    <div className='options'>
                        <div onClick={() => setSelected("Super Concise")} style={{ display: 'grid', gridTemplateColumns: '1fr 5fr ' }}>
                            <div className='optionBullet'
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    backgroundColor: option === 'Super Concise' ? 'black' : 'transparent',
                                    border: '1px solid black',
                                    display: 'flex',
                                    margin: '8px'
                                }}
                            ></div>

                            <div>
                                <div className='option-text'>
                                    <div className='option-title'>Super Concise</div>
                                    <div className='option-subtitle'>Takes 1-2 hours
                                        expect ~10 pages</div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='options'>
                        <div onClick={() => setSelected("Concise")} style={{ display: 'grid', gridTemplateColumns: '1fr 5fr ' }}>
                            <div className='optionBullet'
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    backgroundColor: option === 'Concise' ? 'black' : 'transparent',
                                    border: '1px solid black',
                                    display: 'flex',
                                    margin: '8px'
                                }}
                            ></div>

                            <div>
                                <div className='option-text'>
                                    <div className='option-title'>Concise</div>
                                    <div className='option-subtitle'>Takes 4-5 hours
                                        expect ~50 pages</div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='options'>
                        <div onClick={() => setSelected("Balanced")} style={{ display: 'grid', gridTemplateColumns: '1fr 5fr ' }}>
                            <div className='optionBullet'
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    backgroundColor: option === 'Balanced' ? 'black' : 'transparent',
                                    border: '1px solid black',
                                    display: 'flex',
                                    margin: '8px'
                                }}
                            ></div>

                            <div>
                                <div className='option-text'>
                                    <div className='option-title'>Balanced</div>
                                    <div className='option-subtitle'>Takes around 20hours of effort to write
                                        expect ~100 pages</div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='options'>
                        <div onClick={() => setSelected("Comprehensive")} style={{ display: 'grid', gridTemplateColumns: '1fr 5fr ' }}>
                            <div className='optionBullet'
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    backgroundColor: option === 'Comprehensive' ? 'black' : 'transparent',
                                    border: '1px solid black',
                                    display: 'flex',
                                    margin: '8px'
                                }}
                            ></div>

                            <div>
                                <div className='option-text'>
                                    <div className='option-title'>Comprehensive</div>
                                    <div className='option-subtitle'>Takes around 100hours of effort to write
                                        expect ~300 pages</div>
                                </div>
                            </div>
                        </div>


                    </div>

                    
                    
                </div>
                <input type="text" value={age} onChange={handleAgeChange} placeholder="Enter your age" style={{ margin: '8px' }} />
                <button className={option === '' || age === 0 || !age ? 'disabledButton' : 'stdbutton'} disabled={option === ''} onClick={addConfisToBioAndgotoEditor} >continue</button>

            </div>
            {/* {state.autobioid} */}

        </div>
    )
}

export default Configure;