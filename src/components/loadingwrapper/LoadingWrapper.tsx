import * as React from 'react';
import styled from '../../configs/theme';
import { SpinProps } from 'antd/lib/spin';
import { Spinner } from '../spinner/Spinner';

interface Props extends SpinProps {
    message?: string;
    description?: string;
    icon?: string;
    loading?: boolean;
}

export const Container = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

export class LoadingWrapper extends React.Component<Props> {
    public render() {
        const {
            message = '',
            description = '',
            size = 'default',
            tip = '',
            style,
            loading,
            children,
            icon,
        } = this.props;
        return !loading ? (
            children
        ) : (
            <Container>
                <Spinner message={message} tip={tip} size={size} style={style} description={description} icon={icon} />
            </Container>
        );
    }
}
