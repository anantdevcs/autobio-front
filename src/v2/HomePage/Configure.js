import { useState } from 'react';
import Navbar from '../CommonComponents/Navbar';
import './Configure.css'
import { useLocation } from 'react-router-dom';

const Configure = () => {
    const { state } = useLocation();
    const [option, SetOption] = useState('Small')
    return (
        <div className='home-screen-configure'>
            <Navbar />
            <div className='card-showoptions'>
                <div className='subtitle'>Choose you length</div>
                <div className='option-box'>
                    <div className='options'>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 5fr ' }}>
                            <div className='optionBullet'
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    backgroundColor: option === 'Small' ? 'black' : 'transparent',
                                    border: '1px solid black',
                                    display: 'flex',
                                    margin: '8px'
                                }}
                            ></div>

                            <div>
                                <div className='option-text'>
                                    <div className='option-title'>title</div>
                                    <div className='option-subtitle'>subtitle</div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='options'>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 5fr ' }}>
                            <div className='optionBullet'
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    backgroundColor: option === 'Small' ? 'black' : 'transparent',
                                    border: '1px solid black',
                                    display: 'flex',
                                    margin: '8px'
                                }}
                            ></div>

                            <div>
                                <div className='option-text'>
                                    <div className='option-title'>title</div>
                                    <div className='option-subtitle'>subtitle</div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='options'>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 5fr ' }}>
                            <div className='optionBullet'
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    backgroundColor: option === 'Small' ? 'black' : 'transparent',
                                    border: '1px solid black',
                                    display: 'flex',
                                    margin: '8px'
                                }}
                            ></div>

                            <div>
                                <div className='option-text'>
                                    <div className='option-title'>title</div>
                                    <div className='option-subtitle'>subtitle</div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='options'>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 5fr ' }}>
                            <div className='optionBullet'
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    backgroundColor: option === 'Small' ? 'black' : 'transparent',
                                    border: '1px solid black',
                                    display: 'flex',
                                    margin: '8px'
                                }}
                            ></div>

                            <div>
                                <div className='option-text'>
                                    <div className='option-title'>title</div>
                                    <div className='option-subtitle'>subtitle</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            {state.autobioid}

        </div>
    )
}

export default Configure;