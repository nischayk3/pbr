import React from 'react';
import { Modal, Button } from 'antd';
import InputView from '../InputView/InputView';

const LoadModal = (props) => {
  const handleClose = () => {
    props.handleCloseModal();
  };

  const callbackView = () => {
    props.callbackLoadModal();
  };

  const handleOk = () => {
    props.handleCloseModal();
    // dispatch(sendViewId(selectedViewId));
  };

  return (
    <Modal
      title='Load'
      style={{ left: '20' }}
      width={400}
      visible={props.isModal}
      onCancel={props.handleCloseModal}
      footer={[
        <Button
          onClick={props.handleCloseModal}
          className='custom-primary-btn'
          key='cancel'
        >
          Cancel
        </Button>,
        <Button
          onClick={handleOk}
          className='custom-secondary-btn'
          key='link'
          type='primary'
        >
          Ok
        </Button>,
      ]}
    >
      <InputView
        label='Chart ID'
        placeholder='Search Chart Id'
        onClickPopup={callbackView}
      />
    </Modal>
  );
};

export default LoadModal;
