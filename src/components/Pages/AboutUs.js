import React from 'react';
import Wrapper from '../helper/Wrapper';
import Banner from '../Banner/Banner';
import {Helmet} from 'react-helmet';
const AboutUs = () =>{
    return(
        <>
        <Helmet>
            <title>Về Chúng Tôi - GSTORE</title>
        </Helmet>
        <Wrapper title='Về Chúng Tôi'>
            <Banner/>
        </Wrapper>
        </>
    )
}

export default AboutUs;