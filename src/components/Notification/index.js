import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { notification } from "antd";
import { hideNotification } from '../../duck/actions/commonActions';

const DEFAULT_PLACEMENT = "topRight";

const Notification = () => {
  const notice = useSelector((state) => state.commonReducer.notification);
  const dispatch = useDispatch();
  const { type, message, description, status } = notice;

  const show = useCallback(
    (placement) => {
      const noticeType = type || "open";
      notification[noticeType]({
        message,
        description,
        placement: placement || DEFAULT_PLACEMENT,
        onClose: () => {
            dispatch(hideNotification());
          },
      });
    },
    [description, dispatch, message, type]
  );
  const hide = () => {
    notification.destroy();
  };

  useEffect(() => {
    if (status) {
      show();
    } else {
      hide();
    }
  }, [show, status]);
  return <></>;
};

export default Notification;
