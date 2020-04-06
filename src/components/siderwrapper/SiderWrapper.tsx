import * as React from 'react';
import { Spinner } from '../spinner/Spinner';
import { Container, Drawer } from './SiderWrapper.styles';

interface Props {
    children: React.ReactNode;
    visible: boolean;
    loading?: boolean;
    onClose: (e: any) => void;
    title?: string | React.ReactNode;
    width?: number | string;
}

class SiderWrapper extends React.Component<Props> {
    public static defaultProps = {
        width: 472,
    };

    public render() {
        const { visible, onClose, title, width, children, loading } = this.props;
        return (
            <Drawer
                visible={visible}
                destroyOnClose={true}
                onClose={onClose}
                title={title}
                width={width}
                placement="right"
            >
                {!loading ? (
                    children
                ) : (
                    <Container>
                        <Spinner size="large" />
                    </Container>
                )}
            </Drawer>
        );
    }
}

export { SiderWrapper };
