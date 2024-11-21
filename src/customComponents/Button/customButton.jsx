import React from 'react';
import { Button } from 'antd';

const CustomButton = ({
  btnText = "Save",
  htmlType="",
  handleSubmit,
  disabled = false,
  btnColor = "black",
  btnSize = "middle",
  btnType = "primary",
  danger = false, 
}) => {


  return (
    <Button
    htmlType={htmlType}
      type={btnType}
      style={{ backgroundColor: btnColor, color: 'white', borderColor: btnColor }}
      onClick={handleSubmit}
      disabled={disabled}
      size={btnSize}
      danger={danger}
    >
      {btnText}
    </Button>
  );
};

export default React.memo(CustomButton);
