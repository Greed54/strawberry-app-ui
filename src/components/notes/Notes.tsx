import * as React from 'react';
import {NoteTitle, NoteWrapper} from "./Notes.styles";
import TextArea from "antd/lib/input/TextArea";

interface NoteProps {
  padding?: number
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  handleChange(note: String): void;
}

interface NoteState {
  value?: string;
}

class Notes extends React.Component<NoteProps, NoteState> {

  constructor(props: NoteProps) {
    super(props);
    this.state = {
      value: props.value
    }
  }
  public static defaultProps = {
    placeholder: 'Notes',
    padding: 15
  };

  private handleChange = (e: { target: { value: any; }; }) => {
    this.setState({
      value: e.target.value,
    });
    this.props.handleChange(e.target.value);
  };

  public render() {
    const {value} = this.state;
    const {placeholder, disabled, padding} = this.props;

    return (
        <NoteWrapper padding={padding}>
          <NoteTitle>Notes</NoteTitle>
          <TextArea placeholder={placeholder}
                    rows={4}
                    value={value}
                    className="s-notes"
                    onChange={this.handleChange}
                    disabled={disabled}/>
        </NoteWrapper>
    );
  }
}

export default Notes;
