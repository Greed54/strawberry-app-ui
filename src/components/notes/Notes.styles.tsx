import styled from 'styled-components';

export const NoteWrapper = styled.div<{padding?: number}>`
    padding: 0 ${p => p.padding}px;
`;

export const NoteTitle = styled('div')`
    font-weight: bold;
    color: #000;
    margin-bottom: 5px;
`;
