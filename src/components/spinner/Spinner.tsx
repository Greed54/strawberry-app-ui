import * as React from 'react';
import styled from '../../configs/theme'
import { Spin as _Spin, Alert, Icon } from 'antd';
import {SpinIndicator, SpinProps} from 'antd/lib/spin';

interface Props extends SpinProps {
    message?: string;
    description?: string;
    icon?: string; // loading
}

const Spin = styled<SpinProps>(props => <_Spin {...props} />)`
    line-height: 0 !important;
`;


export const Spinner: React.SFC<Props> = props => {
    const { message = '', description = '', size = 'default', tip = '', icon = '', style } = props;
    const customIcon: SpinIndicator = icon !== '' ? <Icon type={icon} style={{ fontSize: 24 }} spin={true} /> : <div/>;
    return (
        <Spin tip={tip} size={size} indicator={customIcon} style={style}>
            {message !== '' && <Alert message={message} description={description} type="info" />}
        </Spin>
    );
};
