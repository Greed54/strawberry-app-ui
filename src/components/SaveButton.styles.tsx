import styled from "styled-components";
import {NativeButtonProps} from "antd/lib/button/button";
import {Button} from "antd";
import React from "react";

export const SaveButton = styled<NativeButtonProps>(props => <Button {...props} type="primary" icon="save"/>)`
    background-color: ${p => p.theme.colors.baseLightGreen};
    border-color: ${p => p.theme.colors.baseLightGreen};
    &:hover {
      background-color: #30B097;
      border-color: #30B097;
    }
    &:focus {
      background-color: #30B097;
      border-color: #30B097;
    }
    &:active {
      background-color: ${p => p.theme.colors.baseGreen};
      border-color: ${p => p.theme.colors.baseGreen};
    }
`;
