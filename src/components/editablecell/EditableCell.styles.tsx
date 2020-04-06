import styled from '../../configs/theme';

export const CellInput = styled('input')<{ width: string | number }>`
    width: ${p => p.width}px!important;
    position: absolute;
    z-index: 100;
    height: 32px;
    border-radius: 0 !important;
    margin: 0;
    box-shadow: none !important;
    outline: none !important;
    padding: 0 5px 1px 14px;
    background-color: #fff;
    background-image: none;
    border: 1px solid #30B097;
    &:hover {
        border-color: #30B097;
    }
    &:focus {
        border-color: #30B097;
    }
`;

export const Cell = styled('div')<{ width: number; isInvalid?: boolean }>`
    display: block;
    width: ${p => p.width}px;
    padding: 0px 6px 0 15px;
    min-height: 22px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    ${p =>
        p.isInvalid &&
        `
        position: relative;
        &:before {
            position: absolute;
            display: inline-block;
            top: 6px;
            left: 6px;
            content: '*';
            font-family: SimSun;
            line-height: 1;
            font-size: 14px;
            color: #f5222d;
        }
    `}
`;
