// function to define dropbox

import { Button } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import "../css/Dropbox.css";

const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isFocused) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  border-width: 2px;
  border-radius: 10px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: black;
  font-weight: bold;
  font-size: 1.4rem;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

function DropBox({ onDrop }) {
  const {
    getRootProps,
    getInputProps,
    open,
    isDragAccept,
    isFocused,
    isDragReject,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <>
      {" "}
      <section className="dropbox">
        <Container
          className="dropbox"
          {...getRootProps({ isDragAccept, isFocused, isDragReject })}
        >
          <input {...getInputProps()} />
          <p>Drag and drop some files here or ...</p>
          <Button className="btn_drop" onClick={open}>
            Click to select file
          </Button>
        </Container>
      </section>
    </>
  );
}
export default DropBox;
