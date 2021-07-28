import React from 'react';
import {Row, Col} from 'react-bootstrap';
import { FeatureContent } from './DataFeature';
import styles from './BoxFeature.module.scss';
import p1 from '../../../img/images/features_icon_s.png';
const BoxFeature = () =>{
    return(
        <Row className={styles.row}>
            {FeatureContent.map((items, index) =>{
                return <Col key={index} xs={12} sm={6} md={6} lg={3} className={styles.fixed}>
                    <div className={styles.images}>
                        <img src={p1} alt=''/>
                        <img className={styles.img2} src={items.link} alt=''/>
                    </div>
                    <div className={styles.content}>
                        <p>{items.title}</p>
                        <p>{items.content}</p>
                    </div>
                </Col>
            })}
        </Row>
    )
}

export default BoxFeature;