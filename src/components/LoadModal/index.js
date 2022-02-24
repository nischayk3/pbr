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

  return (
    <Modal
      title='Load'
      visible={props.isModal}
      onCancel={props.handleCloseModal}
      centered={true}
      footer={[
        <Button
          onClick={props.handleCloseModal}
          className='custom-primary-btn'
          key='cancel'
        >
          Cancel
        </Button>,
        <Button
          onClick={handleClose}
          className='custom-secondary-btn'
          key='link'
          type='primary'
        >
          Ok
        </Button>,
      ]}
      width={500}
      style={{ marginRight: '800px' }}
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
