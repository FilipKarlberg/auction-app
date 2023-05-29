import React, { useState, useEffect } from "react";

const PasswordStrengthMeter = (props) => {
  const [score, setScore] = useState(0);
  const [customHeight, setHeight] = useState(10);
  const [customWidth, setWidth] = useState("100%");
  const [customBackgroundColor, setCustomBackgroundColor] = useState("#eeeeee");

  const changeBarStyle = () => ({
    width: `${(score * 100) / 5}%`,
    backgroundColor: getBarColor(),
  });

  const getBarColor = () => {
    switch (score) {
      case 0:
        return "#ff7878";
      case 1:
        return "#ff7878";
      case 2:
        return "#ffff88";
      case 3:
        return "#99ff99";
      case 4:
        return "#77ff77";
      case 5:
        return "#55ff55";
      default:
        return "#ffffff";
    }
  };

  useEffect(() => {
    const handleStyle = () => {
      if (props.height != null) setHeight(props.height);
      if (props.width != null) setWidth(props.width);
      if (props.backgroundColor != null)
        setCustomBackgroundColor(props.backgroundColor);
    };

    const getPasswordScore = (password) => {
      let score = 0;
      if (password.length >= 8) score++;
      if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
      if (/\d/.test(password)) score++;
      if (/[ @#$!%*?&]/.test(password)) score++;
      if (password.length >= 12) score++;
      setScore(score);
    };

    getPasswordScore(props.password);
    handleStyle();
  }, [props.password, props.height, props.width, props.backgroundColor]);

  return (
    <>
      <div
        className={props.className}
        style={{
          borderRadius: 5,
          height: customHeight,
          width: customWidth,
          backgroundColor: customBackgroundColor,
        }}
      >
        <div
          style={{
            transition: "width 0.3s ease, background-color 0.3s ease",
            height: "100%",
            borderRadius: 5,
            ...changeBarStyle(),
          }}
        />
      </div>
    </>
  );
};

export default PasswordStrengthMeter;
