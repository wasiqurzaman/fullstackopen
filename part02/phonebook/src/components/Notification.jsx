const Notification = ({ message, messageType }) => {
  if (!message) return;
  return <div className={`msg msg-${messageType}`}>{message}</div>;
};

export default Notification;
