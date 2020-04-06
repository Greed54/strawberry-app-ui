import React from "react";
import * as styled from './Toolbar.styles';
import { SaveButton } from "../../../components/SaveButton.styles";

interface ToolbarProps {
  savingInProgress: boolean;
  isSaveDisable: boolean;
  isRemoved: boolean;
}
class Toolbar extends React.Component<ToolbarProps> {
  render() {
    const {savingInProgress, isSaveDisable, isRemoved } = this.props;

    return (
        <styled.Toolbar>
          <SaveButton
              loading={savingInProgress}
              disabled={
                isSaveDisable ||
                isRemoved
              }
              onClick={() => ""}
          >
            Save
          </SaveButton>
        </styled.Toolbar>
    );
  }
}

export default Toolbar;
