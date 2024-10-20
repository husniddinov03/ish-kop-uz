import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  FormGroup,
  Form,
} from 'reactstrap';
import { useInfoContext } from '../../Context/UseInfoContext';

function ModalComponent(props) {
  const [focusAfterClose, setFocusAfterClose] = useState(true);
  const { open, setOpen } = useInfoContext()

  const toggle = () => setOpen(!open);

  // const handleSelectChange = ({ target: { value } }) => {
  //   setFocusAfterClose(JSON.parse(value));
  // };

  return (
    <div>
      <Form inline onSubmit={(e) => e.preventDefault()}>
        <Button color="danger" onClick={toggle}>
          Open
        </Button>
      </Form>
      <Modal returnFocusAfterClose={focusAfterClose} isOpen={open}>
        <ModalBody>
          Observe the &ldquo;Open&ldquo; button. It will be focused after close
          when &ldquo;returnFocusAfterClose&ldquo; is true and will not be
          focused if &ldquo;returnFocusAfterClose&ldquo; is false.
        </ModalBody>
        {/* <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter> */}
      </Modal>
    </div>
  );
}

export default ModalComponent;